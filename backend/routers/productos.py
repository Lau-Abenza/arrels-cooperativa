from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.producto import Producto
from schemas.producto import ProductoCreate, ProductoUpdate, ProductoOut
from auth import require_role
from typing import List, Optional

router = APIRouter(prefix="/productos", tags=["Productos"])

@router.get("/", response_model=List[ProductoOut])
def listar_productos(
    categoria: Optional[str] = None,
    solo_activos: bool = True,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director", "trabajador", "ingeniero"))
):
    q = db.query(Producto)
    if solo_activos:
        q = q.filter(Producto.activo == True)
    if categoria:
        q = q.filter(Producto.categoria == categoria)
    productos = q.all()
    result = []
    for p in productos:
        p_dict = p.__dict__.copy()
        p_dict["alerta_stock"] = p.stock <= p.stock_minimo
        result.append(p_dict)
    return result

@router.get("/publicos", response_model=List[ProductoOut])
def listar_productos_publicos(
    categoria: Optional[str] = None,
    db: Session = Depends(get_db)
):
    q = db.query(Producto).filter(Producto.activo == True, Producto.stock > 0)
    if categoria:
        q = q.filter(Producto.categoria == categoria)
    productos = q.all()
    result = []
    for p in productos:
        p_dict = p.__dict__.copy()
        p_dict["alerta_stock"] = False
        result.append(p_dict)
    return result

@router.get("/{producto_id}", response_model=ProductoOut)
def obtener_producto(
    producto_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director", "trabajador", "ingeniero"))
):
    producto = db.query(Producto).filter(Producto.id == producto_id).first()
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    p_dict = producto.__dict__.copy()
    p_dict["alerta_stock"] = producto.stock <= producto.stock_minimo
    return p_dict

@router.post("/", response_model=ProductoOut, status_code=201)
def crear_producto(
    datos: ProductoCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "trabajador"))
):
    producto = Producto(**datos.model_dump())
    db.add(producto)
    db.commit()
    db.refresh(producto)
    p_dict = producto.__dict__.copy()
    p_dict["alerta_stock"] = producto.stock <= producto.stock_minimo
    return p_dict

@router.put("/{producto_id}", response_model=ProductoOut)
def actualizar_producto(
    producto_id: int,
    datos: ProductoUpdate,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "trabajador"))
):
    producto = db.query(Producto).filter(Producto.id == producto_id).first()
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    for campo, valor in datos.model_dump(exclude_unset=True).items():
        setattr(producto, campo, valor)
    db.commit()
    db.refresh(producto)
    p_dict = producto.__dict__.copy()
    p_dict["alerta_stock"] = producto.stock <= producto.stock_minimo
    return p_dict

@router.delete("/{producto_id}", status_code=204)
def eliminar_producto(
    producto_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin"))
):
    producto = db.query(Producto).filter(Producto.id == producto_id).first()
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    producto.activo = False
    db.commit()