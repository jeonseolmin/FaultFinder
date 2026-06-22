from config import get_settings
from database import get_connection, init_schema
from description_cleaner import (
    clean_description,
    clean_title,
    extract_fault_ratio,
)


def process_descriptions() -> None:
    settings = get_settings()

    with get_connection(settings) as conn:
        init_schema(conn)

        with conn.cursor() as cur:
            cur.execute("""
                SELECT video_id, title, description
                FROM youtube_videos
                WHERE description IS NOT NULL
                  AND description <> '';
            """)
            rows = cur.fetchall()

        total = len(rows)
        print(f"description 처리 대상: {total}개")

        for idx, (video_id, title, description) in enumerate(rows, start=1):
            title_cleaned = clean_title(title)
            description_cleaned = clean_description(description)

            ratio = extract_fault_ratio(description)
            fault_ratio_raw = ratio["raw"]
            fault_ratio_a = ratio["a"]
            fault_ratio_b = ratio["b"]
            fault_ratio_confidence = ratio["confidence"]

            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO youtube_video_analysis (
                        video_id,
                        title_cleaned,
                        description_cleaned,
                        fault_ratio_raw,
                        fault_ratio_a,
                        fault_ratio_b,
                        fault_ratio_confidence,
                        updated_at
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
                    ON CONFLICT (video_id) DO UPDATE SET
                        title_cleaned = EXCLUDED.title_cleaned,
                        description_cleaned = EXCLUDED.description_cleaned,
                        fault_ratio_raw = EXCLUDED.fault_ratio_raw,
                        fault_ratio_a = EXCLUDED.fault_ratio_a,
                        fault_ratio_b = EXCLUDED.fault_ratio_b,
                        fault_ratio_confidence = EXCLUDED.fault_ratio_confidence,
                        updated_at = NOW();
                """, (
                    video_id,
                    title_cleaned,
                    description_cleaned,
                    fault_ratio_raw,
                    fault_ratio_a,
                    fault_ratio_b,
                    fault_ratio_confidence,
                ))

            conn.commit()
            print(f"[{idx}/{total}] {video_id} 처리 완료")

    print("description 전처리 완료")


if __name__ == "__main__":
    process_descriptions()