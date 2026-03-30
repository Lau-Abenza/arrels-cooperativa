# ── init_db.py — Crear usuarios iniciales si no existen ──────────
# Ejecutar una vez: python init_db.py

from database import SessionLocal
from models.usuario import Usuario
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
    db = SessionLocal()
    creados = 0
    for u in USUARIOS_INICIALES:
        existe = db.query(Usuario).filter(Usuario.email == u["email"]).first()
        if not existe:
            usuario = Usuario(
                nombre=u["nombre"],
                email=u["email"],
                password=hash_password(u["password"]),
                rol=u["rol"]
            )
            db.add(usuario)
            creados += 1
    db.commit()
    db.close()
    print(f"✅ {creados} usuarios creados. {len(USUARIOS_INICIALES) - creados} ya existían.")

if __name__ == "__main__":
    init()