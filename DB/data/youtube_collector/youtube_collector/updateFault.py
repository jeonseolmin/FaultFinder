import pandas as pd
import psycopg2

conn = psycopg2.connect(
    host="localhost",
    port=5432,
    dbname="fault_find_db",
    user="postgres",
    password="1111"
)

cur = conn.cursor()

df = pd.read_excel("data/rag_chunks_fixed_ratio.xlsx")

# 기존 청크 전체 삭제 후 재삽입
cur.execute("TRUNCATE TABLE rag_chunks RESTART IDENTITY;")

inserted = 0

for _, row in df.iterrows():
    # 과실비율 없는 행은 제외
    if pd.isna(row["fault_ratio_a"]) or pd.isna(row["fault_ratio_b"]):
        continue

    # 합계가 100이 아닌 행은 제외
    if int(row["fault_ratio_a"]) + int(row["fault_ratio_b"]) != 100:
        continue

    cur.execute("""
        INSERT INTO rag_chunks (
            source_type,
            source_id,
            title,
            chunk_text,
            chunk_index,
            fault_ratio_a,
            fault_ratio_b,
            confidence,
            created_at
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP)
    """, (
        row["source_type"],
        row["source_id"],
        row["title"],
        row["chunk_text"],
        int(row["chunk_index"]),
        int(row["fault_ratio_a"]),
        int(row["fault_ratio_b"]),
        row["confidence"]
    ))

    inserted += 1

conn.commit()
cur.close()
conn.close()

print(f"rag_chunks 적재 완료: {inserted}건")