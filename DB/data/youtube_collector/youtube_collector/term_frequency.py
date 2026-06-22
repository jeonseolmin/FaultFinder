from collections import Counter
import csv
import re

from config import get_settings
from database import get_connection, init_schema


OUTPUT_CSV = "term_frequency.csv"
MIN_COUNT = 50


def extract_words(text: str) -> list[str]:
    # 한글 2글자 이상 단어만 추출
    return re.findall(r"[가-힣]{2,}", text)


def collect_term_frequency() -> None:
    settings = get_settings()
    counter: Counter[str] = Counter()

    with get_connection(settings) as conn:
        init_schema(conn)

        with conn.cursor() as cur:
            cur.execute("""
                SELECT transcript_normalized
                FROM youtube_videos
                WHERE transcript_normalized IS NOT NULL
                  AND transcript_normalized <> '';
            """)

            rows = cur.fetchall()

    print(f"분석 대상 자막 수: {len(rows)}개")

    for (text,) in rows:
        counter.update(extract_words(text))

    with open(OUTPUT_CSV, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["word", "count"])

        for word, count in counter.most_common():
            if count < MIN_COUNT:
                break

            writer.writerow([word, count])

    print(f"빈도 분석 완료: {OUTPUT_CSV}")


if __name__ == "__main__":
    collect_term_frequency()