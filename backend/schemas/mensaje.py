from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class MensajeCreate(BaseModel):
    para_id: int
    texto: str
    foto_url: Optional[str] = None

class MensajeOut(BaseModel):
    id: int
    de_id: int
    de_nombre: Optional[str] = None
    para_id: int
    para_nombre: Optional[str] = None
    texto: str
    foto_url: Optional[str] = None
    leido: bool
    fecha: datetime

    class Config:
        from_attributes = True