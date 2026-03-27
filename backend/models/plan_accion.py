from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class PlanAccion(Base):
    __tablename__ = "planes_accion"

    id           = Column(Integer, primary_key=True, autoincrement=True)
    socio_id     = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    ingeniero_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    titulo       = Column(String(200), nullable=False)
    descripcion  = Column(Text, nullable=False)
    estado       = Column(String(20), default="activo")
    fecha        = Column(DateTime, server_default=func.now())

    socio     = relationship("Usuario", foreign_keys=[socio_id])
    ingeniero = relationship("Usuario", foreign_keys=[ingeniero_id])