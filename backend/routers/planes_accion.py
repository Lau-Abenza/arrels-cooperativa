from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.plan_accion import PlanAccion
from schemas.plan_accion import PlanAccionCreate, PlanAccionUpdate, PlanAccionOut
from auth import require_role
from typing import List

router = APIRouter(prefix="/planes-accion", tags=["Planes de Acción"])

@router.post("/", response_model=PlanAccionOut, status_code=201)
def crear_plan(
    datos: PlanAccionCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("ingeniero", "admin"))
):
    plan = PlanAccion(
        socio_id=datos.socio_id,
        ingeniero_id=usuario.id,
        titulo=datos.titulo,
        descripcion=datos.descripcion
    )
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return {
        "id": plan.id,
        "socio_id": plan.socio_id,
        "socio_nombre": plan.socio.nombre,
        "ingeniero_id": plan.ingeniero_id,
        "ingeniero_nombre": plan.ingeniero.nombre,
        "titulo": plan.titulo,
        "descripcion": plan.descripcion,
        "estado": plan.estado,
        "fecha": plan.fecha
    }

@router.get("/socio/{socio_id}", response_model=List[PlanAccionOut])
def planes_socio(
    socio_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("ingeniero", "admin", "socio", "director"))
):
    planes = db.query(PlanAccion).filter(
        PlanAccion.socio_id == socio_id
    ).order_by(PlanAccion.fecha.desc()).all()
    return [{
        "id": p.id,
        "socio_id": p.socio_id,
        "socio_nombre": p.socio.nombre,
        "ingeniero_id": p.ingeniero_id,
        "ingeniero_nombre": p.ingeniero.nombre,
        "titulo": p.titulo,
        "descripcion": p.descripcion,
        "estado": p.estado,
        "fecha": p.fecha
    } for p in planes]

@router.put("/{plan_id}", response_model=PlanAccionOut)
def actualizar_plan(
    plan_id: int,
    datos: PlanAccionUpdate,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("ingeniero", "admin"))
):
    plan = db.query(PlanAccion).filter(PlanAccion.id == plan_id).first()
    if not plan:
        raise HTTPException(404, "Plan no encontrado")
    for campo, valor in datos.model_dump(exclude_unset=True).items():
        setattr(plan, campo, valor)
    db.commit()
    db.refresh(plan)
    return {
        "id": plan.id,
        "socio_id": plan.socio_id,
        "socio_nombre": plan.socio.nombre,
        "ingeniero_id": plan.ingeniero_id,
        "ingeniero_nombre": plan.ingeniero.nombre,
        "titulo": plan.titulo,
        "descripcion": plan.descripcion,
        "estado": plan.estado,
        "fecha": plan.fecha
    }