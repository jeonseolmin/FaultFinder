import re

CORRECTIONS = {
    "불박차": "블박차",
    "풀박차": "블박차",
    "불박": "블박",
    "블럭차": "블박차",
    "자회전": "좌회전",
    "우회 전": "우회전",
    "좌 회전": "좌회전",
    "횡단 보도": "횡단보도",
    "신호 등": "신호등",
    "과실 비율": "과실비율",
    "되요": "돼요",
    "거에요": "거예요",
}


STOPWORDS = {
    "아이고",
    "어휴",
    "여러분",
    "투표",
    "보겠습니다",
    "보시죠",
    "진짜",
    "정말",
    "요거",
    "이거",
    "저거",
}


def apply_corrections(text: str) -> str:
    for wrong, correct in CORRECTIONS.items():
        text = text.replace(wrong, correct)
    return text


def remove_stopwords(text: str) -> str:
    words = text.split()
    return " ".join(word for word in words if word not in STOPWORDS)


def normalize_transcript(text: str) -> str:
    if not text:
        return ""

    text = apply_corrections(text)
    text = remove_stopwords(text)
    text = re.sub(r"\s+", " ", text).strip()

    return text