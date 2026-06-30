from openai import OpenAI
from app.config import OPENAI_API_KEY, OPENAI_EMBEDDING_MODEL

client = OpenAI(api_key=OPENAI_API_KEY)


def create_embedding(text: str) -> list[float]:
    if not text or not text.strip():
        raise ValueError("임베딩할 텍스트가 비어 있습니다.")

    response = client.embeddings.create(
        model=OPENAI_EMBEDDING_MODEL,
        input=text
    )

    return response.data[0].embedding