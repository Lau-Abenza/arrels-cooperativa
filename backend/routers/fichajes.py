from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.fichaje import Fichaje
from models.usuario import Usuario
from schemas.fichaje import FichajeCreate, FichajeOut
from auth import require_role, get_usuario_actual
from typing import List, Optional
from datetime import datetime, date

router = APIRouter(prefix="/fichajes", tags=["Fichajes"])

@router.post("/", response_model=FichajeOut, status_code=201)
def crear_fichaje(
    datos: FichajeCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "trabajador"))
):
    if datos.tipo not in ["entrada", "salida"]:
        raise HTTPException(400, "El tipo debe ser 'entrada' o 'salida'")

    fichaje = Fichaje(
        usuario_id=usuario.id,
        tipo=datos.tipo,
        lat=datos.lat,
        lon=datos.lon,
        notas=datos.notas
    )
    db.add(fichaje)
    db.commit()
    db.refresh(fichaje)
    return {
        "id": fichaje.id,
        "usuario_id": fichaje.usuario_id,
        "usuario_nombre": fichaje.usuario.nombre,
        "tipo": fichaje.tipo,
        "timestamp": fichaje.timestamp,
        "lat": fichaje.lat,
        "lon": fichaje.lon,
        "notas": fichaje.notas
    }

@router.get("/hoy", response_model=List[FichajeOut])
def fichajes_hoy(
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director", "trabajador"))
):
    hoy = date.today()
    fichajes = db.query(Fichaje).filter(
        Fichaje.timestamp >= datetime.combine(hoy, datetime.min.time()),
        Fichaje.timestamp <= datetime.combine(hoy, datetime.max.time())
    ).order_by(Fichaje.timestamp.desc()).all()

    return [{
        "id": f.id,
        "usuario_id": f.usuario_id,
        "usuario_nombre": f.usuario.nombre,
        "tipo": f.tipo,
        "timestamp": f.timestamp,
        "lat": f.lat,
        "lon": f.lon,
        "notas": f.notas
    } for f in fichajes]

@router.get("/mis-fichajes", response_model=List[FichajeOut])
def mis_fichajes(
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "trabajador"))
):
    fichajes = db.query(Fichaje).filter(
        Fichaje.usuario_id == usuario.id
    ).order_by(Fichaje.timestamp.desc()).limit(30).all()

    return [{
        "id": f.id,
        "usuario_id": f.usuario_id,
        "usuario_nombre": f.usuario.nombre,
        "tipo": f.tipo,
        "timestamp": f.timestamp,
        "lat": f.lat,
        "lon": f.lon,
        "notas": f.notas
    } for f in fichajes]

@router.get("/usuario/{usuario_id}", response_model=List[FichajeOut])
def fichajes_usuario(
    usuario_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director"))
):
    fichajes = db.query(Fichaje).filter(
        Fichaje.usuario_id == usuario_id
    ).order_by(Fichaje.timestamp.desc()).limit(50).all()

    return [{
        "id": f.id,
        "usuario_id": f.usuario_id,
        "usuario_nombre": f.usuario.nombre,
        "tipo": f.tipo,
        "timestamp": f.timestamp,
        "lat": f.lat,
        "lon": f.lon,
        "notas": f.notas
    } for f in fichajes]