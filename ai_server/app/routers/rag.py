from pydantic import BaseModel
from fastapi import APIRouter
from app.services.embedding_service import create_embedding
from app.services.vector_search import search_similar_chunks
from app.services.llm_service import generate_answer

router = APIRouter(prefix="/rag", tags=["RAG"])


class RagRequest(BaseModel):
    question: str
    limit: int = 5


@router.post("/ask")
def ask_rag(request: RagRequest):
    query_embedding = create_embedding(request.question)
    chunks = search_similar_chunks(query_embedding, request.limit)
    answer = generate_answer(request.question, chunks)

    return {
        "question": request.question,
        "answer": answer,
        "chunks": chunks,
    }