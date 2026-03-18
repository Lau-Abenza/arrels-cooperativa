from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum

class RolEnum(str, Enum):
    admin              = "admin"
    director           = "director"
    trabajador         = "trabajador"
    ingeniero          = "ingeniero"
    socio              = "socio"
    usuario_web        = "usuario_web"

class UsuarioBase(BaseModel):
    nombre: str
    email: EmailStr
    rol: RolEnum = RolEnum.usuario_web

class UsuarioCreate(UsuarioBase):
    password: str

class UsuarioOut(UsuarioBase):
    id: int
    activo: bool

    class Config:
        from_attributes = True

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    rol: str
    nombre: str