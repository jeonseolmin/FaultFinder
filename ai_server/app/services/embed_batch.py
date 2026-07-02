import time
import random

from app.db import get_connection
from app.services.embedding_service import create_embedding


BATCH_SIZE = 20
MAX_RETRIES = 6
BASE_SLEEP_SECONDS = 10
REQUEST_SLEEP_SECONDS = 0.3


def fetch_targets(limit: int):
    sql = """
        SELECT id, title, chunk_text
        FROM rag_chunks
        WHERE embedding IS NULL
        ORDER BY id
        LIMIT %s
    """

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (limit,))
            return cur.fetchall()


def update_embedding(chunk_id: int, embedding: list[float]):
    sql = """
        UPDATE rag_chunks
        SET embedding = %s::vector
        WHERE id = %s
    """

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (embedding, chunk_id))
        conn.commit()


def build_embedding_text(title: str | None, chunk_text: str) -> str:
    return f"""
제목:
{title or ""}

내용:
{chunk_text}
""".strip()


def is_rate_limit_error(error: Exception) -> bool:
    message = str(error).lower()
    return (
        "429" in message
        or "too many requests" in message
        or "rate limit" in message
        or "quota" in message
        or "resource_exhausted" in message
    )


def create_embedding_with_retry(text: str):
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            return create_embedding(text)

        except Exception as e:
            if not is_rate_limit_error(e):
                raise e

            sleep_seconds = BASE_SLEEP_SECONDS * attempt + random.uniform(0, 3)

            print(
                f"[429] rate limit 감지. "
                f"{sleep_seconds:.1f}초 대기 후 재시도 "
                f"({attempt}/{MAX_RETRIES})"
            )

            time.sleep(sleep_seconds)

    raise RuntimeError("임베딩 재시도 횟수 초과")


def run():
    total = 0

    while True:
        rows = fetch_targets(BATCH_SIZE)

        if not rows:
            print("완료: 더 이상 embedding이 NULL인 데이터가 없습니다.")
            break

        for chunk_id, title, chunk_text in rows:
            try:
                text = build_embedding_text(title, chunk_text)
                embedding = create_embedding_with_retry(text)
                update_embedding(chunk_id, embedding)

                total += 1
                print(f"[OK] id={chunk_id}, total={total}")

                time.sleep(REQUEST_SLEEP_SECONDS)

            except Exception as e:
                print(f"[ERROR] id={chunk_id}: {e}")
                time.sleep(3)

    print(f"총 처리 개수: {total}")


if __name__ == "__main__":
    run()