from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Fichaje(Base):
    __tablename__ = "fichajes"

    id          = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id  = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    tipo        = Column(String(10), nullable=False)  # "entrada" o "salida"
    timestamp   = Column(DateTime, server_default=func.now())
    lat         = Column(Float, nullable=True)
    lon         = Column(Float, nullable=True)
    notas       = Column(String(200), nullable=True)

    usuario = relationship("Usuario", backref="fichajes")

    def __repr__(self):
        return f"<Fichaje {self.usuario_id} - {self.tipo} - {self.timestamp}>"