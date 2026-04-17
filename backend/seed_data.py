# ── seed_data.py — Datos de prueba para Arrels ──────────────────
# Ejecutar: python seed_data.py

from database import SessionLocal
from models.usuario import Usuario
from models.parcela import Parcela
from models.producto import Producto
from models.aportacion import Aportacion
from models.venta import Venta, LineaVenta
from models.fichaje import Fichaje
from auth import hash_password
from datetime import datetime, timedelta
import random

db = SessionLocal()

def seed():
    print("🌱 Iniciando seed de datos...")

    # ── USUARIOS ─────────────────────────────────────────────────

    socios = [
        {"nombre": "Josep Miralles Tort",     "email": "josep@arrels.coop",    "password": "socio1234", "rol": "socio"},
        {"nombre": "Maria Antònia Pérez",      "email": "maria@arrels.coop",    "password": "socio1234", "rol": "socio"},
        {"nombre": "Francesc Navarro Blasco",  "email": "francesc@arrels.coop", "password": "socio1234", "rol": "socio"},
        {"nombre": "Rosa Martínez Sanz",       "email": "rosa@arrels.coop",     "password": "socio1234", "rol": "socio"},
        {"nombre": "Antoni Lloret Giner",      "email": "antoni@arrels.coop",   "password": "socio1234", "rol": "socio"},
        {"nombre": "Consuelo Ibáñez Prats",    "email": "consuelo@arrels.coop", "password": "socio1234", "rol": "socio"},
        {"nombre": "Miquel Ferrer Esteve",     "email": "miquel@arrels.coop",   "password": "socio1234", "rol": "socio"},
        {"nombre": "Dolors Castillo Vidal",    "email": "dolors@arrels.coop",   "password": "socio1234", "rol": "socio"},
        {"nombre": "Vicent Soria Campos",      "email": "vicent@arrels.coop",   "password": "socio1234", "rol": "socio"},
        {"nombre": "Carmen Ruiz Almela",       "email": "carmen@arrels.coop",   "password": "socio1234", "rol": "socio"},
    ]

    trabajadores = [
        {"nombre": "Pau Giménez Reig",         "email": "pau@arrels.coop",      "password": "trabajador1234", "rol": "trabajador"},
        {"nombre": "Neus Carbonell Molina",    "email": "neus@arrels.coop",     "password": "trabajador1234", "rol": "trabajador"},
    ]

    todos_usuarios = socios + trabajadores
    usuarios_creados = []

    for u in todos_usuarios:
        existe = db.query(Usuario).filter(Usuario.email == u["email"]).first()
        if not existe:
            nuevo = Usuario(
                nombre=u["nombre"],
                email=u["email"],
                password=hash_password(u["password"]),
                rol=u["rol"]
            )
            db.add(nuevo)
            db.flush()
            usuarios_creados.append(nuevo)
        else:
            usuarios_creados.append(existe)

    db.commit()
    print(f"✅ {len(todos_usuarios)} usuarios procesados")

    # Recargar usuarios socios de la DB
    socios_db = db.query(Usuario).filter(Usuario.rol == "socio").all()
    trabajador_db = db.query(Usuario).filter(Usuario.rol == "trabajador").first()
    admin_db = db.query(Usuario).filter(Usuario.rol == "admin").first()

    # ── PARCELAS ─────────────────────────────────────────────────

    parcelas_data = [
        {"nombre": "La Hoya",        "cultivo": "Almendros",    "superficie_ha": 3.5,  "municipio": "Agost",     "provincia": "Alicante", "descripcion": "Parcela principal con almendros centenarios variedad Marcona.", "agricultor": socios_db[0]},
        {"nombre": "El Campet",      "cultivo": "Olivos",       "superficie_ha": 2.1,  "municipio": "Agost",     "provincia": "Alicante", "descripcion": "Olivar tradicional con variedades Blanqueta y Arbequina.", "agricultor": socios_db[1]},
        {"nombre": "Les Eres",       "cultivo": "Almendros",    "superficie_ha": 4.2,  "municipio": "Monforte",  "provincia": "Alicante", "descripcion": "Finca en ladera con riego por goteo instalado en 2022.", "agricultor": socios_db[2]},
        {"nombre": "El Barranquet",  "cultivo": "Viña",         "superficie_ha": 1.8,  "municipio": "Agost",     "provincia": "Alicante", "descripcion": "Viña de monastrell de más de 40 años.", "agricultor": socios_db[3]},
        {"nombre": "La Solana",      "cultivo": "Almendros",    "superficie_ha": 5.0,  "municipio": "Tibi",      "provincia": "Alicante", "descripcion": "Gran finca con almendros Guara y Lauranne.", "agricultor": socios_db[4]},
        {"nombre": "El Pinar",       "cultivo": "Olivos",       "superficie_ha": 2.8,  "municipio": "Agost",     "provincia": "Alicante", "descripcion": "Olivar en terreno pedregoso con producción ecológica.", "agricultor": socios_db[5]},
        {"nombre": "Les Tancades",   "cultivo": "Cítricos",     "superficie_ha": 1.5,  "municipio": "Mutxamel",  "provincia": "Alicante", "descripcion": "Naranjas y limones con sistema de riego automatizado.", "agricultor": socios_db[6]},
        {"nombre": "El Tossal",      "cultivo": "Almendros",    "superficie_ha": 3.2,  "municipio": "Agost",     "provincia": "Alicante", "descripcion": "Parcela en zona alta con vistas al embalse.", "agricultor": socios_db[7]},
        {"nombre": "La Devesa",      "cultivo": "Garrofers",    "superficie_ha": 2.4,  "municipio": "Agost",     "provincia": "Alicante", "descripcion": "Garroferal con árboles de más de 80 años.", "agricultor": socios_db[8]},
        {"nombre": "El Molí",        "cultivo": "Horta",        "superficie_ha": 0.8,  "municipio": "Agost",     "provincia": "Alicante", "descripcion": "Huerta familiar con verduras de temporada.", "agricultor": socios_db[9]},
    ]

    parcelas_creadas = []
    for p in parcelas_data:
        existe = db.query(Parcela).filter(Parcela.nombre == p["nombre"]).first()
        if not existe:
            nueva = Parcela(
                nombre=p["nombre"],
                cultivo=p["cultivo"],
                superficie_ha=p["superficie_ha"],
                municipio=p["municipio"],
                provincia=p["provincia"],
                descripcion=p["descripcion"],
                agricultor_id=p["agricultor"].id
            )
            db.add(nueva)
            parcelas_creadas.append(nueva)
        else:
            parcelas_creadas.append(existe)

    db.commit()
    print(f"✅ {len(parcelas_data)} parcelas procesadas")

    # ── PRODUCTOS ─────────────────────────────────────────────────

    productos_data = [
        # Aceites
        {"nombre_es": "Aceite de Oliva Virgen Extra Blanqueta", "nombre_en": "Extra Virgin Olive Oil Blanqueta", "descripcion_es": "Aceite de oliva de variedad Blanqueta, primera extracción en frío. Sabor afrutado con notas de almendra verde.", "descripcion_en": "Blanqueta variety olive oil, first cold extraction. Fruity flavor with green almond notes.", "precio": 8.50, "unidad": "botella 500ml", "categoria": "aceite", "stock": 120, "stock_minimo": 10, "destacado": True, "origen": "Agost, Alicante", "certificado": "DOP"},
        {"nombre_es": "Aceite de Oliva Virgen Extra Arbequina", "nombre_en": "Extra Virgin Olive Oil Arbequina", "descripcion_es": "Aceite de variedad Arbequina con sabor suave y afrutado. Ideal para ensaladas y postres.", "descripcion_en": "Arbequina variety oil with mild, fruity flavor. Ideal for salads and desserts.", "precio": 7.80, "unidad": "botella 500ml", "categoria": "aceite", "stock": 85, "stock_minimo": 10, "destacado": False, "origen": "Agost, Alicante", "certificado": "DOP"},
        {"nombre_es": "Aceite de Oliva Ecológico", "nombre_en": "Organic Olive Oil", "descripcion_es": "Aceite ecológico certificado, sin pesticidas ni herbicidas. Producción limitada.", "descripcion_en": "Certified organic oil, no pesticides or herbicides. Limited production.", "precio": 11.50, "unidad": "botella 500ml", "categoria": "aceite", "stock": 40, "stock_minimo": 5, "destacado": True, "origen": "Agost, Alicante", "certificado": "ECO"},

        # Frutos secos
        {"nombre_es": "Almendras Marcona Crudas", "nombre_en": "Raw Marcona Almonds", "descripcion_es": "Almendras Marcona de calibre extra, recogidas a mano. Sin sal ni tostado.", "descripcion_en": "Extra grade Marcona almonds, hand-picked. No salt or roasting.", "precio": 12.00, "unidad": "kg", "categoria": "frutos_secos", "stock": 200, "stock_minimo": 20, "destacado": True, "origen": "Agost, Alicante", "certificado": None},
        {"nombre_es": "Almendras Marcona Tostadas", "nombre_en": "Toasted Marcona Almonds", "descripcion_es": "Almendras Marcona tostadas artesanalmente con sal marina.", "descripcion_en": "Artisanally toasted Marcona almonds with sea salt.", "precio": 14.00, "unidad": "kg", "categoria": "frutos_secos", "stock": 150, "stock_minimo": 15, "destacado": False, "origen": "Agost, Alicante", "certificado": None},
        {"nombre_es": "Almendras Largueta Crudas", "nombre_en": "Raw Largueta Almonds", "descripcion_es": "Variedad Largueta, más alargada y con sabor más intenso que la Marcona.", "descripcion_en": "Largueta variety, longer with more intense flavor than Marcona.", "precio": 10.00, "unidad": "kg", "categoria": "frutos_secos", "stock": 180, "stock_minimo": 15, "destacado": False, "origen": "Agost, Alicante", "certificado": None},
        {"nombre_es": "Garrofas Secas", "nombre_en": "Dried Carob Pods", "descripcion_es": "Garrofas secas de producción local. Excelente sustituto del cacao.", "descripcion_en": "Locally produced dried carob pods. Excellent cocoa substitute.", "precio": 3.50, "unidad": "kg", "categoria": "frutos_secos", "stock": 300, "stock_minimo": 30, "destacado": False, "origen": "Agost, Alicante", "certificado": None},

        # Conservas
        {"nombre_es": "Aceitunas Negras en Aceite", "nombre_en": "Black Olives in Oil", "descripcion_es": "Aceitunas negras maduras maceradas en aceite de oliva virgen extra con hierbas aromáticas.", "descripcion_en": "Ripe black olives macerated in extra virgin olive oil with aromatic herbs.", "precio": 4.50, "unidad": "tarro 350g", "categoria": "conservas", "stock": 90, "stock_minimo": 10, "destacado": False, "origen": "Agost, Alicante", "certificado": None},
        {"nombre_es": "Aceitunas Verdes Aliñadas", "nombre_en": "Seasoned Green Olives", "descripcion_es": "Aceitunas verdes aliñadas con ajo, limón y hierbas. Receta tradicional de Agost.", "descripcion_en": "Green olives seasoned with garlic, lemon and herbs. Traditional Agost recipe.", "precio": 4.00, "unidad": "tarro 350g", "categoria": "conservas", "stock": 75, "stock_minimo": 10, "destacado": False, "origen": "Agost, Alicante", "certificado": None},
        {"nombre_es": "Mermelada de Naranja Amarga", "nombre_en": "Bitter Orange Marmalade", "descripcion_es": "Mermelada artesanal de naranja amarga, sin conservantes ni colorantes artificiales.", "descripcion_en": "Artisan bitter orange marmalade, no preservatives or artificial colors.", "precio": 3.80, "unidad": "tarro 250g", "categoria": "conservas", "stock": 60, "stock_minimo": 8, "destacado": False, "origen": "Mutxamel, Alicante", "certificado": None},

        # Miel
        {"nombre_es": "Miel de Romero", "nombre_en": "Rosemary Honey", "descripcion_es": "Miel de romero pura, sin pasteurizar. Producción limitada de colmenas propias.", "descripcion_en": "Pure rosemary honey, unpasteurized. Limited production from our own hives.", "precio": 7.80, "unidad": "tarro 500g", "categoria": "miel", "stock": 45, "stock_minimo": 5, "destacado": True, "origen": "Agost, Alicante", "certificado": None},
        {"nombre_es": "Miel de Azahar", "nombre_en": "Orange Blossom Honey", "descripcion_es": "Miel de azahar de naranjos y limoneros, de sabor delicado y aroma floral.", "descripcion_en": "Orange and lemon blossom honey, delicate flavor and floral aroma.", "precio": 8.50, "unidad": "tarro 500g", "categoria": "miel", "stock": 35, "stock_minimo": 5, "destacado": False, "origen": "Mutxamel, Alicante", "certificado": None},

        # Vino y derivados
        {"nombre_es": "Vino Tinto Monastrell", "nombre_en": "Monastrell Red Wine", "descripcion_es": "Vino tinto de uva Monastrell, crianza 6 meses en barrica de roble americano.", "descripcion_en": "Monastrell red wine, aged 6 months in American oak barrels.", "precio": 9.00, "unidad": "botella 750ml", "categoria": "vino", "stock": 60, "stock_minimo": 6, "destacado": True, "origen": "Agost, Alicante", "certificado": "DOP Alicante"},
        {"nombre_es": "Vino Rosado Monastrell", "nombre_en": "Monastrell Rosé Wine", "descripcion_es": "Vino rosado fresco y afrutado de uva Monastrell. Ideal para el verano.", "descripcion_en": "Fresh and fruity Monastrell rosé wine. Ideal for summer.", "precio": 7.50, "unidad": "botella 750ml", "categoria": "vino", "stock": 48, "stock_minimo": 6, "destacado": False, "origen": "Agost, Alicante", "certificado": "DOP Alicante"},

        # Semillas y plantas
        {"nombre_es": "Semillas de Tomate Valenciano", "nombre_en": "Valencian Tomato Seeds", "descripcion_es": "Semillas de tomate valenciano tradicional, variedad autóctona no híbrida.", "descripcion_en": "Traditional Valencian tomato seeds, non-hybrid native variety.", "precio": 2.50, "unidad": "sobre 1g", "categoria": "semillas", "stock": 200, "stock_minimo": 20, "destacado": False, "origen": "Agost, Alicante", "certificado": None},
        {"nombre_es": "Semillas de Pimiento Rojo", "nombre_en": "Red Pepper Seeds", "descripcion_es": "Semillas de pimiento rojo de cultivo tradicional, alta germinación.", "descripcion_en": "Traditional red pepper seeds, high germination rate.", "precio": 2.00, "unidad": "sobre 1g", "categoria": "semillas", "stock": 150, "stock_minimo": 15, "destacado": False, "origen": "Agost, Alicante", "certificado": None},
        {"nombre_es": "Plántulas de Almendro Marcona", "nombre_en": "Marcona Almond Seedlings", "descripcion_es": "Plántulas de almendro Marcona injertadas sobre patrón GF677. Listas para plantar.", "descripcion_en": "Marcona almond seedlings grafted on GF677 rootstock. Ready to plant.", "precio": 8.00, "unidad": "ud", "categoria": "semillas", "stock": 50, "stock_minimo": 5, "destacado": False, "origen": "Vivero Alicante", "certificado": None},

        # Herramientas
        {"nombre_es": "Tijeras de Poda Profesionales", "nombre_en": "Professional Pruning Shears", "descripcion_es": "Tijeras de poda con muelle de retorno y hoja de acero inoxidable. Mango ergonómico.", "descripcion_en": "Pruning shears with return spring and stainless steel blade. Ergonomic handle.", "precio": 18.50, "unidad": "ud", "categoria": "herramientas", "stock": 25, "stock_minimo": 3, "destacado": False, "origen": None, "certificado": None},
        {"nombre_es": "Podón de Mango Largo", "nombre_en": "Long Handle Pruning Hook", "descripcion_es": "Podón de mango largo 1.5m para poda de ramas altas sin escalera.", "descripcion_en": "1.5m long handle pruning hook for high branch pruning without ladder.", "precio": 24.00, "unidad": "ud", "categoria": "herramientas", "stock": 15, "stock_minimo": 2, "destacado": False, "origen": None, "certificado": None},
        {"nombre_es": "Injertador Profesional", "nombre_en": "Professional Grafting Tool", "descripcion_es": "Injertador con cuchilla intercambiable para injertos en hendidura y omega.", "descripcion_en": "Grafting tool with interchangeable blade for cleft and omega grafts.", "precio": 32.00, "unidad": "ud", "categoria": "herramientas", "stock": 10, "stock_minimo": 2, "destacado": False, "origen": None, "certificado": None},

        # Abonos y fitosanitarios
        {"nombre_es": "Abono Orgánico Compostado", "nombre_en": "Composted Organic Fertilizer", "descripcion_es": "Abono orgánico compostado 100% natural, apto para agricultura ecológica.", "descripcion_en": "100% natural composted organic fertilizer, suitable for organic farming.", "precio": 12.00, "unidad": "saco 25kg", "categoria": "abonos", "stock": 80, "stock_minimo": 10, "destacado": False, "origen": None, "certificado": "ECO"},
        {"nombre_es": "Sulfato de Cobre", "nombre_en": "Copper Sulfate", "descripcion_es": "Sulfato de cobre para tratamiento preventivo de mildiu y antracnosis. Apto ECO.", "descripcion_en": "Copper sulfate for preventive treatment of mildew and anthracnose. ECO approved.", "precio": 8.50, "unidad": "kg", "categoria": "abonos", "stock": 60, "stock_minimo": 8, "destacado": False, "origen": None, "certificado": "ECO"},
        {"nombre_es": "Azufre Mojable", "nombre_en": "Wettable Sulfur", "descripcion_es": "Azufre mojable para tratamiento de oídio en almendros y olivos. Apto ECO.", "descripcion_en": "Wettable sulfur for powdery mildew treatment on almonds and olives. ECO approved.", "precio": 6.50, "unidad": "kg", "categoria": "abonos", "stock": 70, "stock_minimo": 8, "destacado": False, "origen": None, "certificado": "ECO"},
    ]

    productos_creados = []
    for p in productos_data:
        existe = db.query(Producto).filter(Producto.nombre_es == p["nombre_es"]).first()
        if not existe:
            nuevo = Producto(**p)
            db.add(nuevo)
            db.flush()
            productos_creados.append(nuevo)
        else:
            productos_creados.append(existe)

    db.commit()
    print(f"✅ {len(productos_data)} productos procesados")

    # ── APORTACIONES ─────────────────────────────────────────────

    aportaciones_data = [
        {"socio": socios_db[0], "producto": "Almendras Marcona", "kg": 850.0, "precio_kg": 2.80, "notas": "Primera entrega temporada 2025"},
        {"socio": socios_db[0], "producto": "Almendras Marcona", "kg": 620.0, "precio_kg": 2.80, "notas": "Segunda entrega temporada 2025"},
        {"socio": socios_db[1], "producto": "Aceite Blanqueta", "kg": 1200.0, "precio_kg": 0.45, "notas": "Entrega almazara octubre 2025"},
        {"socio": socios_db[2], "producto": "Almendras Largueta", "kg": 950.0, "precio_kg": 2.50, "notas": "Cosecha 2025"},
        {"socio": socios_db[3], "producto": "Uva Monastrell", "kg": 2100.0, "precio_kg": 0.65, "notas": "Vendimia septiembre 2025"},
        {"socio": socios_db[4], "producto": "Almendras Guara", "kg": 1450.0, "precio_kg": 2.60, "notas": "Temporada 2025"},
        {"socio": socios_db[5], "producto": "Aceite Ecológico", "kg": 800.0, "precio_kg": 0.55, "notas": "Producción ecológica certificada"},
        {"socio": socios_db[6], "producto": "Naranjas Navel", "kg": 3200.0, "precio_kg": 0.35, "notas": "Primera recogida diciembre 2025"},
        {"socio": socios_db[7], "producto": "Almendras Marcona", "kg": 720.0, "precio_kg": 2.80, "notas": "Cosecha parcela El Tossal"},
        {"socio": socios_db[8], "producto": "Garrofas", "kg": 1800.0, "precio_kg": 0.40, "notas": "Entrega cooperativa 2025"},
        {"socio": socios_db[9], "producto": "Verduras variadas", "kg": 450.0, "precio_kg": 1.20, "notas": "Huerta temporada otoño"},
    ]

    for a in aportaciones_data:
        from models.aportacion import Aportacion
        nueva = Aportacion(
            socio_id=a["socio"].id,
            trabajador_id=trabajador_db.id,
            producto=a["producto"],
            kg=a["kg"],
            precio_kg=a["precio_kg"],
            total=a["kg"] * a["precio_kg"],
            notas=a["notas"],
            fecha=datetime.now() - timedelta(days=random.randint(1, 90))
        )
        db.add(nueva)

    db.commit()
    print(f"✅ {len(aportaciones_data)} aportaciones creadas")

    # ── VENTAS ───────────────────────────────────────────────────

    productos_db = db.query(Producto).all()

    for i in range(15):
        socio = random.choice(socios_db)
        productos_seleccionados = random.sample(productos_db[:10], random.randint(1, 3))
        total = 0
        venta = Venta(
            socio_id=socio.id,
            trabajador_id=trabajador_db.id,
            total=0,
            fecha=datetime.now() - timedelta(days=random.randint(0, 60))
        )
        db.add(venta)
        db.flush()

        for prod in productos_seleccionados:
            cantidad = random.randint(1, 4)
            subtotal = prod.precio * cantidad
            total += subtotal
            linea = LineaVenta(
                venta_id=venta.id,
                producto_id=prod.id,
                cantidad=cantidad,
                precio_ud=prod.precio,
                subtotal=subtotal
            )
            db.add(linea)
            if prod.stock >= cantidad:
                prod.stock -= cantidad

        venta.total = round(total, 2)

    db.commit()
    print(f"✅ 15 ventas de ejemplo creadas")

    print("\n🎉 Seed completado correctamente!")
    print(f"   - 10 socios + 2 trabajadores")
    print(f"   - 10 parcelas")
    print(f"   - {len(productos_data)} productos en 7 categorías")
    print(f"   - {len(aportaciones_data)} aportaciones")
    print(f"   - 15 ventas de ejemplo")

if __name__ == "__main__":
    seed()
    db.close()