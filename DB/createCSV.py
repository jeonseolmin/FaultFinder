import re
import csv
from pathlib import Path
import fitz  # PyMuPDF

PDF_PATH = Path('data/230630_자동차사고 과실비율 인정기준_최종.pdf')
OUT_CASES = Path('data/accident_cases_raw.csv')
OUT_MODIFIERS = Path('data/fault_modifiers_raw.csv')
OUT_DETAILS = Path('data/accident_case_details_raw.csv')

CODE_RE = re.compile(r'^(보\d+|차\d+(?:-\d+)?|거\d+(?:-\d+)?)$')
SKIP_PREFIXES = ('제1장', '제2장', '제3장', '자동차사고', '목차', '과', '실', '비', '율', '조', '정', '예', '시')

SECTION_HEADERS = [
    '사고 상황',
    '기본 과실비율 해설',
    '수정요소(인과관계를 감안한 과실비율 조정) 해설',
    '활용시 참고 사항',
    '관련 법규',
    '관련법규',
    '참고 판례',
]

NOISE_PATTERNS = [
    '제1장. 자동차와 보행자의 사고',
    '제2장. 자동차와 자동차(이륜차 포함)의 사고',
    '제3장. 자동차와 자전거(농기계 포함)의 사고',
    '목차',
]



def remove_noise(text: str) -> str:
    text = clean(text)
    for pattern in NOISE_PATTERNS:
        text = text.replace(pattern, '')
    return clean(text)

def category_for_code(code: str) -> str:
    if code.startswith('보'):
        return '자동차 대 보행자'
    if code.startswith('거'):
        return '자동차 대 자전거'
    if code.startswith('차'):
        return '자동차 대 자동차/이륜차'
    return ''


def clean(s: str) -> str:
    return re.sub(r'\s+', ' ', s.replace('\u200b', '').replace('\ufeff', '')).strip()


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
    window = [clean(x) for x in lines[idx: idx + 45] if clean(x)]
    joined = '\n'.join(window)

    if code.startswith('보'):
        for i, line in enumerate(window):
            if '보행자 기본 과실비율' in line or line == '보행자 기본' or '기본 과실비율' in line:
                for j in range(i + 1, min(i + 6, len(window))):
                    if re.fullmatch(r'\d{1,3}', window[j]):
                        a = int(window[j])
                        return '보행자', '자동차', a, 100 - a

        m = re.search(r'보행자 기본\s*과실비율\s*\n?(\d{1,3})', joined)
        if m:
            a = int(m.group(1))
            return '보행자', '자동차', a, 100 - a

    m_a = re.search(r'\bA\s*(\d{1,3})\b', joined)
    m_b = re.search(r'\bB\s*(\d{1,3})\b', joined)

    if m_a and m_b:
        return 'A', 'B', int(m_a.group(1)), int(m_b.group(1))

    for i, line in enumerate(window):
        if line == 'A' and i + 1 < len(window) and re.fullmatch(r'\d{1,3}', window[i + 1]):
            a = int(window[i + 1])
            for j in range(i + 2, min(i + 8, len(window))):
                if window[j] == 'B' and j + 1 < len(window) and re.fullmatch(r'\d{1,3}', window[j + 1]):
                    return 'A', 'B', a, int(window[j + 1])

    return ('보행자', '자동차', None, None) if code.startswith('보') else ('A', 'B', None, None)


def extract_modifiers(case_code, lines, idx):
    raw_segment = []

    for line in lines[idx + 1: idx + 90]:
        line = clean(line)

        if not line:
            continue

        if line.startswith('※') or line.startswith('사고 상황') or CODE_RE.match(line):
            break

        raw_segment.append(line)

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

    blacklist = {
        '기본 과실비율',
        '보행자 기본 과실비율',
        '과', '실', '비', '율', '조', '정', '예', '시'
    }

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
                mods.append({
                    'case_code': case_code,
                    'modifier_name': name,
                    'change_value': value
                })

            buffer = []
        else:
            if re.fullmatch(r'[①②③④⑤⑥⑦⑧⑨⑩]', line):
                continue
            buffer.append(line)

    return mods


