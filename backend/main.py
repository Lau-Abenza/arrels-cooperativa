from fastapi import FastAPI
from dotenv import load_dotenv
from routers import auth, parcelas, productos, ventas
import os

load_dotenv()

app = FastAPI(
    title="Arrels API",
    description="Plataforma digital para cooperativa agrícola",
    version="0.1.0"
)

app.include_router(auth.router)
app.include_router(parcelas.router)
app.include_router(productos.router)
app.include_router(ventas.router)

@app.get("/")
def root():
    return {"mensaje": "Arrels API funcionando", "version": "0.1.0"}

@app.get("/health")
def health():
    return {"status": "ok"}