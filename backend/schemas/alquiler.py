from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class AperoOut(BaseModel):
    id: int
    nombre: str
    tipo: str
    descripcion: Optional[str] = None
    precio_dia: float
    disponible: bool
    imagen_url: Optional[str] = None

    class Config:
        from_attributes = True

class AperoCreate(BaseModel):
    nombre: str
    tipo: str
    descripcion: Optional[str] = None
    precio_dia: float
    imagen_url: Optional[str] = None

class AlquilerCreate(BaseModel):
    apero_id: int
    socio_id: int
    fecha_inicio: datetime
    fecha_fin: datetime
    observaciones: Optional[str] = None

class AlquilerOut(BaseModel):
    id: int
    apero_id: int
    apero_nombre: Optional[str] = None
    socio_id: int
    socio_nombre: Optional[str] = None
    trabajador_id: int
    trabajador_nombre: Optional[str] = None
    fecha_inicio: datetime
    fecha_fin: datetime
    precio_total: Optional[float] = None
    estado: str
    observaciones: Optional[str] = None

    class Config:
        from_attributes = True

class DevolucionIn(BaseModel):
    observaciones: Optional[str] = None