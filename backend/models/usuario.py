# models/usuario.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Index
from sqlalchemy.sql import func
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(200), nullable=False, unique=True, index=True)
    password = Column(String(255), nullable=False)
    rol = Column(String(50), nullable=False, default="usuario_web", index=True)
    activo = Column(Boolean, default=True, nullable=False, index=True)
    creado_en = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    actualizado_en = Column(DateTime(timezone=True), onupdate=func.now())
    token_version = Column(Integer, default=0, nullable=False)

    def __repr__(self):
        return f"<Usuario {self.email} - {self.rol}>"

# Índice compuesto opcional
Index("ix_usuario_rol_activo", "rol", "activo")
