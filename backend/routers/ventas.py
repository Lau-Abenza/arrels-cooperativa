from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.venta import Venta, LineaVenta
from models.producto import Producto
from schemas.venta import VentaCreate, VentaOut
from auth import require_role, get_usuario_actual
from typing import List

router = APIRouter(prefix="/ventas", tags=["Ventas"])

@router.post("/", response_model=VentaOut, status_code=201)
def crear_venta(
    datos: VentaCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "trabajador"))
):
    total = 0.0
    lineas_validadas = []

    for linea in datos.lineas:
        producto = db.query(Producto).filter(Producto.id == linea.producto_id).first()
        if not producto:
            raise HTTPException(404, f"Producto {linea.producto_id} no encontrado")
        if producto.stock < linea.cantidad:
            raise HTTPException(400, f"Stock insuficiente para '{producto.nombre_es}'")
        subtotal = producto.precio * linea.cantidad
        total += subtotal
        lineas_validadas.append((producto, linea.cantidad, subtotal))

    venta = Venta(
        socio_id=datos.socio_id,
        trabajador_id=usuario.id,
        total=total
    )
    db.add(venta)
    db.flush()

    for producto, cantidad, subtotal in lineas_validadas:
        linea = LineaVenta(
            venta_id=venta.id,
            producto_id=producto.id,
            cantidad=cantidad,
            precio_ud=producto.precio,
            subtotal=subtotal
        )
        db.add(linea)
        producto.stock -= cantidad

    db.commit()
    db.refresh(venta)

    return {
        "id": venta.id,
        "socio_id": venta.socio_id,
        "socio_nombre": venta.socio.nombre if venta.socio else None,
        "trabajador_id": venta.trabajador_id,
        "trabajador_nombre": venta.trabajador.nombre if venta.trabajador else None,
        "fecha": venta.fecha,
        "total": venta.total,
        "ticket_pdf_url": venta.ticket_pdf_url,
        "lineas": [
            {
                "id": l.id,
                "producto_id": l.producto_id,
                "producto_nombre": l.producto.nombre_es,
                "cantidad": l.cantidad,
                "precio_ud": l.precio_ud,
                "subtotal": l.subtotal
            }
            for l in venta.lineas
        ]
    }

@router.get("/", response_model=List[VentaOut])
def listar_ventas(
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director", "trabajador"))
):
    ventas = db.query(Venta).order_by(Venta.fecha.desc()).limit(50).all()
    result = []
    for venta in ventas:
        result.append({
            "id": venta.id,
            "socio_id": venta.socio_id,
            "socio_nombre": venta.socio.nombre if venta.socio else None,
            "trabajador_id": venta.trabajador_id,
            "trabajador_nombre": venta.trabajador.nombre if venta.trabajador else None,
            "fecha": venta.fecha,
            "total": venta.total,
            "ticket_pdf_url": venta.ticket_pdf_url,
            "lineas": [
                {
                    "id": l.id,
                    "producto_id": l.producto_id,
                    "producto_nombre": l.producto.nombre_es,
                    "cantidad": l.cantidad,
                    "precio_ud": l.precio_ud,
                    "subtotal": l.subtotal
                }
                for l in venta.lineas
            ]
        })
    return result

@router.get("/{venta_id}", response_model=VentaOut)
def obtener_venta(
    venta_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director", "trabajador"))
):
    venta = db.query(Venta).filter(Venta.id == venta_id).first()
    if not venta:
        raise HTTPException(404, "Venta no encontrada")
    return {
        "id": venta.id,
        "socio_id": venta.socio_id,
        "socio_nombre": venta.socio.nombre if venta.socio else None,
        "trabajador_id": venta.trabajador_id,
        "trabajador_nombre": venta.trabajador.nombre if venta.trabajador else None,
        "fecha": venta.fecha,
        "total": venta.total,
        "ticket_pdf_url": venta.ticket_pdf_url,
        "lineas": [
            {
                "id": l.id,
                "producto_id": l.producto_id,
                "producto_nombre": l.producto.nombre_es,
                "cantidad": l.cantidad,
                "precio_ud": l.precio_ud,
                "subtotal": l.subtotal
            }
            for l in venta.lineas
        ]
    }