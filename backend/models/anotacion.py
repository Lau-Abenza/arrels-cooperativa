from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Anotacion(Base):
    __tablename__ = "anotaciones"

    id         = Column(Integer, primary_key=True, autoincrement=True)
    parcela_id = Column(Integer, ForeignKey("parcelas.id"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    texto      = Column(String(1000), nullable=False)
    foto_url   = Column(String(500), nullable=True)
    lat        = Column(Float, nullable=True)
    lon        = Column(Float, nullable=True)
    synced     = Column(Boolean, default=True)
    device_ts  = Column(DateTime, nullable=True)
    uuid       = Column(String(36), nullable=True, unique=True)
    creado_en  = Column(DateTime, server_default=func.now())

    parcela = relationship("Parcela", backref="anotaciones")
    usuario = relationship("Usuario", backref="anotaciones")