from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class FichajeCreate(BaseModel):
    tipo: str  # "entrada" o "salida"
    lat: Optional[float] = None
    lon: Optional[float] = None
    notas: Optional[str] = None

class FichajeOut(BaseModel):
    id: int
    usuario_id: int
    usuario_nombre: Optional[str] = None
    tipo: str
    timestamp: datetime
    lat: Optional[float] = None
    lon: Optional[float] = None
    notas: Optional[str] = None

    class Config:
        from_attributes = True

class ResumenFichajes(BaseModel):
    usuario_id: int
    usuario_nombre: str
    total_horas_mes: float
    fichajes: List[FichajeOut]