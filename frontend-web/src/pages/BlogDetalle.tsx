import { useParams, useNavigate } from 'react-router-dom'
import LayoutPublico from '../components/LayoutPublico'

const ARTICULOS: Record<number, {
  id: number
  titulo: string
  categoria: string
  fecha: string
  tiempo: string
  imagen: string
  autor: string
  contenido: { subtitulo?: string; texto: string }[]
}> = {
  1: {
    id: 1,
    titulo: 'Guía de poda del almendro: cuándo y cómo hacerlo',
    categoria: 'Técnicas de cultivo',
    fecha: '15 marzo 2026',
    tiempo: '5 min',
    imagen: '/poda.jpg',
    autor: 'Maria Antònia Pérez · Ingeniera Agrónoma',
    contenido: [
      { texto: 'La poda del almendro es una de las labores más importantes del año. Realizada correctamente, mejora la producción, facilita la recolección mecanizada y prolonga la vida del árbol. En Agost y el interior alicantino, donde el almendro es el cultivo estrella, conocer bien esta técnica marca la diferencia entre una buena y una mala cosecha.' },
      { subtitulo: '¿Cuándo podar?', texto: 'El momento ideal es el período de reposo vegetativo, entre noviembre y febrero, antes de que arranque la brotación. En variedades de floración temprana como la Marcona, conviene adelantar la poda a noviembre-diciembre para evitar que las heladas tardías afecten a los brotes recién formados. La variedad Largueta, de floración más tardía, tolera mejor una poda de enero-febrero.' },
      { subtitulo: 'Tipos de poda', texto: 'Distinguimos tres tipos principales: la poda de formación (primeros 3-4 años), la poda de producción (árbol adulto) y la poda de rejuvenecimiento (árboles viejos con producción decaída). En la cooperativa recomendamos un sistema de vaso abierto con 3-4 brazos principales, que facilita la entrada de luz y la recolección mecánica.' },
      { subtitulo: 'Herramientas necesarias', texto: 'Para ramas finas (hasta 2 cm): tijeras de podar de bypass. Para ramas medias (2-5 cm): serrucho de poda curvo. Para ramas gruesas: motosierra con protecciones. Es fundamental desinfectar las herramientas entre árboles con alcohol o lejía diluida para evitar transmitir enfermedades como la Fusicoccum.' },
      { subtitulo: 'Normas básicas', texto: 'Elimina ramas cruzadas, secas o enfermas. Corta siempre en bisel (ángulo de 45°) para evitar la acumulación de agua. No elimines más de un 25-30% de la masa foliar en una sola poda. Aplica pasta cicatrizante en cortes superiores a 3 cm de diámetro. Los restos de poda tritúralos o quémalos para evitar focos de enfermedad.' },
      { texto: 'Si tienes dudas sobre la poda de tus parcelas, puedes consultar con nuestra ingeniera agrónoma a través del módulo de Mensajes del panel de socios.' },
    ]
  },
  2: {
    id: 2,
    titulo: 'Tratamientos fitosanitarios permitidos en cultivos ecológicos',
    categoria: 'Fitosanitarios',
    fecha: '8 marzo 2026',
    tiempo: '8 min',
    imagen: '/verde.jpg',
    autor: 'Maria Antònia Pérez · Ingeniera Agrónoma',
    contenido: [
      { texto: 'La agricultura ecológica prohíbe el uso de pesticidas de síntesis química, pero dispone de un amplio catálogo de productos naturales y biológicos autorizados que permiten controlar plagas y enfermedades de forma efectiva. En este artículo repasamos los más utilizados en almendro, olivo y vid en nuestra comarca.' },
      { subtitulo: 'Marco normativo', texto: 'El Reglamento UE 2018/848 sobre producción ecológica regula los productos fitosanitarios permitidos. En España, el CAAE (Comité Andaluz de Agricultura Ecológica) y el CAECV (Comitat d\'Agricultura Ecológica de la Comunitat Valenciana) son los organismos de certificación. Todos los productos deben estar inscritos en el Registro de Productos Fitosanitarios del MAPA.' },
      { subtitulo: 'Fungicidas autorizados', texto: 'El cobre (oxicloruro, hidróxido, sulfato) es el fungicida estrella en ecológico. Controla mildiu en vid, repilo en olivo y cribado en almendro. Límite máximo: 28 kg/ha en 7 años (4 kg/ha/año). El azufre mojable es eficaz contra oídio. El bicarbonato potásico se usa preventivamente contra botritis. El Bacillus subtilis protege contra Botrytis y Alternaria.' },
      { subtitulo: 'Insecticidas autorizados', texto: 'La azadiractina (extracto de nim) controla mosca del olivo, trips y pulgones. El Bacillus thuringiensis (Bt) es el insecticida biológico por excelencia contra orugas y procesionaria. El aceite de parafina asfixia cochinillas y pulgones. Las feromonas sexuales para captura masiva y monitoreo de plagas están plenamente autorizadas.' },
      { subtitulo: 'Herbicidas en ecológico', texto: 'No existe ningún herbicida de síntesis autorizado en ecológico. El control de malas hierbas se realiza mecánicamente (cultivador, desbrozadora) o mediante cubiertas vegetales. El ácido acético (vinagre agrícola) está permitido como herbicida de contacto en algunas certificaciones.' },
      { subtitulo: 'Barreras físicas', texto: 'El caolín (Surround) forma una barrera física sobre el fruto que repele a la mosca de la fruta y a los trips. Es especialmente eficaz en uva embolsada del Vinalopó como complemento al embolsado. Las mallas anti-insectos y las trampas cromotrópicas completan el arsenal de control físico.' },
      { texto: 'Recuerda que cualquier tratamiento fitosanitario debe quedar registrado en el cuaderno de campo digital de la plataforma ARRELS, disponible en el módulo App de Campo.' },
    ]
  },
  3: {
    id: 3,
    titulo: 'Previsión meteorológica para la comarca: riesgos de helada',
    categoria: 'Meteorología',
    fecha: '1 marzo 2026',
    tiempo: '4 min',
    imagen: '/almendrosflor.jpg',
    autor: 'Josep Miralles · Director',
    contenido: [
      { texto: 'Las heladas tardías son uno de los mayores riesgos para los cultivos de la comarca de L\'Alacantí y el Vinalopó. El almendro, que florece en enero-febrero, y la vid, que brota en marzo-abril, son especialmente vulnerables a las heladas primaverales que pueden destruir la cosecha en pocas horas.' },
      { subtitulo: 'Umbral de daño por cultivo', texto: 'Almendro en flor: daños a partir de -2°C durante más de 2 horas. Almendro con fruto recién cuajado: daños a partir de -1°C. Vid en brotación: daños a partir de -1°C. Olivo en flor: daños a partir de -3°C. Los termómetros de mínimas en la parcela son más fiables que la previsión general, ya que en zonas bajas o con inversión térmica las temperaturas pueden ser 2-3°C inferiores.' },
      { subtitulo: 'Métodos de protección', texto: 'Aspersión de agua: el agua al congelarse libera calor latente que protege el tejido vegetal. Requiere un sistema de aspersión y disponibilidad de agua. Humos y braseros: menos eficaces y contaminantes, no recomendados. Helicópteros anti-helada: mueven el aire cálido de las capas superiores hacia el suelo, muy eficaces pero costosos. Instalación de sensores de temperatura: la plataforma ARRELS integra alertas automáticas cuando los sensores IoT detectan temperaturas por debajo del umbral configurado.' },
      { subtitulo: 'Recursos de seguimiento', texto: 'Consulta diariamente la predicción para Agost en AEMET (agost-id03002). Activa las alertas meteorológicas en la app. El IVIA (Institut Valencià d\'Investigació Agrària) publica previsiones específicas para el sector agrario con mapas de riesgo de helada por comarcas.' },
      { texto: 'Si tienes sensores IoT instalados en tu parcela, puedes configurar alertas de temperatura desde el módulo Sensores del panel de socios de ARRELS.' },
    ]
  },
  4: {
    id: 4,
    titulo: 'Cómo interpretar el análisis de suelo de tu parcela',
    categoria: 'Técnicas de cultivo',
    fecha: '22 febrero 2026',
    tiempo: '6 min',
    imagen: '/almendrosbancal.jpg',
    autor: 'Maria Antònia Pérez · Ingeniera Agrónoma',
    contenido: [
      { texto: 'El análisis de suelo es la herramienta más valiosa para una fertilización eficiente y sostenible. Sin conocer la composición del suelo, abonamos "a ciegas", con el consiguiente desperdicio económico y riesgo de contaminación de acuíferos. En este artículo te explicamos cómo interpretar los parámetros más importantes.' },
      { subtitulo: 'pH del suelo', texto: 'El pH ideal para la mayoría de cultivos de la comarca (almendro, vid, olivo) está entre 6.5 y 7.5. Los suelos de Agost son generalmente calcáreos, con pH entre 7.5 y 8.5, lo que provoca clorosis férrica por bloqueo del hierro. Si el pH supera 8, aplica quelatos de hierro (EDDHA) y sulfato de azufre para acidificar gradualmente.' },
      { subtitulo: 'Materia orgánica', texto: 'Los suelos mediterráneos de secano suelen tener menos del 1% de materia orgánica, muy por debajo del óptimo (2-3%). La materia orgánica mejora la estructura del suelo, retiene humedad y aporta nutrientes de liberación lenta. Incorpora compost maduro (15-20 t/ha cada 3-4 años) o residuos de poda triturados.' },
      { subtitulo: 'Macronutrientes: N, P, K', texto: 'El nitrógeno (N) es el nutriente más demandado. Aplícalo fraccionado: 40% en brotación, 30% en cuajado, 30% tras cosecha. El fósforo (P) es esencial para el desarrollo radicular; si el suelo es calcáreo usa fósforo acidificante. El potasio (K) mejora la calidad del fruto y la resistencia a sequía; el sulfato potásico es la mejor opción en suelos calcáreos.' },
      { subtitulo: 'Micronutrientes', texto: 'Los más problemáticos en nuestra comarca son el hierro (Fe), el zinc (Zn) y el boro (B). La deficiencia de hierro provoca clorosis internerval (hojas amarillas con nervios verdes). La deficiencia de boro provoca aborto floral y frutos deformados. Aplica correcciones foliares en primavera para resultados rápidos.' },
      { texto: 'La cooperativa ofrece servicio de análisis de suelo a precio de coste para los socios. Consulta con la ingeniera agrónoma a través del módulo de Mensajes.' },
    ]
  },
  5: {
    id: 5,
    titulo: 'Normativa de la PAC 2026: lo que necesitas saber',
    categoria: 'Normativa',
    fecha: '15 febrero 2026',
    tiempo: '10 min',
    imagen: '/cosechadoras.jpg',
    autor: 'Josep Miralles · Director',
    contenido: [
      { texto: 'La Política Agraria Común (PAC) 2023-2027 ha introducido cambios significativos en el sistema de ayudas. Si eres agricultor de la Comunitat Valenciana, aquí tienes un resumen de los aspectos que más te afectan en la campaña 2026.' },
      { subtitulo: 'Pago básico y ecorregímenes', texto: 'El pago básico por hectárea se ha reestructurado. Ahora existe un pago redistributivo para las primeras hectáreas (mayor ayuda por ha hasta cierto umbral) y los ecorregímenes, que son pagos voluntarios por prácticas beneficiosas para el clima y el medio ambiente. En la Comunitat Valenciana, los ecorregímenes más relevantes son la agricultura ecológica, la gestión de cubiertas vegetales y la reducción de fitosanitarios.' },
      { subtitulo: 'Condicionalidad reforzada', texto: 'Para cobrar las ayudas es obligatorio cumplir los Requisitos Legales de Gestión (RLG) y las Buenas Condiciones Agrarias y Medioambientales (BCAM). Entre las nuevas BCAM destacan: BCAM 1 (mantenimiento de pastos permanentes), BCAM 4 (franjas de protección en márgenes de ríos), BCAM 8 (rotación de cultivos en tierras de labor) y BCAM 9 (porcentaje mínimo de superficie no productiva).' },
      { subtitulo: 'Ayudas asociadas al almendro', texto: 'El almendro cuenta con ayuda asociada voluntaria en la PAC 2026. Para percibirla debes tener la parcela declarada como almendro en el SIGPAC, con densidad mínima de plantación y producción acreditada. Consulta los importes actualizados en la web de la Conselleria d\'Agricultura de la GVA.' },
      { subtitulo: 'Plazos importantes 2026', texto: 'Solicitud única (DUN): del 1 de febrero al 30 de abril. Modificaciones sin penalización: hasta el 31 de mayo. Controles e inspecciones: junio-octubre. Pagos: a partir de diciembre. Es fundamental tener el cuaderno de campo actualizado para acreditar las prácticas declaradas.' },
      { subtitulo: 'Gestión digital de la PAC', texto: 'La plataforma ARRELS permite registrar todas las labores agrícolas en el cuaderno de campo digital, lo que facilita enormemente la justificación de los ecorregímenes y la respuesta a posibles inspecciones. Accede desde el módulo App de Campo.' },
      { texto: 'Para cualquier consulta sobre la PAC, el equipo de la cooperativa está disponible en horario de oficina. También puedes enviar tus dudas a través del módulo de Mensajes del panel de socios.' },
    ]
  },
  6: {
    id: 6,
    titulo: 'Riego por goteo: eficiencia y ahorro de agua en verano',
    categoria: 'Riego',
    fecha: '8 febrero 2026',
    tiempo: '7 min',
    imagen: '/vinyedo.jpg',
    autor: 'Maria Antònia Pérez · Ingeniera Agrónoma',
    contenido: [
      { texto: 'El agua es el recurso más escaso y valioso en la agricultura mediterránea. El riego por goteo permite reducir el consumo de agua entre un 30 y un 50% respecto al riego por inundación, manteniendo o mejorando la producción. En un contexto de cambio climático con veranos cada vez más secos en Alicante, invertir en sistemas de riego eficientes es una decisión estratégica.' },
      { subtitulo: 'Ventajas del goteo', texto: 'El agua llega directamente a la zona radicular, reduciendo la evaporación superficial. Se evita el mojado de hojas y frutos, disminuyendo el riesgo de enfermedades fúngicas. Permite el fertirriego (aplicar abonos disueltos en el agua de riego), optimizando la nutrición. Reduce la proliferación de malas hierbas entre líneas al mantener la superficie seca.' },
      { subtitulo: 'Diseño del sistema', texto: 'Para almendro adulto en marco 6x6: 2 ramales por fila, goteros de 4 l/h cada 75 cm, caudal aproximado de 10-12 l/árbol/hora. Para vid en espaldera: 1 ramal por fila, goteros de 2 l/h cada 50 cm. El filtrado es crítico: usa filtro de malla (130 mesh mínimo) o filtro de arena si el agua tiene mucha materia orgánica. Instala un manómetro para controlar la presión (1-2.5 bar óptimo).' },
      { subtitulo: 'Programación del riego', texto: 'En verano (julio-agosto), el almendro en producción necesita entre 2.500 y 4.000 m³/ha según el suelo y el déficit hídrico. Riega de noche o madrugada para minimizar la evaporación. Usa tensiómetros o sensores de humedad para regar según la demanda real del cultivo, no por calendario. La plataforma ARRELS integra los datos de los sensores IoT para ayudarte a tomar decisiones de riego.' },
      { subtitulo: 'Mantenimiento', texto: 'Al inicio de campaña: revisa goteros obturados, limpia filtros, comprueba presiones. Durante la temporada: inspección visual semanal, limpieza de filtros mensual. Al final de campaña: purga con agua limpia, cierre de llaves de sector. Los goteros autolimpiantes y antidrenantes reducen el mantenimiento preventivo.' },
      { texto: 'La Generalitat Valenciana ofrece subvenciones para la modernización de regadíos. Consulta las convocatorias vigentes en la web de la Conselleria d\'Agricultura.' },
    ]
  },
  7: {
    id: 7,
    titulo: 'La uva embolsada del Vinalopó: tradición y calidad',
    categoria: 'Productos',
    fecha: '1 febrero 2026',
    tiempo: '5 min',
    imagen: '/vinalopo.jpg',
    autor: 'Josep Miralles · Director',
    contenido: [
      { texto: 'La Uva de Mesa Embolsada del Vinalopó es uno de los productos agrícolas más singulares y reconocidos de la provincia de Alicante. Su técnica de embolsado, única en el mundo a escala comercial, le otorga una protección natural que produce uvas de piel fina, color uniforme y sabor excepcional.' },
      { subtitulo: 'La técnica del embolsado', texto: 'El embolsado consiste en cubrir cada racimo individualmente con una bolsa de papel especial (kraft parafinado) o papel blanco durante el período de maduración. Este proceso, realizado a mano por cuadrillas especializadas, protege el fruto de la mosca de la fruta, la lluvia, la exposición directa al sol y las enfermedades. El resultado es una uva de piel más fina, menos residuos fitosanitarios y mayor vida útil postcosecha.' },
      { subtitulo: 'La IGP Uva Embolsada del Vinalopó', texto: 'La Indicación Geográfica Protegida (IGP) ampara la uva moscatel y la variedad Ideal producidas en los municipios del Valle del Vinalopó: Novelda, Monforte del Cid, Aspe, Hondón de las Nieves y municipios limítrofes. Para obtener el sello IGP, la uva debe superar controles de calidad estrictos: calibre mínimo 14 mm, ausencia de defectos, grado Brix mínimo según variedad.' },
      { subtitulo: 'Calendario de la uva embolsada', texto: 'Marzo-abril: poda y atado de cepas. Mayo-junio: aclareo de racimos (se eliminan los menos desarrollados para concentrar la producción). Junio-julio: embolsado manual de los racimos seleccionados. Agosto-octubre: cosecha escalonada según variedad y madurez. La vendimia de la uva embolsada es completamente manual.' },
      { texto: 'En la tienda online de ARRELS puedes encontrar uva moscatel embolsada de producción propia de nuestros socios del Vinalopó durante la temporada de agosto a noviembre.' },
    ]
  },
  8: {
    id: 8,
    titulo: 'Variedades de almendra autóctona de Alicante',
    categoria: 'Productos',
    fecha: '20 enero 2026',
    tiempo: '6 min',
    imagen: '/almendras.jpg',
    autor: 'Maria Antònia Pérez · Ingeniera Agrónoma',
    contenido: [
      { texto: 'La provincia de Alicante es la principal productora de almendra de calidad de España. Las variedades autóctonas alicantinas tienen características únicas que las hacen insustituibles para la industria turronera y confitería. La IGP Almendra de Alicante ampara las tres variedades más importantes.' },
      { subtitulo: 'Marcona', texto: 'La Marcona es la variedad más valorada del mundo. De forma redondeada, piel fina y sabor muy suave y dulce, es la base del turrón de Jijona y el turrón duro de Alicante. Su contenido en aceite es del 65-70%, el más alto de todas las variedades. Floración muy temprana (enero-febrero), lo que la hace sensible a las heladas tardías. Se cultiva principalmente en el interior alicantino (Agost, Novelda, Monforte) y en algunas zonas de Murcia.' },
      { subtitulo: 'Largueta', texto: 'La Largueta es alargada y plana, con un sabor más intenso y ligeramente amargo que la Marcona. Es la variedad preferida para el turrón de guirlache y la almendra garrapiñada. Floración tardía (febrero-marzo), más resistente a las heladas que la Marcona. Alta productividad y buena adaptación a suelos pobres y secos del interior alicantino.' },
      { subtitulo: 'Comune', texto: 'La Comune (o Común) es una variedad de uso principalmente industrial, con menor valor comercial que las anteriores pero alta productividad. Se utiliza en la industria de la pasta de almendra, mazapán y productos de repostería. Cáscara más dura y gruesa, mayor resistencia a enfermedades. Muy adaptada al secano alicantino.' },
      { subtitulo: 'Nuevas variedades', texto: 'Además de las autóctonas, en los últimos años se han introducido variedades como la Guara, Penta, Marta y Soleta, todas autofértiles (no necesitan polinizador) y con floración más tardía. Estas variedades facilitan la mecanización de la cosecha y reducen el riesgo de heladas, aunque su calidad organoléptica es inferior a Marcona y Largueta.' },
      { texto: 'Las almendras de producción propia de los socios de ARRELS, variedades Marcona y Largueta con IGP, están disponibles en nuestra tienda online en temporada (agosto-octubre).' },
    ]
  },
  9: {
    id: 9,
    titulo: 'Historia de la cooperativa: 60 años de agricultura en Agost',
    categoria: 'Cooperativa',
    fecha: '10 enero 2026',
    tiempo: '8 min',
    imagen: '/foto-historica.jpg',
    autor: 'Josep Miralles · Director',
    contenido: [
      { texto: 'En 1965, un grupo de agricultores de Agost decidió unir fuerzas para hacer frente a los intermediarios y mejorar las condiciones de comercialización de sus productos. Así nació lo que hoy es la Cooperativa Agrícola ARRELS, sesenta años de historia al servicio del agricultor alicantino.' },
      { subtitulo: 'Los primeros años (1965-1980)', texto: 'La cooperativa comenzó con apenas 12 socios y una pequeña bodega en el casco urbano de Agost. Los primeros años se dedicaron principalmente a la comercialización colectiva de almendra y uva, evitando la dependencia de los almacenistas locales. En 1972 se construyó la primera almazara cooperativa, permitiendo elaborar aceite de oliva propio por primera vez.' },
      { subtitulo: 'Expansión y modernización (1980-2000)', texto: 'Los años 80 y 90 fueron de gran expansión. La cooperativa amplió sus instalaciones, incorporó nuevos socios de municipios vecinos y diversificó su actividad hacia la comercialización de vino, miel y productos hortícolas. En 1995 se obtuvo la primera certificación de producción integrada, adelantándose a las exigencias del mercado.' },
      { subtitulo: 'La transformación digital (2020-2026)', texto: 'La irrupción de las nuevas tecnologías plantea nuevos retos y oportunidades. En 2024 se inició el proyecto ARRELS, una plataforma digital integral que moderniza la gestión de la cooperativa: cuaderno de campo digital, sensores IoT para monitorización de parcelas, tienda online y comunicación directa entre socios e ingenieros agrónomos. En 2026, más de 50 socios gestionan sus más de 200 hectáreas a través de la plataforma.' },
      { subtitulo: 'El futuro', texto: 'Los retos del futuro son el cambio climático, la escasez de agua, el relevo generacional y la competencia de países terceros. La cooperativa apuesta por la digitalización, la diferenciación de producto mediante certificaciones de calidad (IGP Almendra de Alicante, IGP Uva Embolsada del Vinalopó) y la venta directa al consumidor para maximizar el valor del producto.' },
      { texto: 'Si quieres ser parte de esta historia, únete a la cooperativa a través del formulario de la página Sobre Nosotros o contacta directamente con nosotros en info@arrels.coop.' },
    ]
  },
}

