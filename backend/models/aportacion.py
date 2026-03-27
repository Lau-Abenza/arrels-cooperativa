from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Aportacion(Base):
    __tablename__ = "aportaciones"

    id            = Column(Integer, primary_key=True, autoincrement=True)
    socio_id      = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    trabajador_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    producto      = Column(String(100), nullable=False)
    kg            = Column(Float, nullable=False)
    precio_kg     = Column(Float, nullable=True)
    total         = Column(Float, nullable=True)
    fecha         = Column(DateTime, server_default=func.now())
    notas         = Column(String(300), nullable=True)

    socio      = relationship("Usuario", foreign_keys=[socio_id])
    trabajador = relationship("Usuario", foreign_keys=[trabajador_id])

    def __repr__(self):
        return f"<Aportacion {self.socio_id} - {self.kg}kg {self.producto}>"