import re
from pathlib import Path


BASE_DIR = Path(__file__).parent


def load_stopwords(path):
    with open(path, "r", encoding="utf-8") as f:
        return {
            line.strip()
            for line in f
            if line.strip()
        }


def load_corrections(path):
    corrections = {}

    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()

            if not line:
                continue

            if "=" not in line:
                continue

            wrong, correct = line.split("=", 1)

            corrections[wrong.strip()] = correct.strip()

    return corrections


STOPWORDS = load_stopwords(
    BASE_DIR / "faultfinder_stopwords.txt"
)

CORRECTIONS = load_corrections(
    BASE_DIR / "traffic_corrections.txt"
)


def apply_corrections(text: str) -> str:

    for wrong, correct in sorted(
        CORRECTIONS.items(),
        key=lambda x: len(x[0]),
        reverse=True
    ):
        text = text.replace(wrong, correct)

    return text


def remove_stopwords(text: str) -> str:

    words = text.split()

    return " ".join(
        word
        for word in words
        if word not in STOPWORDS
    )


def remove_repeated_phrases(text: str) -> str:

    words = text.split()

    result = []

    i = 0

    while i < len(words):

        repeated = False

        for size in range(30, 2, -1):

            first = words[i:i + size]
            second = words[i + size:i + size * 2]

            if len(first) == size and first == second:

                result.extend(first)

                i += size * 2

                repeated = True

                break

        if not repeated:

            result.append(words[i])

            i += 1

    return " ".join(result)


def clean_transcript(text: str) -> str:

    if not text:
        return ""

    # VTT 제거
    text = re.sub(
        r"Kind:\s*captions\s*Language:\s*\w+",
        " ",
        text
    )

    # HTML 제거
    text = re.sub(r"<[^>]+>", " ", text)

    # [음악], [박수] 제거
    text = re.sub(r"\[[^\]]+\]", " ", text)

    # 중복 문장 제거
    text = remove_repeated_phrases(text)

    # 오인식 교정
    text = apply_corrections(text)

    # 불용어 제거
    text = remove_stopwords(text)

    # 공백 정리
    text = re.sub(r"\s+", " ", text)

    return text.strip()