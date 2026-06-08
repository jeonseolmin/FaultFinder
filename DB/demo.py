import re
import csv
from pathlib import Path
import fitz  # PyMuPDF

PDF_PATH = Path('/mnt/data/230630_자동차사고 과실비율 인정기준_최종.pdf')
OUT_CASES = Path('/mnt/data/accident_cases_raw.csv')
OUT_MODIFIERS = Path('/mnt/data/fault_modifiers_raw.csv')

CODE_RE = re.compile(r'^(보\d+|차\d+(?:-\d+)?|거\d+(?:-\d+)?)$')
SKIP_PREFIXES = ('제1장', '제2장', '제3장', '자동차사고', '목차', '과', '실', '비', '율', '조', '정', '예', '시')

def category_for_code(code: str) -> str:
    if code.startswith('보'):
        return '자동차 대 보행자'
    if code.startswith('거'):
        return '자동차 대 자전거'
    if code.startswith('차'):
        return '자동차 대 자동차/이륜차'
    return ''

def clean(s: str) -> str:
    return re.sub(r'\s+', ' ', s.replace('\u200b', '').replace('\ufeff','')).strip()

def next_meaningful(lines, start):
    for i in range(start, len(lines)):
        line = clean(lines[i])
        if not line or line.startswith(SKIP_PREFIXES):
            continue
        if re.fullmatch(r'\d{3}', line):
            continue
        return line, i
    return '', start

def extract_base_fault(code, lines, idx):
    window = [clean(x) for x in lines[idx: idx+45] if clean(x)]
    joined = '\n'.join(window)
    # 보행자 기본 과실비율 70 style
    if code.startswith('보'):
        for i, line in enumerate(window):
            if '보행자 기본 과실비율' in line or line == '보행자 기본' or '기본 과실비율' in line:
                for j in range(i+1, min(i+6, len(window))):
                    if re.fullmatch(r'\d{1,3}', window[j]):
                        a = int(window[j]); return '보행자', '자동차', a, 100-a
        m = re.search(r'보행자 기본\s*과실비율\s*\n?(\d{1,3})', joined)
        if m:
            a = int(m.group(1)); return '보행자', '자동차', a, 100-a
    # 차량/자전거 A0 B100 style
    m_a = re.search(r'\bA\s*(\d{1,3})\b', joined)
    m_b = re.search(r'\bB\s*(\d{1,3})\b', joined)
    if m_a and m_b:
        return 'A', 'B', int(m_a.group(1)), int(m_b.group(1))
    # Sometimes split lines A / 20 / B / 80
    for i, line in enumerate(window):
        if line == 'A' and i+1 < len(window) and re.fullmatch(r'\d{1,3}', window[i+1]):
            a = int(window[i+1])
            for j in range(i+2, min(i+8, len(window))):
                if window[j] == 'B' and j+1 < len(window) and re.fullmatch(r'\d{1,3}', window[j+1]):
                    return 'A', 'B', a, int(window[j+1])
    return ('보행자','자동차',None,None) if code.startswith('보') else ('A','B',None,None)

