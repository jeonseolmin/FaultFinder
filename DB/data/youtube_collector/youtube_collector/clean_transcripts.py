from config import get_settings
from database import get_connection, init_schema
from transcript_cleaner import clean_transcript


def clean_all_transcripts() -> None:
    settings = get_settings()

    with get_connection(settings) as conn:
        init_schema(conn)

        with conn.cursor() as cur:
            cur.execute("""
                SELECT video_id, transcript
                FROM youtube_videos
                WHERE transcript IS NOT NULL
                  AND transcript <> ''
                ORDER BY published_at DESC NULLS LAST;
            """)

            rows = cur.fetchall()

        total = len(rows)
        print(f"정제 대상: {total}개")

        for idx, (video_id, transcript) in enumerate(rows, start=1):

            normalized = clean_transcript(transcript)
            if idx == 1:
                print("원본:")
                print(transcript[:300])

                normalized = clean_transcript(transcript)

                print("변환:")
                print(normalized[:300])
            with conn.cursor() as cur:

                cur.execute("""
                    UPDATE youtube_videos
                    SET transcript_normalized = %s,
                        updated_at = NOW()
                    WHERE video_id = %s;
                """, (normalized, video_id))

            conn.commit()

            print(f"[{idx}/{total}] {video_id} 정제 완료")

    print("전체 자막 정제 완료")


if __name__ == "__main__":
    clean_all_transcripts()