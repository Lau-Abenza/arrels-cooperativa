from pydantic import BaseModel, Field, confloat, constr
from typing import Optional

class ParcelaBase(BaseModel):
    nombre: constr(min_length=1, max_length=100)
    superficie_ha: confloat(gt=0)
    cultivo: constr(min_length=1, max_length=100)
    municipio: Optional[constr(max_length=100)] = None
    provincia: Optional[constr(max_length=100)] = "Alicante"
    descripcion: Optional[str] = None
    geojson: Optional[str] = None
    agricultor_id: Optional[int] = None
    lat: Optional[confloat(ge=-90, le=90)] = None
    lon: Optional[confloat(ge=-180, le=180)] = None

class ParcelaCreate(ParcelaBase):
    pass

class ParcelaUpdate(BaseModel):
    nombre: Optional[constr(min_length=1, max_length=100)] = None
    superficie_ha: Optional[confloat(gt=0)] = None
    cultivo: Optional[constr(min_length=1, max_length=100)] = None
    municipio: Optional[constr(max_length=100)] = None
    provincia: Optional[constr(max_length=100)] = None
    descripcion: Optional[str] = None
    geojson: Optional[str] = None
    agricultor_id: Optional[int] = None
    lat: Optional[confloat(ge=-90, le=90)] = None
    lon: Optional[confloat(ge=-180, le=180)] = None

class ParcelaOut(ParcelaBase):
    id: int
    agricultor_nombre: Optional[str] = None
    activo: bool = True
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    model_config = {"from_attributes": True}
