import re

def extract_fault_ratio(text: str) -> dict:
    if not text:
        return {"raw": None, "a": None, "b": None, "confidence": None}

    patterns = [
        (
            r"블박차\s*(?:잘못|과실)?\s*(\d{1,3})\s*%.*?"
            r"(?:상대차|상대방|상대)\s*(?:잘못|과실)?\s*(\d{1,3})\s*%",
            "HIGH",
            False,
        ),
        (
            r"(?:상대차|상대방|상대)\s*(?:잘못|과실)?\s*(\d{1,3})\s*%.*?"
            r"블박차\s*(?:잘못|과실)?\s*(\d{1,3})\s*%",
            "HIGH",
            True,
        ),
        (r"\b(\d{1,3})\s*[:：]\s*(\d{1,3})\b", "MEDIUM", False),
        (r"\b(\d{1,3})\s*대\s*(\d{1,3})\b", "MEDIUM", False),
    ]

    for pattern, confidence, reversed_order in patterns:
        match = re.search(pattern, text)
        if not match:
            continue

        a = int(match.group(1))
        b = int(match.group(2))

        if a + b == 10:
            a *= 10
            b *= 10

        if reversed_order:
            a, b = b, a

        if not (0 <= a <= 100 and 0 <= b <= 100):
            continue

        return {
            "raw": match.group(0).strip(),
            "a": a,
            "b": b,
            "confidence": confidence,
        }

    return {"raw": None, "a": None, "b": None, "confidence": None}

def clean_description(text: str) -> str:
    if not text:
        return ""

    text = re.sub(r"https?://\S+", " ", text)
    text = re.sub(r"www\.\S+", " ", text)
    text = re.sub(r"[\w\.-]+@[\w\.-]+\.\w+", " ", text)

    text = re.sub(r"#\d+", " ", text)
    text = re.sub(r"#\S+", " ", text)

    remove_words = [
        "생방송",
        "주간베스트",
        "블랙박스",
        "한문철TV",
        "구독",
        "좋아요",
        "알림설정",
        "제보",
        "멤버십",
        "광고",
        "협찬",
    ]

    for word in remove_words:
        text = text.replace(word, " ")

    text = re.sub(r"\d{6}\s*\([월화수목금토일]\)", " ", text)
    text = re.sub(r"\d{4}\.\s*\d{1,2}\.\s*\d{1,2}\.", " ", text)
    text = re.sub(r"[-=]{3,}", " ", text)
    text = re.sub(r"[★☆▶▷■□●○※]+", " ", text)

    text = re.sub(r"\s+", " ", text).strip()
    return text


def clean_title(title: str) -> str:
    if not title:
        return ""

    title = re.sub(r"^\s*\d+\s*회\.?\s*", " ", title)
    title = re.sub(r"\s+", " ", title).strip()
    return title
