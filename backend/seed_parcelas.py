"""
Script para poblar la tabla parcelas con datos de prueba.
Ejecutar desde la carpeta backend/:
    python seed_parcelas.py

Socios (excluido id=19 que lo crea el usuario):
5  - Socio Arrels
7  - Josep Miralles Tort
8  - Maria Antònia Pérez
9  - Francesc Navarro Blasco
10 - Rosa Martínez Sanz
11 - Antoni Lloret Giner
12 - Consuelo Ibáñez Prats
13 - Miquel Ferrer Esteve
14 - Dolors Castillo Vidal
15 - Vicent Soria Campos
16 - Carmen Ruiz Almela
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from database import SessionLocal
from models.parcela import Parcela

db = SessionLocal()

parcelas = [
  {
    "nombre": "Bancal dels Ametlers",
    "superficie_ha": 3.5,
    "cultivo": "Almendro",
    "municipio": "Agost",
    "provincia": "Alicante",
    "descripcion": "Parcela de secano con almendros variedad Marcona y Largueta. Suelo calcáreo, pendiente suave orientada al sur.",
    "agricultor_id": 5,
    "lat": 38.432,
    "lon": -0.657,
  },
  {
    "nombre": "Vinya del Tossal",
    "superficie_ha": 1.8,
    "cultivo": "Vid Monastrell",
    "municipio": "Agost",
    "provincia": "Alicante",
    "descripcion": "Viña de monastrell en vaso, más de 40 años de antigüedad. Producción destinada a la bodega cooperativa.",
    "agricultor_id": 7,
    "lat": 38.441,
    "lon": -0.643,
  },
  {
    "nombre": "Olivar de la Solana",
    "superficie_ha": 2.2,
    "cultivo": "Olivo",
    "municipio": "Agost",
    "provincia": "Alicante",
    "descripcion": "Olivar adulto variedad Arbequina con sistema de riego por goteo instalado en 2018. Producción de AOVE.",
    "agricultor_id": 8,
    "lat": 38.438,
    "lon": -0.661,
  },
  {
    "nombre": "Bancal de la Canyada",
    "superficie_ha": 4.1,
    "cultivo": "Almendro",
    "municipio": "Agost",
    "provincia": "Alicante",
    "descripcion": "Almendros variedad Guara autofértil, plantación de 2015. Preparada para recolección mecanizada.",
    "agricultor_id": 9,
    "lat": 38.426,
    "lon": -0.648,
  },
  {
    "nombre": "Hort de la Séquia",
    "superficie_ha": 0.8,
    "cultivo": "Hortícola",
    "municipio": "Agost",
    "provincia": "Alicante",
    "descripcion": "Huerto con riego por goteo. Producción de tomate, pimiento y calabacín para venta en tienda cooperativa.",
    "agricultor_id": 10,
    "lat": 38.434,
    "lon": -0.652,
  },
  {
    "nombre": "Ametlers del Pla",
    "superficie_ha": 5.3,
    "cultivo": "Almendro",
    "municipio": "Monforte del Cid",
    "provincia": "Alicante",
    "descripcion": "Gran parcela de almendros Marcona en terreno llano. Riego deficitario controlado en verano.",
    "agricultor_id": 11,
    "lat": 38.375,
    "lon": -0.672,
  },
  {
    "nombre": "Vinya de la Pedrera",
    "superficie_ha": 2.6,
    "cultivo": "Vid Moscatel",
    "municipio": "Novelda",
    "provincia": "Alicante",
    "descripcion": "Moscatel de Alejandría en espaldera para uva embolsada del Vinalopó. IGP Uva Embolsada.",
    "agricultor_id": 12,
    "lat": 38.388,
    "lon": -0.768,
  },
  {
    "nombre": "Olivar Vell de Baix",
    "superficie_ha": 3.0,
    "cultivo": "Olivo",
    "municipio": "Agost",
    "provincia": "Alicante",
    "descripcion": "Olivar centenario con olivos de más de 100 años. Producción tradicional de aceite virgen extra.",
    "agricultor_id": 13,
    "lat": 38.429,
    "lon": -0.665,
  },
  {
    "nombre": "Bancal de les Figues",
    "superficie_ha": 1.5,
    "cultivo": "Higuera y Almendro",
    "municipio": "Agost",
    "provincia": "Alicante",
    "descripcion": "Parcela mixta con higueras negras y almendros Largueta. Producción de higos secos y almendra.",
    "agricultor_id": 14,
    "lat": 38.444,
    "lon": -0.638,
  },
  {
    "nombre": "Camp de les Garroferes",
    "superficie_ha": 2.9,
    "cultivo": "Algarrobo",
    "municipio": "Agost",
    "provincia": "Alicante",
    "descripcion": "Algarrobos adultos de secano. Cultivo tradicional con recolección manual de algarrobas.",
    "agricultor_id": 15,
    "lat": 38.421,
    "lon": -0.659,
  },
  {
    "nombre": "Ametlers de la Costera",
    "superficie_ha": 3.8,
    "cultivo": "Almendro",
    "municipio": "Agost",
    "provincia": "Alicante",
    "descripcion": "Almendros Marcona en ladera orientada al sur. Secano tradicional con buena exposición solar.",
    "agricultor_id": 16,
    "lat": 38.447,
    "lon": -0.644,
  },
]

creadas = 0
existentes = 0
for p in parcelas:
    existe = db.query(Parcela).filter(
        Parcela.nombre == p["nombre"],
        Parcela.agricultor_id == p["agricultor_id"]
    ).first()
    if existe:
        existentes += 1
        continue
    nueva = Parcela(**p)
    db.add(nueva)
    creadas += 1

db.commit()
db.close()
print(f"✅ {creadas} parcelas creadas. {existentes} ya existían.")
