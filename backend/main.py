from fastapi import FastAPI
from dotenv import load_dotenv
from routers import (auth, parcelas, productos, ventas,
                     fichajes, alquileres, aportaciones,
                     mensajes, planes_accion, sync, sensores)
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
app.include_router(fichajes.router)
app.include_router(alquileres.router)
app.include_router(aportaciones.router)
app.include_router(mensajes.router)
app.include_router(planes_accion.router)
app.include_router(sync.router)
app.include_router(sensores.router)

@app.get("/")
def root():
    return {"mensaje": "Arrels API funcionando", "version": "0.1.0"}

@app.get("/health")
def health():
    return {"status": "ok"}