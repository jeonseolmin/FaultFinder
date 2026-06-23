import psycopg2

conn = psycopg2.connect(
    host="localhost",
    port=5432,
    dbname="fault_find_db",
    user="postgres",
    password="1111"
)

cur = conn.cursor()

cur.execute("""
    SELECT
        video_id,
        title_cleaned,
        description_cleaned,
        accident_summary,
        fault_ratio_a,
        fault_ratio_b,
        fault_ratio_confidence
    FROM youtube_video_analysis
    WHERE fault_ratio_a IS NOT NULL
      AND fault_ratio_b IS NOT NULL
""")

rows = cur.fetchall()

inserted = 0

for row in rows:
    (
        video_id,
        title,
        description,
        accident_summary,
        fault_a,
        fault_b,
        confidence
    ) = row

    chunk_text = f"""
출처: 한문철TV
제목: {title}

사고 요약:
{accident_summary}

과실비율:
블박차 {fault_a} : 상대차 {fault_b}

신뢰도:
{confidence}

설명:
{description}
""".strip()

    cur.execute("""
        INSERT INTO rag_chunks (
            source_type,
            source_id,
            title,
            chunk_text,
            chunk_index,
            fault_ratio_a,
            fault_ratio_b,
            confidence
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        "YOUTUBE_VIDEO",
        video_id,
        title,
        chunk_text,
        0,
        fault_a,
        fault_b,
        confidence
    ))

    inserted += 1

conn.commit()
cur.close()
conn.close()

print(f"청크 저장 완료: {inserted}건")