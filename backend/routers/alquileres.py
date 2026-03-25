from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.alquiler import Alquiler
from models.apero import Apero
from schemas.alquiler import AlquilerCreate, AlquilerOut, AperoCreate, AperoOut, DevolucionIn
from auth import require_role
from typing import List

router = APIRouter(prefix="/alquileres", tags=["Alquileres"])

# ── APEROS ────────────────────────────────────────────────────────

@router.get("/aperos", response_model=List[AperoOut])
def listar_aperos(
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director", "trabajador", "socio"))
):
    return db.query(Apero).all()

@router.post("/aperos", response_model=AperoOut, status_code=201)
def crear_apero(
    datos: AperoCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "trabajador"))
):
    apero = Apero(**datos.model_dump())
    db.add(apero)
    db.commit()
    db.refresh(apero)
    return apero

# ── ALQUILERES ────────────────────────────────────────────────────

@router.get("/", response_model=List[AlquilerOut])
def listar_alquileres(
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director", "trabajador"))
):
    alquileres = db.query(Alquiler).order_by(Alquiler.creado_en.desc()).all()
    return [{
        "id": a.id,
        "apero_id": a.apero_id,
        "apero_nombre": a.apero.nombre if a.apero else None,
        "socio_id": a.socio_id,
        "socio_nombre": a.socio.nombre if a.socio else None,
        "trabajador_id": a.trabajador_id,
        "trabajador_nombre": a.trabajador.nombre if a.trabajador else None,
        "fecha_inicio": a.fecha_inicio,
        "fecha_fin": a.fecha_fin,
        "precio_total": a.precio_total,
        "estado": a.estado,
        "observaciones": a.observaciones
    } for a in alquileres]

@router.post("/", response_model=AlquilerOut, status_code=201)
def crear_alquiler(
    datos: AlquilerCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "trabajador"))
):
    apero = db.query(Apero).filter(Apero.id == datos.apero_id).first()
    if not apero:
        raise HTTPException(404, "Apero no encontrado")
    if not apero.disponible:
        raise HTTPException(400, f"El apero '{apero.nombre}' no está disponible")

    dias = (datos.fecha_fin - datos.fecha_inicio).days
    if dias <= 0:
        raise HTTPException(400, "La fecha de fin debe ser posterior a la de inicio")

    precio_total = apero.precio_dia * dias

    alquiler = Alquiler(
        apero_id=datos.apero_id,
        socio_id=datos.socio_id,
        trabajador_id=usuario.id,
        fecha_inicio=datos.fecha_inicio,
        fecha_fin=datos.fecha_fin,
        precio_total=precio_total,
        observaciones=datos.observaciones,
        estado="activo"
    )
    apero.disponible = False
    db.add(alquiler)
    db.commit()
    db.refresh(alquiler)

    return {
        "id": alquiler.id,
        "apero_id": alquiler.apero_id,
        "apero_nombre": alquiler.apero.nombre,
        "socio_id": alquiler.socio_id,
        "socio_nombre": alquiler.socio.nombre,
        "trabajador_id": alquiler.trabajador_id,
        "trabajador_nombre": alquiler.trabajador.nombre,
        "fecha_inicio": alquiler.fecha_inicio,
        "fecha_fin": alquiler.fecha_fin,
        "precio_total": alquiler.precio_total,
        "estado": alquiler.estado,
        "observaciones": alquiler.observaciones
    }

@router.put("/{alquiler_id}/devolver", response_model=AlquilerOut)
def devolver_alquiler(
    alquiler_id: int,
    datos: DevolucionIn,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "trabajador"))
):
    alquiler = db.query(Alquiler).filter(Alquiler.id == alquiler_id).first()
    if not alquiler:
        raise HTTPException(404, "Alquiler no encontrado")
    if alquiler.estado != "activo":
        raise HTTPException(400, "Este alquiler ya fue devuelto o cancelado")

    alquiler.estado = "devuelto"
    if datos.observaciones:
        alquiler.observaciones = datos.observaciones
    alquiler.apero.disponible = True
    db.commit()
    db.refresh(alquiler)

    return {
        "id": alquiler.id,
        "apero_id": alquiler.apero_id,
        "apero_nombre": alquiler.apero.nombre,
        "socio_id": alquiler.socio_id,
        "socio_nombre": alquiler.socio.nombre,
        "trabajador_id": alquiler.trabajador_id,
        "trabajador_nombre": alquiler.trabajador.nombre,
        "fecha_inicio": alquiler.fecha_inicio,
        "fecha_fin": alquiler.fecha_fin,
        "precio_total": alquiler.precio_total,
        "estado": alquiler.estado,
        "observaciones": alquiler.observaciones
    }