def normalize_section_header(line: str) -> str:
    line = clean(line)

    if line == '관련법규':
        return '관련 법규'

    if line in SECTION_HEADERS:
        return line

    return ''


def extract_case_block(lines, idx):
    """
    사고코드가 나온 위치부터 다음 사고코드 전까지 텍스트 블록 생성
    """
    block = []

    for line in lines[idx + 1:]:
        line = clean(line)

        if not line:
            continue

        if CODE_RE.match(line):
            break

        if re.fullmatch(r'\d{3}', line):
            continue

        block.append(line)

    return block


def split_sections(block_lines):
    """
    사고 상황 / 기본 과실비율 해설 / 수정요소 해설 / 활용시 참고 사항 / 관련 법규 / 참고 판례 분리
    """
    result = {
        'accident_situation': '',
        'base_fault_explanation': '',
        'modifier_explanation': '',
        'legal_reference': '',
    }

    header_to_key = {
        '사고 상황': 'accident_situation',
        '기본 과실비율 해설': 'base_fault_explanation',
        '수정요소(인과관계를 감안한 과실비율 조정) 해설': 'modifier_explanation',
        '관련 법규': 'legal_reference',
    }

    current_key = None

    for line in block_lines:
        header = normalize_section_header(line)

        if header:
            current_key = header_to_key.get(header)
            continue

        if current_key:
            result[current_key] += line + '\n'

    for key in result:
        result[key] = remove_noise(result[key])

    return result


def main():
    doc = fitz.open(PDF_PATH)

    cases = []
    modifiers = []
    details = []
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

            if code in seen:
                continue

            title, title_idx = next_meaningful(lines, idx + 1)

            if not title:
                continue

            party_a, party_b, fault_a, fault_b = extract_base_fault(code, lines, idx)

            case_row = {
                'category': category_for_code(code),
                'case_code': code,
                'title': title,
                'party_a_name': party_a,
                'party_b_name': party_b,
                'base_fault_a': fault_a if fault_a is not None else '',
                'base_fault_b': fault_b if fault_b is not None else '',
                'pdf_page_start': page_no,
                'pdf_page_end': page_no,
                'needs_review': ''
            }

            cases.append(case_row)
            modifiers.extend(extract_modifiers(code, lines, idx))

            block_lines = extract_case_block(lines, idx)
            section_data = split_sections(block_lines)

            details.append({
                'case_code': code,
                'accident_situation': '',
                'base_fault_explanation': '',
                'modifier_explanation': '',
                'legal_reference': '',
            })

            seen.add(code)

    # 특수 케이스: 거43-1 ~ 거43-3
    cases = [r for r in cases if not (r['case_code'] == '거43' and r['title'] == '-1')]
    details = [r for r in details if r['case_code'] != '거43']

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
                'needs_review': 'Y'
            })

            details.append({
                'case_code': code,
                'accident_situation': '',
                'base_fault_explanation': '',
                'modifier_explanation': '',
                'legal_reference': '',
            })

    cases.sort(key=lambda r: (r['pdf_page_start'], r['case_code']))

    for i, row in enumerate(cases):
        if i + 1 < len(cases):
            row['pdf_page_end'] = max(row['pdf_page_start'], cases[i + 1]['pdf_page_start'] - 1)
        else:
            row['pdf_page_end'] = row['pdf_page_start']

    with OUT_CASES.open('w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=list(cases[0].keys()))
        writer.writeheader()
        writer.writerows(cases)

    with OUT_MODIFIERS.open('w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=['case_code', 'modifier_name', 'change_value'])
        writer.writeheader()
        writer.writerows(modifiers)

    with OUT_DETAILS.open('w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                'case_code',
                'accident_situation',
                'base_fault_explanation',
                'modifier_explanation',
                'legal_reference',
            ]
        )
        writer.writeheader()
        writer.writerows(details)

    print(f'cases: {len(cases)} -> {OUT_CASES}')
    print(f'modifiers: {len(modifiers)} -> {OUT_MODIFIERS}')
    print(f'details: {len(details)} -> {OUT_DETAILS}')

    print('first 5 details:')
    for r in details[:5]:
        print(r)


if __name__ == '__main__':
    main()