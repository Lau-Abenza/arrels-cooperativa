from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class LineaVentaIn(BaseModel):
    producto_id: int
    cantidad: int

class VentaCreate(BaseModel):
    socio_id: Optional[int] = None
    lineas: List[LineaVentaIn]

class LineaVentaOut(BaseModel):
    id: int
    producto_id: int
    producto_nombre: Optional[str] = None
    cantidad: int
    precio_ud: float
    subtotal: float

    class Config:
        from_attributes = True

class VentaOut(BaseModel):
    id: int
    socio_id: Optional[int] = None
    socio_nombre: Optional[str] = None
    trabajador_id: int
    trabajador_nombre: Optional[str] = None
    fecha: datetime
    total: float
    ticket_pdf_url: Optional[str] = None
    lineas: List[LineaVentaOut] = []

    class Config:
        from_attributes = True