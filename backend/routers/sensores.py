from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.lectura_sensor import LecturaSensor
from schemas.sensor import SyncSensoresIn, SyncSensoresOut

router = APIRouter(prefix="/sensores", tags=["Sensores IoT"])

@router.post("/sync/batch", response_model=SyncSensoresOut)
def sync_sensores(
    payload: SyncSensoresIn,
    db: Session = Depends(get_db)
):
    guardadas = 0
    for item in payload.lecturas:
        existe = db.query(LecturaSensor).filter(
            LecturaSensor.device_id == item.device_id,
            LecturaSensor.timestamp == item.ts
        ).first()
        if existe:
            continue
        lectura = LecturaSensor(
            device_id=item.device_id,
            timestamp=item.ts,
            temp_aire=item.temp_aire,
            hum_aire=item.hum_aire,
            hum_suelo=item.hum_suelo,
            temp_suelo=item.temp_suelo,
            luz_lux=item.luz_lux,
            lluvia_raw=item.lluvia_raw,
            nivel_agua_cm=item.nivel_agua_cm,
            ph_suelo=item.ph_suelo
        )
        db.add(lectura)
        guardadas += 1
    db.commit()
    return {"ok": True, "guardadas": guardadas, "total": len(payload.lecturas)}

@router.get("/historico/{device_id}")
def historico(
    device_id: str,
    limite: int = 48,
    db: Session = Depends(get_db)
):
    lecturas = db.query(LecturaSensor).filter(
        LecturaSensor.device_id == device_id
    ).order_by(LecturaSensor.timestamp.desc()).limit(limite).all()
    return [l.to_dict() for l in reversed(lecturas)]