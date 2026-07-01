from app.db import get_connection


def search_similar_chunks(query_embedding: list[float], limit: int = 5):
    sql = """
        SELECT
            id,
            source_type,
            source_id,
            title,
            chunk_text,
            chunk_index,
            fault_ratio_a,
            fault_ratio_b,
            confidence,
            embedding <=> %s::vector AS distance
        FROM rag_chunks
        WHERE embedding IS NOT NULL
        ORDER BY embedding <=> %s::vector
        LIMIT %s
    """

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (query_embedding, query_embedding, limit))
            rows = cur.fetchall()

    return [
        {
            "id": row[0],
            "source_type": row[1],
            "source_id": row[2],
            "title": row[3],
            "chunk_text": row[4],
            "chunk_index": row[5],
            "fault_ratio_a": row[6],
            "fault_ratio_b": row[7],
            "confidence": row[8],
            "distance": float(row[9]),
        }
        for row in rows
    ]