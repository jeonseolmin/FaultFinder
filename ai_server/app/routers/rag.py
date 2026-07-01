from pydantic import BaseModel
from fastapi import APIRouter
from app.services.embedding_service import create_embedding
from app.services.vector_search import search_similar_chunks
from app.services.official_vector_search import search_official_case_chunks
from app.services.llm_service import generate_answer

router = APIRouter(prefix="/rag", tags=["RAG"])


class RagRequest(BaseModel):
    question: str
    limit: int = 3


@router.post("/ask")
def ask_rag(request: RagRequest):
    query_embedding = create_embedding(request.question)

    official_chunks = search_official_case_chunks(query_embedding, 3)
    youtube_chunks = search_similar_chunks(query_embedding, request.limit)

    answer = generate_answer(
        request.question,
        official_chunks,
        youtube_chunks,
    )

    return {
        "question": request.question,
        "answer": answer,
        "official_chunks": official_chunks,
        "youtube_chunks": youtube_chunks,
    }