from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.aportacion import Aportacion
from schemas.aportacion import AportacionCreate, AportacionOut
from auth import require_role
from typing import List

router = APIRouter(prefix="/aportaciones", tags=["Aportaciones"])

@router.post("/", response_model=AportacionOut, status_code=201)
def crear_aportacion(
    datos: AportacionCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "trabajador"))
):
    total = datos.kg * datos.precio_kg if datos.precio_kg else None

    aportacion = Aportacion(
        socio_id=datos.socio_id,
        trabajador_id=usuario.id,
        producto=datos.producto,
        kg=datos.kg,
        precio_kg=datos.precio_kg,
        total=total,
        notas=datos.notas
    )
    db.add(aportacion)
    db.commit()
    db.refresh(aportacion)

    return {
        "id": aportacion.id,
        "socio_id": aportacion.socio_id,
        "socio_nombre": aportacion.socio.nombre,
        "trabajador_id": aportacion.trabajador_id,
        "trabajador_nombre": aportacion.trabajador.nombre,
        "producto": aportacion.producto,
        "kg": aportacion.kg,
        "precio_kg": aportacion.precio_kg,
        "total": aportacion.total,
        "fecha": aportacion.fecha,
        "notas": aportacion.notas
    }

@router.get("/", response_model=List[AportacionOut])
def listar_aportaciones(
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director", "trabajador"))
):
    aportaciones = db.query(Aportacion).order_by(Aportacion.fecha.desc()).limit(50).all()
    return [{
        "id": a.id,
        "socio_id": a.socio_id,
        "socio_nombre": a.socio.nombre,
        "trabajador_id": a.trabajador_id,
        "trabajador_nombre": a.trabajador.nombre,
        "producto": a.producto,
        "kg": a.kg,
        "precio_kg": a.precio_kg,
        "total": a.total,
        "fecha": a.fecha,
        "notas": a.notas
    } for a in aportaciones]

@router.get("/socio/{socio_id}", response_model=List[AportacionOut])
def aportaciones_socio(
    socio_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director", "trabajador", "ingeniero", "socio"))
):
    aportaciones = db.query(Aportacion).filter(
        Aportacion.socio_id == socio_id
    ).order_by(Aportacion.fecha.desc()).all()
    return [{
        "id": a.id,
        "socio_id": a.socio_id,
        "socio_nombre": a.socio.nombre,
        "trabajador_id": a.trabajador_id,
        "trabajador_nombre": a.trabajador.nombre,
        "producto": a.producto,
        "kg": a.kg,
        "precio_kg": a.precio_kg,
        "total": a.total,
        "fecha": a.fecha,
        "notas": a.notas
    } for a in aportaciones]