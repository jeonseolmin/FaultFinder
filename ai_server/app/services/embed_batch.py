from app.db import get_connection
from app.services.embedding_service import create_embedding


BATCH_SIZE = 50


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
        SET embedding = %s
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
                embedding = create_embedding(text)
                update_embedding(chunk_id, embedding)

                total += 1
                print(f"[OK] id={chunk_id}, total={total}")

            except Exception as e:
                print(f"[ERROR] id={chunk_id}: {e}")

    print(f"총 처리 개수: {total}")


if __name__ == "__main__":
    run()