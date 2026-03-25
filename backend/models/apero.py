from sqlalchemy import Column, Integer, String, Float, Boolean
from sqlalchemy.orm import relationship
from database import Base

class Apero(Base):
    __tablename__ = "aperos"

    id          = Column(Integer, primary_key=True, autoincrement=True)
    nombre      = Column(String(100), nullable=False)
    tipo        = Column(String(50), nullable=False)
    descripcion = Column(String(300), nullable=True)
    precio_dia  = Column(Float, nullable=False)
    disponible  = Column(Boolean, default=True)
    imagen_url  = Column(String(500), nullable=True)

    alquileres = relationship("Alquiler", backref="apero")

    def __repr__(self):
        return f"<Apero {self.nombre}>"