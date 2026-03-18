from sqlalchemy import Column, Integer, String, Float, Boolean, Text
from database import Base

class Producto(Base):
    __tablename__ = "productos"

    id             = Column(Integer, primary_key=True, autoincrement=True)
    nombre_es      = Column(String(200), nullable=False)
    nombre_en      = Column(String(200), nullable=False)
    descripcion_es = Column(Text, nullable=False)
    descripcion_en = Column(Text, nullable=False)
    precio         = Column(Float, nullable=False)
    unidad         = Column(String(20), default="ud")
    categoria      = Column(String(50), nullable=False, index=True)
    stock          = Column(Integer, default=0)
    stock_minimo   = Column(Integer, default=5)
    imagen_url     = Column(String(500), nullable=True)
    destacado      = Column(Boolean, default=False)
    origen         = Column(String(100), nullable=True)
    certificado    = Column(String(100), nullable=True)
    activo         = Column(Boolean, default=True)

    def __repr__(self):
        return f"<Producto {self.nombre_es} - {self.stock} uds>"