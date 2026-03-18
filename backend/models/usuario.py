from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(200), nullable=False, unique=True, index=True)
    password = Column(String(255), nullable=False)
    rol = Column(String(50), nullable=False, default="usuario_web")
    activo = Column(Boolean, default=True)
    creado_en = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return f"<Usuario {self.email} - {self.rol}>"