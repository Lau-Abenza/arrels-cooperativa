from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class AportacionCreate(BaseModel):
    socio_id: int
    producto: str
    kg: float
    precio_kg: Optional[float] = None
    notas: Optional[str] = None

class AportacionOut(BaseModel):
    id: int
    socio_id: int
    socio_nombre: Optional[str] = None
    trabajador_id: int
    trabajador_nombre: Optional[str] = None
    producto: str
    kg: float
    precio_kg: Optional[float] = None
    total: Optional[float] = None
    fecha: datetime
    notas: Optional[str] = None

    class Config:
        from_attributes = True