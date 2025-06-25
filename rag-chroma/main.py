from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from rag_utils import index_menu, query_menu

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Server starting up...")
    index_menu() # Index data when the server starts
    print("Menu indexing complete.")
    yield
    print("Server shutting down.")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/retrieve")
async def retrieve(req: Request):
    body = await req.json()
    question = body.get("question", "")
    if not question:
        return {"error": "No question provided."}
    result = query_menu(question)
    return result
