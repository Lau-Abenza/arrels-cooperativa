from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PlanAccionCreate(BaseModel):
    socio_id: int
    titulo: str
    descripcion: str

class PlanAccionUpdate(BaseModel):
    titulo: Optional[str] = None
    descripcion: Optional[str] = None
    estado: Optional[str] = None

class PlanAccionOut(BaseModel):
    id: int
    socio_id: int
    socio_nombre: Optional[str] = None
    ingeniero_id: int
    ingeniero_nombre: Optional[str] = None
    titulo: str
    descripcion: str
    estado: str
    fecha: datetime

    class Config:
        from_attributes = True