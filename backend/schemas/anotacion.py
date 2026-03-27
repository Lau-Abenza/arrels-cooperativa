from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class AnotacionIn(BaseModel):
    parcela_id: int
    texto: str
    foto_url: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    device_ts: Optional[datetime] = None
    uuid: Optional[str] = None

class AnotacionOut(BaseModel):
    id: int
    parcela_id: int
    usuario_id: int
    texto: str
    foto_url: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    uuid: Optional[str] = None
    creado_en: datetime

    class Config:
        from_attributes = True

class SyncBatchIn(BaseModel):
    anotaciones: List[AnotacionIn]