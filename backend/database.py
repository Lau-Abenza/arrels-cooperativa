import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Leer variable ANTES de cargar dotenv
DATABASE_URL = os.environ.get("DATABASE_URL", "")

# Cargar .env solo si no hay variable de entorno ya definida
if not DATABASE_URL:
    from dotenv import load_dotenv
    load_dotenv()
    DATABASE_URL = os.getenv("DATABASE_URL", "")

DATABASE_URL = DATABASE_URL.replace("postgresql+psycopg://", "postgresql+psycopg2://")
DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg2://")

print(f"DATABASE_URL inicio: {DATABASE_URL[:40]}...")
print(f"URL COMPLETA: '{DATABASE_URL}'")
print(f"URL LENGTH: {len(DATABASE_URL)}")

engine = create_engine(DATABASE_URL, connect_args={}, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()