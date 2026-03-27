from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.mensaje import Mensaje
from schemas.mensaje import MensajeCreate, MensajeOut
from auth import require_role, get_usuario_actual
from typing import List

router = APIRouter(prefix="/mensajes", tags=["Mensajería"])

@router.post("/", response_model=MensajeOut, status_code=201)
def enviar_mensaje(
    datos: MensajeCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("ingeniero", "socio", "admin"))
):
    mensaje = Mensaje(
        de_id=usuario.id,
        para_id=datos.para_id,
        texto=datos.texto,
        foto_url=datos.foto_url
    )
    db.add(mensaje)
    db.commit()
    db.refresh(mensaje)
    return {
        "id": mensaje.id,
        "de_id": mensaje.de_id,
        "de_nombre": mensaje.de.nombre,
        "para_id": mensaje.para_id,
        "para_nombre": mensaje.para.nombre,
        "texto": mensaje.texto,
        "foto_url": mensaje.foto_url,
        "leido": mensaje.leido,
        "fecha": mensaje.fecha
    }

@router.get("/conversacion/{otro_id}", response_model=List[MensajeOut])
def conversacion(
    otro_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("ingeniero", "socio", "admin"))
):
    mensajes = db.query(Mensaje).filter(
        ((Mensaje.de_id == usuario.id) & (Mensaje.para_id == otro_id)) |
        ((Mensaje.de_id == otro_id) & (Mensaje.para_id == usuario.id))
    ).order_by(Mensaje.fecha.asc()).all()
    return [{
        "id": m.id,
        "de_id": m.de_id,
        "de_nombre": m.de.nombre,
        "para_id": m.para_id,
        "para_nombre": m.para.nombre,
        "texto": m.texto,
        "foto_url": m.foto_url,
        "leido": m.leido,
        "fecha": m.fecha
    } for m in mensajes]

@router.put("/{mensaje_id}/leer")
def marcar_leido(
    mensaje_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("ingeniero", "socio", "admin"))
):
    mensaje = db.query(Mensaje).filter(
        Mensaje.id == mensaje_id,
        Mensaje.para_id == usuario.id
    ).first()
    if not mensaje:
        raise HTTPException(404, "Mensaje no encontrado")
    mensaje.leido = True
    db.commit()
    return {"ok": True}