from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Venta(Base):
    __tablename__ = "ventas"

    id             = Column(Integer, primary_key=True, autoincrement=True)
    socio_id       = Column(Integer, ForeignKey("usuarios.id"), nullable=True)
    trabajador_id  = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    fecha          = Column(DateTime, server_default=func.now())
    total          = Column(Float, nullable=False)
    ticket_pdf_url = Column(String(500), nullable=True)

    socio      = relationship("Usuario", foreign_keys=[socio_id])
    trabajador = relationship("Usuario", foreign_keys=[trabajador_id])
    lineas     = relationship("LineaVenta", backref="venta")

    def __repr__(self):
        return f"<Venta {self.id} - {self.total}€>"


class LineaVenta(Base):
    __tablename__ = "lineas_venta"

    id          = Column(Integer, primary_key=True, autoincrement=True)
    venta_id    = Column(Integer, ForeignKey("ventas.id"), nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.id"), nullable=False)
    cantidad    = Column(Integer, nullable=False)
    precio_ud   = Column(Float, nullable=False)
    subtotal    = Column(Float, nullable=False)

    producto = relationship("Producto")