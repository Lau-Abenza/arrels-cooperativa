from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="Arrels API",
    description="Plataforma digital para cooperativa agrícola",
    version="0.1.0"
)

@app.get("/")
def root():
    return {"mensaje": "Arrels API funcionando", "version": "0.1.0"}

@app.get("/health")
def health():
    return {"status": "ok"}