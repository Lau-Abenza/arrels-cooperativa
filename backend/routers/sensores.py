from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.lectura_sensor import LecturaSensor
from schemas.sensor import SyncSensoresIn, SyncSensoresOut
from datetime import datetime
from typing import List

router = APIRouter(prefix="/sensores", tags=["Sensores IoT"])

@router.post("/sync/batch", response_model=SyncSensoresOut, status_code=201)
def sync_sensores(payload: SyncSensoresIn, db: Session = Depends(get_db)):
    guardadas = 0
    # Opcional: validar tamaño máximo del batch para evitar DoS
    if len(payload.lecturas) > 500:
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="Batch demasiado grande")

    # Procesar lecturas en bucle; usar bulk insert si el ORM lo permite
    for item in payload.lecturas:
        # Normalizar timestamp si viene como string
        ts = item.ts
        if isinstance(ts, str):
            try:
                ts = datetime.fromisoformat(ts)
            except Exception:
                continue

        existe = db.query(LecturaSensor).filter(
            LecturaSensor.device_id == item.device_id,
            LecturaSensor.timestamp == ts
        ).first()
        if existe:
            continue

        lectura = LecturaSensor(
            device_id=item.device_id,
            timestamp=ts,
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

@router.get("/historico/{device_id}", response_model=List[dict])
def historico(device_id: str, limite: int = 48, db: Session = Depends(get_db)):
    if limite <= 0 or limite > 1000:
        raise HTTPException(status_code=400, detail="Parámetro 'limite' fuera de rango")
    lecturas = db.query(LecturaSensor).filter(
        LecturaSensor.device_id == device_id
    ).order_by(LecturaSensor.timestamp.desc()).limit(limite).all()
    # devolver en orden cronológico ascendente
    return [l.to_dict() for l in reversed(lecturas)]
