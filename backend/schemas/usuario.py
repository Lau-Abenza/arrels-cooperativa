# schemas/usuario.py
from pydantic import BaseModel, EmailStr, Field, constr
from typing import Optional
from enum import Enum

class RolEnum(str, Enum):
    admin = "admin"
    director = "director"
    trabajador = "trabajador"
    ingeniero = "ingeniero"
    socio = "socio"
    usuario_web = "usuario_web"

class UsuarioBase(BaseModel):
    nombre: constr(min_length=1, max_length=100)
    email: EmailStr
    rol: RolEnum = RolEnum.usuario_web

class UsuarioCreate(UsuarioBase):
    password: constr(min_length=8) = Field(..., description="Contraseña mínima 8 caracteres")

class UsuarioOut(UsuarioBase):
    id: int
    activo: bool
    creado_en: Optional[str] = None
    actualizado_en: Optional[str] = None

    model_config = {"from_attributes": True}

class UsuarioUpdate(BaseModel):
    nombre: Optional[constr(min_length=1, max_length=100)] = None
    email: Optional[EmailStr] = None
    rol: Optional[RolEnum] = None
    password: Optional[constr(min_length=8)] = None
    activo: Optional[bool] = None

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    rol: str
    nombre: str
    id: int
