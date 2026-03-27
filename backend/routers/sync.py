from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.anotacion import Anotacion
from schemas.anotacion import SyncBatchIn, AnotacionOut
from auth import require_role
from typing import List

router = APIRouter(prefix="/sync", tags=["Sync Offline"])

@router.post("/batch", status_code=200)
def sync_batch(
    payload: SyncBatchIn,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("socio", "admin", "ingeniero"))
):
    guardadas = 0
    for item in payload.anotaciones:
        # Evitar duplicados por UUID
        if item.uuid:
            existe = db.query(Anotacion).filter(
                Anotacion.uuid == item.uuid
            ).first()
            if existe:
                continue
        anotacion = Anotacion(
            parcela_id=item.parcela_id,
            usuario_id=usuario.id,
            texto=item.texto,
            foto_url=item.foto_url,
            lat=item.lat,
            lon=item.lon,
            device_ts=item.device_ts,
            uuid=item.uuid,
            synced=True
        )
        db.add(anotacion)
        guardadas += 1
    db.commit()
    return {"ok": True, "guardadas": guardadas, "total": len(payload.anotaciones)}