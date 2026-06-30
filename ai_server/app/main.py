from fastapi import FastAPI
from app.routers.rag import router as rag_router

app = FastAPI(title="FaultFinder AI Server")

app.include_router(rag_router)


@app.get("/")
def root():
    return {
        "status": "ok",
        "service": "FaultFinder AI Server"
    }