from pydantic import BaseModel
from typing import Optional, List

class LecturaIn(BaseModel):
    device_id: str
    ts: int
    temp_aire: Optional[float] = None
    hum_aire: Optional[float] = None
    hum_suelo: Optional[float] = None
    temp_suelo: Optional[float] = None
    luz_lux: Optional[float] = None
    lluvia_raw: Optional[int] = None
    nivel_agua_cm: Optional[float] = None
    ph_suelo: Optional[float] = None

class SyncSensoresIn(BaseModel):
    lecturas: List[LecturaIn]

class SyncSensoresOut(BaseModel):
    ok: bool
    guardadas: int
    total: int