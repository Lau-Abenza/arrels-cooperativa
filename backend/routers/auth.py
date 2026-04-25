from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.usuario import Usuario
from schemas.usuario import UsuarioCreate, UsuarioOut, LoginIn, TokenOut
from auth import hash_password, verify_password, create_token, require_role

router = APIRouter(prefix="/auth", tags=["Autenticación"])

@router.post("/registro", response_model=UsuarioOut, status_code=201)
def registro(datos: UsuarioCreate, db: Session = Depends(get_db)):
    # Verificar si el email ya existe
    existe = db.query(Usuario).filter(Usuario.email == datos.email).first()
    if existe:
        raise HTTPException(
            status_code=400,
            detail="Ya existe un usuario con ese email"
        )
    # Crear usuario
    usuario = Usuario(
        nombre=datos.nombre,
        email=datos.email,
        password=hash_password(datos.password),
        rol=datos.rol
    )
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario

@router.post("/login", response_model=TokenOut)
def login(datos: LoginIn, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.email == datos.email).first()
    if not usuario or not verify_password(datos.password, usuario.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos"
        )
    if not usuario.activo:
        raise HTTPException(
            status_code=400,
            detail="Usuario desactivado"
        )
    token = create_token({
        "sub": usuario.email,
        "rol": usuario.rol,
        "nombre": usuario.nombre
    })
    return TokenOut(
        access_token=token,
        rol=usuario.rol,
        nombre=usuario.nombre
    )

@router.get("/me", response_model=UsuarioOut)
def me(db: Session = Depends(get_db),
       usuario: Usuario = Depends(__import__('auth').get_usuario_actual)):
    return usuario

@router.post("/token")
def token(
    form: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    usuario = db.query(Usuario).filter(Usuario.email == form.username).first()
    if not usuario or not verify_password(form.password, usuario.password):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    token = create_token({"sub": usuario.email, "rol": usuario.rol, "nombre": usuario.nombre})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/usuarios")
def listar_usuarios(
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin", "director"))
):
    usuarios = db.query(Usuario).all()
    return [{
        "id": u.id,
        "nombre": u.nombre,
        "email": u.email,
        "rol": u.rol,
        "activo": u.activo
    } for u in usuarios]

@router.put("/usuarios/{usuario_id}")
def editar_usuario(
    usuario_id: int,
    datos: dict,
    db: Session = Depends(get_db),
    usuario = Depends(require_role("admin"))
):
    u = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not u:
        raise HTTPException(404, "Usuario no encontrado")
    if "nombre" in datos:
        u.nombre = datos["nombre"]
    if "email" in datos:
        u.email = datos["email"]
    if "rol" in datos:
        u.rol = datos["rol"]
    if "password" in datos and datos["password"]:
        u.password = hash_password(datos["password"])
    db.commit()
    db.refresh(u)
    return {"id": u.id, "nombre": u.nombre, "email": u.email, "rol": u.rol, "activo": u.activo}