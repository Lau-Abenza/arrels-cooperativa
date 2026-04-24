from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.parcela import Parcela
from models.usuario import Usuario
from schemas.parcela import ParcelaCreate, ParcelaUpdate, ParcelaOut
from auth import require_role, get_usuario_actual
from typing import List

router = APIRouter(prefix="/parcelas", tags=["Parcelas"])

@router.get("/", response_model=List[ParcelaOut])
def listar_parcelas(
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director", "ingeniero", "trabajador"))
):
    parcelas = db.query(Parcela).all()
    result = []
    for p in parcelas:
        p_dict = {
            "id": p.id,
            "nombre": p.nombre,
            "superficie_ha": p.superficie_ha,
            "cultivo": p.cultivo,
            "municipio": p.municipio,
            "provincia": p.provincia,
            "descripcion": p.descripcion,
            "geojson": p.geojson,
            "agricultor_id": p.agricultor_id,
            "agricultor_nombre": p.agricultor.nombre if p.agricultor else None,
            "lat": p.lat,
            "lon": p.lon
        }
        result.append(p_dict)
    return result

@router.get("/{parcela_id}", response_model=ParcelaOut)
def obtener_parcela(
    parcela_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director", "ingeniero", "trabajador", "socio"))
):
    parcela = db.query(Parcela).filter(Parcela.id == parcela_id).first()
    if not parcela:
        raise HTTPException(status_code=404, detail="Parcela no encontrada")
    return {
        "id": parcela.id,
        "nombre": parcela.nombre,
        "superficie_ha": parcela.superficie_ha,
        "cultivo": parcela.cultivo,
        "municipio": parcela.municipio,
        "provincia": parcela.provincia,
        "descripcion": parcela.descripcion,
        "geojson": parcela.geojson,
        "agricultor_id": parcela.agricultor_id,
        "agricultor_nombre": parcela.agricultor.nombre if parcela.agricultor else None,
        "lat": parcela.lat,
        "lon": parcela.lon
    }

@router.post("/", response_model=ParcelaOut, status_code=201)
def crear_parcela(
    datos: ParcelaCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "ingeniero"))
):
    parcela = Parcela(**datos.model_dump())
    db.add(parcela)
    db.commit()
    db.refresh(parcela)
    return {
        "id": parcela.id,
        "nombre": parcela.nombre,
        "superficie_ha": parcela.superficie_ha,
        "cultivo": parcela.cultivo,
        "municipio": parcela.municipio,
        "provincia": parcela.provincia,
        "descripcion": parcela.descripcion,
        "geojson": parcela.geojson,
        "agricultor_id": parcela.agricultor_id,
        "agricultor_nombre": parcela.agricultor.nombre if parcela.agricultor else None,
        "lat": parcela.lat,
        "lon": parcela.lon
    }

@router.put("/{parcela_id}", response_model=ParcelaOut)
def actualizar_parcela(
    parcela_id: int,
    datos: ParcelaUpdate,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "ingeniero"))
):
    parcela = db.query(Parcela).filter(Parcela.id == parcela_id).first()
    if not parcela:
        raise HTTPException(status_code=404, detail="Parcela no encontrada")
    for campo, valor in datos.model_dump(exclude_unset=True).items():
        setattr(parcela, campo, valor)
    db.commit()
    db.refresh(parcela)
    return {
        "id": parcela.id,
        "nombre": parcela.nombre,
        "superficie_ha": parcela.superficie_ha,
        "cultivo": parcela.cultivo,
        "municipio": parcela.municipio,
        "provincia": parcela.provincia,
        "descripcion": parcela.descripcion,
        "geojson": parcela.geojson,
        "agricultor_id": parcela.agricultor_id,
        "agricultor_nombre": parcela.agricultor.nombre if parcela.agricultor else None,
        "lat": parcela.lat,
        "lon": parcela.lon
    }

@router.delete("/{parcela_id}", status_code=204)
def eliminar_parcela(
    parcela_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin"))
):
    parcela = db.query(Parcela).filter(Parcela.id == parcela_id).first()
    if not parcela:
        raise HTTPException(status_code=404, detail="Parcela no encontrada")
    db.delete(parcela)
    db.commit()