export default function BlogDetalle() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const articulo = ARTICULOS[Number(id)]

  if (!articulo) {
    return (
      <LayoutPublico>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <span className="text-6xl mb-4 block">🌿</span>
          <h1 className="text-2xl font-bold text-[#1c2b1a] mb-4">Artículo no encontrado</h1>
          <button
            onClick={() => navigate('/blog')}
            className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            ← Volver al blog
          </button>
        </div>
      </LayoutPublico>
    )
  }

  return (
    <LayoutPublico>
      {/* Hero imagen */}
      <div
        className="relative h-72 bg-cover bg-center"
        style={{ backgroundImage: `url('${articulo.imagen}')` }}
      >
        <div className="absolute inset-0 bg-[#1c2b1a]/70" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-8 max-w-4xl mx-auto">
          <span className="inline-block bg-[#4a7c59] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
            {articulo.categoria}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {articulo.titulo}
          </h1>
        </div>
      </div>

      {/* Meta */}
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4 text-sm text-slate-500 border-b border-slate-100">
        <span>✍️ {articulo.autor}</span>
        <span>·</span>
        <span>📅 {articulo.fecha}</span>
        <span>·</span>
        <span>⏱ {articulo.tiempo} de lectura</span>
      </div>

      {/* Contenido */}
      <article className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {articulo.contenido.map((bloque, i) => (
          <div key={i}>
            {bloque.subtitulo && (
              <h2 className="text-xl font-bold text-[#1c2b1a] mb-2">{bloque.subtitulo}</h2>
            )}
            <p className="text-slate-600 leading-relaxed">{bloque.texto}</p>
          </div>
        ))}

        {/* Separador */}
        <div className="border-t border-slate-100 pt-8 mt-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={() => navigate('/blog')}
              className="text-[#4a7c59] font-semibold hover:underline"
            >
              ← Volver al blog
            </button>
            <button
              onClick={() => navigate('/tienda')}
              className="bg-[#e07a30] hover:bg-[#c96a20] text-white px-6 py-2.5 rounded-xl font-semibold transition-colors text-sm"
            >
              Ver productos de la cooperativa →
            </button>
          </div>
        </div>
      </article>

      {/* Más artículos */}
      <section className="bg-[#eef4f0] py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-[#1c2b1a] mb-6">Más artículos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(ARTICULOS)
              .filter(a => a.id !== articulo.id)
              .slice(0, 3)
              .map(a => (
                <button
                  key={a.id}
                  onClick={() => navigate(`/blog/${a.id}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="h-28 overflow-hidden">
                    <img src={a.imagen} alt={a.titulo} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-[#4a7c59] font-medium">{a.categoria}</span>
                    <p className="font-semibold text-slate-800 text-sm mt-1 leading-snug">{a.titulo}</p>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </section>
    </LayoutPublico>
  )
}
