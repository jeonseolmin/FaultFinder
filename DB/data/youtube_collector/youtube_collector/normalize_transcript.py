from config import get_settings
from database import get_connection, init_schema
from transcript_normalizer import normalize_transcript


def normalize_all_transcripts() -> None:
    settings = get_settings()

    with get_connection(settings) as conn:
        init_schema(conn)

        with conn.cursor() as cur:
            cur.execute("""
                SELECT video_id, transcript_normalized
                FROM youtube_videos
                WHERE transcript_normalized IS NOT NULL
                  AND transcript_normalized <> '';
            """)
            rows = cur.fetchall()

        total = len(rows)
        print(f"정규화 대상: {total}개")

        for idx, (video_id, transcript_cleaned) in enumerate(rows, start=1):
            normalized = normalize_transcript(transcript_cleaned)

            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE youtube_videos
                    SET transcript_normalized = %s,
                        updated_at = NOW()
                    WHERE video_id = %s;
                """, (normalized, video_id))

            conn.commit()
            print(f"[{idx}/{total}] {video_id} 정규화 완료")

    print("전체 정규화 완료")


if __name__ == "__main__":
    normalize_all_transcripts()