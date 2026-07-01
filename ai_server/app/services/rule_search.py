# app/services/rule_search.py

from app.db import get_connection

def search_rule_by_case_code(case_code: str):
    sql = """
        SELECT
            ac.case_code,
            ac.title,
            ac.party_a_name,
            ac.party_b_name,
            ac.base_fault_a,
            ac.base_fault_b,
            ac.category,
            d.accident_situation,
            d.base_fault_explanation,
            d.modifier_explanation,
            d.legal_reference
        FROM accident_cases ac
        LEFT JOIN accident_case_details d
            ON ac.case_code = d.case_code
        WHERE ac.case_code = %s
    """

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (case_code,))
            row = cur.fetchone()

    return row