from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Alquiler(Base):
    __tablename__ = "alquileres"

    id           = Column(Integer, primary_key=True, autoincrement=True)
    apero_id     = Column(Integer, ForeignKey("aperos.id"), nullable=False)
    socio_id     = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    trabajador_id= Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin    = Column(DateTime, nullable=False)
    precio_total = Column(Float, nullable=True)
    estado       = Column(String(20), default="activo")  # activo, devuelto, cancelado
    observaciones= Column(String(300), nullable=True)
    creado_en    = Column(DateTime, server_default=func.now())

    socio      = relationship("Usuario", foreign_keys=[socio_id])
    trabajador = relationship("Usuario", foreign_keys=[trabajador_id])

    def __repr__(self):
        return f"<Alquiler {self.id} - {self.estado}>"