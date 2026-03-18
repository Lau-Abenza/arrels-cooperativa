from pydantic import BaseModel
from typing import Optional

class ProductoBase(BaseModel):
    nombre_es: str
    nombre_en: str
    descripcion_es: str
    descripcion_en: str
    precio: float
    unidad: str = "ud"
    categoria: str
    stock: int = 0
    stock_minimo: int = 5
    imagen_url: Optional[str] = None
    destacado: bool = False
    origen: Optional[str] = None
    certificado: Optional[str] = None
    activo: bool = True

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(BaseModel):
    nombre_es: Optional[str] = None
    nombre_en: Optional[str] = None
    descripcion_es: Optional[str] = None
    descripcion_en: Optional[str] = None
    precio: Optional[float] = None
    unidad: Optional[str] = None
    categoria: Optional[str] = None
    stock: Optional[int] = None
    stock_minimo: Optional[int] = None
    imagen_url: Optional[str] = None
    destacado: Optional[bool] = None
    origen: Optional[str] = None
    certificado: Optional[str] = None
    activo: Optional[bool] = None

class ProductoOut(ProductoBase):
    id: int
    alerta_stock: bool = False

    class Config:
        from_attributes = True