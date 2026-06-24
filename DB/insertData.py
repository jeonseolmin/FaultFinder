import pandas as pd
import psycopg2
import chardet

file_path = "data/fault_modifiers_raw.csv"
with open(file_path, "rb") as f:
    raw = f.read(50000)
print(chardet.detect(raw))
print(raw[:20])
file_path = "data/accident_cases_raw.csv"
with open(file_path, "rb") as f:
    raw = f.read(50000)
print(chardet.detect(raw))
print(raw[:20])
file_path = "data/accident_case_details_raw.csv"
with open(file_path, "rb") as f:
    raw = f.read(50000)
print(chardet.detect(raw))
print(raw[:20])

conn = psycopg2.connect(
    host="localhost",
    port=5432,
    dbname="fault_find_db",
    user="postgres",
    password="1111"
)

cur = conn.cursor()


# 1. accident_cases 저장
df_cases = pd.read_csv("data/accident_cases_raw.csv", encoding="CP949")

NOISE_PATTERNS = [
    "제1장. 자동차와 보행자의 사고",
    "제2장. 자동차와 자동차(이륜차 포함)의 사고",
    "제3장. 자동차와 자전거(농기계 포함)의 사고",
    "자동차사고 과실비율 인정기준",
    "목차",
]

def safe(value):
    if pd.isna(value):
        return None

    value = str(value).strip()

    if value == "" or value.lower() == "nan":
        return None

    for noise in NOISE_PATTERNS:
        value = value.replace(noise, "")

    value = " ".join(value.split()).strip()

    return value if value else None

for _, row in df_cases.iterrows():
    cur.execute("""
        INSERT INTO accident_cases (
            case_code,
            category,
            title,
            party_a_name,
            party_b_name,
            base_fault_a,
            base_fault_b
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (case_code) DO UPDATE SET
            category = EXCLUDED.category,
            title = EXCLUDED.title,
            party_a_name = EXCLUDED.party_a_name,
            party_b_name = EXCLUDED.party_b_name,
            base_fault_a = EXCLUDED.base_fault_a,
            base_fault_b = EXCLUDED.base_fault_b
    """, (
        row["case_code"],
        row["category"],
        row["title"],
        row["party_a_name"],
        row["party_b_name"],
        None if pd.isna(row["base_fault_a"]) else int(row["base_fault_a"]),
        None if pd.isna(row["base_fault_b"]) else int(row["base_fault_b"])
    ))
print("1번 완")

# 2. fault_modifiers 저장
df_modifiers = pd.read_csv("data/fault_modifiers_raw.csv", encoding="CP949")

for _, row in df_modifiers.iterrows():
    cur.execute("""
        INSERT INTO fault_modifiers (
            case_code,
            modifier_name,
            change_value
        )
        VALUES (%s, %s, %s)
        ON CONFLICT (case_code, modifier_name) DO UPDATE SET
            change_value = EXCLUDED.change_value
    """, (
        row["case_code"],
        row["modifier_name"],
        row["change_value"]
    ))


# 3. accident_case_details 저장
df_details = pd.read_csv("data/accident_case_details.csv", encoding="UTF-8-SIG")
df_details = df_details.where(pd.notnull(df_details), None)

for _, row in df_details.iterrows():
    cur.execute("""
        INSERT INTO accident_case_details (
            case_code,
            accident_situation,
            base_fault_explanation,
            modifier_explanation,
            legal_reference
        )
        VALUES (%s, %s, %s, %s, %s)
        ON CONFLICT (case_code) DO UPDATE SET
            accident_situation = EXCLUDED.accident_situation,
            base_fault_explanation = EXCLUDED.base_fault_explanation,
            modifier_explanation = EXCLUDED.modifier_explanation,
            legal_reference = EXCLUDED.legal_reference
    """, (
        row["case_code"],
        safe(row["accident_situation"]),
        safe(row["base_fault_explanation"]),
        safe(row["modifier_explanation"]),
        safe(row["legal_reference"]),
    ))

conn.commit()
cur.close()
conn.close()


print("CSV 데이터 PostgreSQL 저장 완료")