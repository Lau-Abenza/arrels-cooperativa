from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Parcela(Base):
    __tablename__ = "parcelas"

    id            = Column(Integer, primary_key=True, autoincrement=True)
    nombre        = Column(String(100), nullable=False)
    superficie_ha = Column(Float, nullable=False)
    cultivo       = Column(String(100), nullable=False)
    municipio     = Column(String(100))
    provincia     = Column(String(100), default="Alicante")
    descripcion   = Column(Text, nullable=True)
    geojson       = Column(Text, nullable=True)
    lat           = Column(Float, nullable=True)
    lon           = Column(Float, nullable=True)
    agricultor_id = Column(Integer, ForeignKey("usuarios.id"), nullable=True)

    agricultor = relationship("Usuario", backref="parcelas")

    def __repr__(self):
        return f"<Parcela {self.nombre} - {self.cultivo}>"