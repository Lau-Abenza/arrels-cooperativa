import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+psycopg2://postgres:yMBvQMwVEZHZDwPhFuTMoFGCBjkqeiDz@maglev.proxy.rlwy.net:31329/railway"

print(f"URL: {DATABASE_URL[:50]}...")

engine = create_engine(DATABASE_URL, connect_args={}, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()