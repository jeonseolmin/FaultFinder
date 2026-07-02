from app.db import get_connection


def search_official_case_chunks(query_embedding: list[float], limit: int = 3):
    sql = """
        SELECT
            case_code,
            title,
            category,
            chunk_text,
            base_fault_a,
            base_fault_b,
            party_a_name,
            party_b_name,
            embedding <=> %s::vector AS distance
        FROM accident_case_chunks
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
            "case_code": row[0],
            "title": row[1],
            "category": row[2],
            "chunk_text": row[3],
            "base_fault_a": row[4],
            "base_fault_b": row[5],
            "party_a_name": row[6],
            "party_b_name": row[7],
            "distance": float(row[8]),
        }
        for row in rows
    ]