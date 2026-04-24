from pydantic import BaseModel
from typing import Optional

class ParcelaBase(BaseModel):
    nombre: str
    superficie_ha: float
    cultivo: str
    municipio: Optional[str] = None
    provincia: Optional[str] = "Alicante"
    descripcion: Optional[str] = None
    geojson: Optional[str] = None
    agricultor_id: Optional[int] = None

class ParcelaCreate(ParcelaBase):
    pass

class ParcelaUpdate(BaseModel):
    nombre: Optional[str] = None
    superficie_ha: Optional[float] = None
    cultivo: Optional[str] = None
    municipio: Optional[str] = None
    provincia: Optional[str] = None
    descripcion: Optional[str] = None
    geojson: Optional[str] = None
    agricultor_id: Optional[int] = None
    lat: Optional[float] = None
    lon: Optional[float] = None

class ParcelaOut(ParcelaBase):
    id: int
    agricultor_nombre: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None

    class Config:
        from_attributes = True