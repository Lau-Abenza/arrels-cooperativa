from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Mensaje(Base):
    __tablename__ = "mensajes"

    id         = Column(Integer, primary_key=True, autoincrement=True)
    de_id      = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    para_id    = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    texto      = Column(String(1000), nullable=False)
    foto_url   = Column(String(500), nullable=True)
    leido      = Column(Boolean, default=False)
    fecha      = Column(DateTime, server_default=func.now())

    de   = relationship("Usuario", foreign_keys=[de_id])
    para = relationship("Usuario", foreign_keys=[para_id])