def extract_modifiers(case_code, lines, idx):
    # get segment after code until note/accident situation/next code
    raw_segment = []
    for line in lines[idx+1: idx+90]:
        line = clean(line)
        if not line:
            continue
        if line.startswith('※') or line.startswith('사고 상황') or CODE_RE.match(line):
            break
        raw_segment.append(line)

    # keep only lines after the vertical "과/실/비/율/조/정/예/시" marker if present
    start_i = 0
    for i, line in enumerate(raw_segment):
        if line == '시':
            start_i = i + 1
            break
        if '조정' in line and '예시' in line:
            start_i = i + 1
            break
    segment = raw_segment[start_i:]

    mods = []
    val_re = re.compile(r'^[()]?([+-]\d{1,3}(?:~\d{1,3})?|비적용)[)]?$')
    buffer = []
    blacklist = {'기본 과실비율', '보행자 기본 과실비율', '과', '실', '비', '율', '조', '정', '예', '시'}
    for line in segment:
        if line in blacklist or re.fullmatch(r'[AB]?\d{1,3}', line):
            continue
        if line.startswith(('(A)', '(B)', '(보)', '(차)')):
            continue
        normalized = line.replace(' ', '')
        vm = val_re.match(normalized)
        if vm and buffer:
            name = clean(' '.join(buffer))
            name = re.sub(r'^[①②③④⑤⑥⑦⑧⑨⑩]\s*', '', name)
            name = re.sub(r'\s+', ' ', name)
            value = vm.group(1)
            if value != '비적용' and name:
                mods.append({'case_code': case_code, 'modifier_name': name, 'change_value': value})
            buffer = []
        else:
            # numeric circled bullets are not names; attach to next line only if same line has content
            if re.fullmatch(r'[①②③④⑤⑥⑦⑧⑨⑩]', line):
                continue
            buffer.append(line)
    return mods

def main():
    doc = fitz.open(PDF_PATH)
    cases, modifiers = [], []
    seen = set()
    for page_index, page in enumerate(doc):
        page_no = page_index + 1
        if page_no < 30 or page_no >= 587:
            continue
        lines = page.get_text().splitlines()
        for idx, raw in enumerate(lines):
            code = clean(raw)
            if not CODE_RE.match(code):
                continue
            # avoid duplicates if code repeats in header-ish content; keep first occurrence
            if code in seen:
                continue
            title, title_idx = next_meaningful(lines, idx+1)
            if not title:
                continue
            party_a, party_b, fault_a, fault_b = extract_base_fault(code, lines, idx)
            cases.append({
                'category': category_for_code(code),
                'case_code': code,
                'title': title,
                'party_a_name': party_a,
                'party_b_name': party_b,
                'base_fault_a': fault_a if fault_a is not None else '',
                'base_fault_b': fault_b if fault_b is not None else '',
            })
            modifiers.extend(extract_modifiers(code, lines, idx))
            seen.add(code)

    # Special grouped table: page 584 has 거43-1~3 in one table and PyMuPDF splits body code as "거43"/"-1".
    cases = [r for r in cases if not (r['case_code'] == '거43' and r['title'] == '-1')]
    if not any(r['case_code'] == '거43-1' for r in cases):
        for code, title, a, b in [
            ('거43-1', '자전거 전용도로 통행 자전거 대 진로변경 자동차', 0, 100),
            ('거43-2', '자전거 전용차로 통행 자전거 대 진로변경 자동차', 0, 100),
            ('거43-3', '자전거 우선도로 통행 자전거 대 진로변경 자동차', 10, 90),
        ]:
            cases.append({
                'category': '자동차 대 자전거',
                'case_code': code,
                'title': title,
                'party_a_name': 'A',
                'party_b_name': 'B',
                'base_fault_a': a,
                'base_fault_b': b,
                'pdf_page_start': 584,
                'pdf_page_end': 584,
                'needs_review': 'Y'  # grouped table; verify manually
            })
    cases.sort(key=lambda r: (r['pdf_page_start'], r['case_code']))

    # infer end page as next case start - 1 within same CSV order
    for i, row in enumerate(cases):
        if i+1 < len(cases):
            row['pdf_page_end'] = max(row['pdf_page_start'], cases[i+1]['pdf_page_start'] - 1)
        else:
            row['pdf_page_end'] = row['pdf_page_start']
    with OUT_CASES.open('w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=list(cases[0].keys()))
        writer.writeheader(); writer.writerows(cases)
    with OUT_MODIFIERS.open('w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=['case_code','modifier_name','change_value'])
        writer.writeheader(); writer.writerows(modifiers)
    print(f'cases: {len(cases)} -> {OUT_CASES}')
    print(f'modifiers: {len(modifiers)} -> {OUT_MODIFIERS}')
    print('first 10 cases:')
    for r in cases[:10]:
        print(r)

if __name__ == '__main__':
    main()
