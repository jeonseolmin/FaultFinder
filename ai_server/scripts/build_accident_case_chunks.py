import os
import time
import psycopg2
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "port": os.getenv("DB_PORT", "5432"),
    "dbname": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
}

EMBEDDING_MODEL = "gemini-embedding-001"


def get_embedding(text: str) -> list[float]:
    response = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=text,
    )
    return response.embeddings[0].values


def format_modifier_rows(rows):
    if not rows:
        return "수정 요소: 없음"

    lines = ["수정 요소:"]
    for name, value in rows:
        lines.append(
            f"- {name}: {value:+d}%" if value is not None else f"- {name}: 변동값 없음"
        )

    return "\n".join(lines)


def build_chunk_text(case, modifiers):
    (
        case_code,
        title,
        category,
        party_a_name,
        party_b_name,
        base_fault_a,
        base_fault_b,
        accident_situation,
        base_fault_explanation,
        modifier_explanation,
        legal_reference,
    ) = case

    return f"""
사례번호: {case_code}
분류: {category}
제목: {title}

당사자 A: {party_a_name}
당사자 B: {party_b_name}
기본 과실비율: A {base_fault_a}%, B {base_fault_b}%

사고 상황:
{accident_situation or "정보 없음"}

기본 과실 설명:
{base_fault_explanation or "정보 없음"}

수정요소 설명:
{modifier_explanation or "정보 없음"}

{format_modifier_rows(modifiers)}

관련 법령 및 참고:
{legal_reference or "정보 없음"}
""".strip()


def main():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    cur.execute("""
        SELECT
            ac.case_code,
            ac.title,
            ac.category,
            ac.party_a_name,
            ac.party_b_name,
            ac.base_fault_a,
            ac.base_fault_b,
            d.accident_situation,
            d.base_fault_explanation,
            d.modifier_explanation,
            d.legal_reference
        FROM accident_cases ac
        LEFT JOIN accident_case_details d
            ON ac.case_code = d.case_code
        ORDER BY ac.case_code
    """)

    cases = cur.fetchall()
    print(f"총 {len(cases)}개 기준 케이스 조회")

    for idx, case in enumerate(cases, start=1):
        case_code = case[0]

        cur.execute("""
                    SELECT modifier_name,
                           change_value
                    FROM fault_modifiers
                    WHERE case_code = %s
                    ORDER BY id
                    """, (case_code,))

        modifiers = cur.fetchall()
        chunk_text = build_chunk_text(case, modifiers)
        embedding = get_embedding(chunk_text)

        cur.execute("""
            INSERT INTO accident_case_chunks (
                case_code,
                title,
                category,
                chunk_text,
                base_fault_a,
                base_fault_b,
                embedding
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s::vector)
            ON CONFLICT (case_code)
            DO UPDATE SET
                title = EXCLUDED.title,
                category = EXCLUDED.category,
                chunk_text = EXCLUDED.chunk_text,
                base_fault_a = EXCLUDED.base_fault_a,
                base_fault_b = EXCLUDED.base_fault_b,
                embedding = EXCLUDED.embedding
        """, (
            case[0],
            case[1],
            case[2],
            chunk_text,
            case[5],
            case[6],
            embedding,
        ))

        conn.commit()
        print(f"[{idx}/{len(cases)}] 저장 완료: {case_code}")

        time.sleep(0.2)

    cur.close()
    conn.close()
    print("공식 기준 RAG chunk 생성 완료")


if __name__ == "__main__":
    main()