from openai import OpenAI
from app.config import OPENAI_API_KEY, OPENAI_CHAT_MODEL

client = OpenAI(api_key=OPENAI_API_KEY)


def generate_answer(question: str, chunks: list[dict]) -> str:
    context = ""

    for i, chunk in enumerate(chunks, start=1):
        context += f"""
[유사 사례 {i}]
제목: {chunk.get("title")}
출처 타입: {chunk.get("source_type")}
출처 ID: {chunk.get("source_id")}
추출 과실비율: {chunk.get("fault_ratio_a")}:{chunk.get("fault_ratio_b")}
신뢰도: {chunk.get("confidence")}
내용:
{chunk.get("chunk_text")}
"""

    system_prompt = """
당신은 교통사고 과실비율 분석 보조 AI입니다.
주어진 유사 사례와 과실비율 데이터를 근거로 답변하세요.

규칙:
1. 확정적으로 단정하지 말고 "유사 사례 기준", "추정"이라고 표현하세요.
2. 과실비율은 데이터에 있는 경우에만 제시하세요.
3. 신호, 속도, 차선, 블랙박스 여부에 따라 달라질 수 있음을 안내하세요.
4. 답변은 한국어로 작성하세요.
5. 법률 자문이 아니라 참고용 분석이라고 명시하세요.
"""

    user_prompt = f"""
사용자 질문:
{question}

검색된 유사 사례:
{context}

위 자료를 바탕으로 다음 형식으로 답변하세요.

1. 사고 상황 요약
2. 유사 사례 기준 예상 과실비율
3. 근거
4. 추가로 확인해야 할 요소
5. 주의 문구
"""

    response = client.chat.completions.create(
        model=OPENAI_CHAT_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.2,
    )

    return response.choices[0].message.content