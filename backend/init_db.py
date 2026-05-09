# ── init_db.py — Crear tablas e insertar usuarios iniciales ─────
# Ejecutar: python init_db.py
from database import SessionLocal, Base, engine

# Importar TODOS los modelos para que SQLAlchemy los registre en Base.metadata
from models.usuario import Usuario
from models.parcela import Parcela
from models.producto import Producto
from models.venta import Venta, LineaVenta
from models.fichaje import Fichaje
from models.alquiler import Alquiler
from models.aportacion import Aportacion
from models.mensaje import Mensaje
from models.plan_accion import PlanAccion
from models.apero import Apero
from models.anotacion import Anotacion
from models.lectura_sensor import LecturaSensor

from auth import hash_password

USUARIOS_INICIALES = [
    {"nombre": "Admin Arrels",      "email": "admin@arrels.coop",      "password": "admin1234",      "rol": "admin"},
    {"nombre": "Director Arrels",   "email": "director@arrels.coop",   "password": "director1234",   "rol": "director"},
    {"nombre": "Trabajador Arrels", "email": "trabajador@arrels.coop", "password": "trabajador1234", "rol": "trabajador"},
    {"nombre": "Ingeniero Arrels",  "email": "ingeniero@arrels.coop",  "password": "ingeniero1234",  "rol": "ingeniero"},
    {"nombre": "Socio Arrels",      "email": "socio@arrels.coop",      "password": "socio1234",      "rol": "socio"},
    {"nombre": "Usuario Web",       "email": "usuario@arrels.coop",    "password": "usuario1234",    "rol": "usuario_web"},
]

def init():
    # 1. Crear tablas según los modelos actuales
    Base.metadata.create_all(bind=engine)
    print("📦 Tablas creadas/verificadas según los modelos actuales.")

    # 2. Insertar usuarios iniciales si no existen
    db = SessionLocal()
    creados = 0
    for u in USUARIOS_INICIALES:
        existe = db.query(Usuario).filter(Usuario.email == u["email"]).first()
        if not existe:
            usuario = Usuario(
                nombre=u["nombre"],
                email=u["email"],
                password=hash_password(u["password"]),
                rol=u["rol"],
            )
            db.add(usuario)
            creados += 1
    db.commit()
    db.close()
    print(f"✅ {creados} usuarios creados. {len(USUARIOS_INICIALES) - creados} ya existían.")

if __name__ == "__main__":
    init()