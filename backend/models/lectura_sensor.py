from sqlalchemy import Column, Integer, Float, String, BigInteger, Index
from database import Base

class LecturaSensor(Base):
    __tablename__ = "lecturas_sensor"

    id            = Column(Integer, primary_key=True, autoincrement=True)
    device_id     = Column(String(50), nullable=False, index=True)
    timestamp     = Column(BigInteger, nullable=False)
    temp_aire     = Column(Float, nullable=True)
    hum_aire      = Column(Float, nullable=True)
    hum_suelo     = Column(Float, nullable=True)
    temp_suelo    = Column(Float, nullable=True)
    luz_lux       = Column(Float, nullable=True)
    lluvia_raw    = Column(Integer, nullable=True)
    nivel_agua_cm = Column(Float, nullable=True)
    ph_suelo      = Column(Float, nullable=True)

    __table_args__ = (
        Index("ix_device_ts", "device_id", "timestamp", unique=True),
    )

    def to_dict(self):
        return {
            "device_id":     self.device_id,
            "ts":            self.timestamp,
            "temp_aire":     self.temp_aire,
            "hum_aire":      self.hum_aire,
            "hum_suelo":     self.hum_suelo,
            "temp_suelo":    self.temp_suelo,
            "luz_lux":       self.luz_lux,
            "lluvia_raw":    self.lluvia_raw,
            "nivel_agua_cm": self.nivel_agua_cm,
            "ph_suelo":      self.ph_suelo,
        }