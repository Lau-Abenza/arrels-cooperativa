from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text, Boolean, DateTime, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Parcela(Base):
    __tablename__ = "parcelas"

    id            = Column(Integer, primary_key=True, autoincrement=True)
    nombre        = Column(String(100), nullable=False)
    superficie_ha = Column(Float, nullable=False)
    cultivo       = Column(String(100), nullable=False, index=True)
    municipio     = Column(String(100), index=True)
    provincia     = Column(String(100), default="Alicante")
    descripcion   = Column(Text, nullable=True)
    geojson       = Column(Text, nullable=True)  # considerar PostGIS geometry si está disponible
    lat           = Column(Float, nullable=True)
    lon           = Column(Float, nullable=True)
    agricultor_id = Column(Integer, ForeignKey("usuarios.id"), nullable=True, index=True)

    activo        = Column(Boolean, default=True, nullable=False)  # soft delete
    created_at    = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at    = Column(DateTime(timezone=True), onupdate=func.now())

    agricultor = relationship("Usuario", backref="parcelas", lazy="joined")

    __table_args__ = (
        Index("ix_parcela_agricultor_municipio", "agricultor_id", "municipio"),
    )

    def __repr__(self):
        return f"<Parcela {self.nombre} - {self.cultivo}>"
