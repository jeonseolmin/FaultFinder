from google import genai

from app.config import (
    GEMINI_API_KEY,
    GEMINI_CHAT_MODEL,
)

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_answer(
    question: str,
    official_chunks: list[dict],
    youtube_chunks: list[dict],
) -> str:

    official_context = ""

    for i, chunk in enumerate(official_chunks, start=1):
        official_context += f"""
        [공식 인정기준 {i}]
        유사도: {chunk.get("distance"):.4f}

        사례번호: {chunk.get("case_code")}
        제목: {chunk.get("title")}
        분류: {chunk.get("category")}

        기본 과실비율:
        A {chunk.get("base_fault_a")}%
        B {chunk.get("base_fault_b")}%

        내용:
        {chunk.get("chunk_text")}
        """

    youtube_context = ""

    for i, chunk in enumerate(youtube_chunks, start=1):
        youtube_context += f"""
        [유사 사례 {i}]
        유사도: {chunk.get("distance"):.4f}

        제목: {chunk.get("title")}
        출처: {chunk.get("source_type")}

        추출 과실비율:
        {chunk.get("fault_ratio_a")}:{chunk.get("fault_ratio_b")}

        신뢰도:
        {chunk.get("confidence")}

        내용:
        {chunk.get("chunk_text")}
        """

    prompt = f"""
    
당신은 교통사고 과실비율 인정기준을 설명하는 AI입니다.

반드시 아래 규칙을 따르세요.

규칙

1. 공식 인정기준(PDF)을 가장 우선적으로 참고하세요.
2. 유튜브 사례는 참고 사례로만 활용하세요.
3. 공식 인정기준과 사례가 다르면 공식 인정기준을 우선하세요.
4. 과실비율은 확정이 아니라 참고용 예상이라고 설명하세요.
5. 법률 자문이 아닌 일반적인 참고 정보임을 안내하세요.
6. 한국어로 답변하세요.
7. 유사도(distance)가 낮을수록 사용자 질문과 더 유사한 자료입니다.
   유사도가 낮은 자료를 우선적으로 참고하세요.
8. 제공된 데이터에 없는 기관명, 출처명, 법령명은 임의로 만들지 마세요.

========================
사용자 질문
========================

{question}

========================
공식 인정기준
========================

{official_context}

========================
실제 유사 사례
========================

{youtube_context}

========================
답변 형식
========================

1. 사고 상황 요약

2. 공식 인정기준

3. 유사 사례 비교

4. 예상 과실비율

5. 과실비율이 달라질 수 있는 요소

6. 참고사항
"""

    response = client.models.generate_content(
        model=GEMINI_CHAT_MODEL,
        contents=prompt,
    )

    return response.text