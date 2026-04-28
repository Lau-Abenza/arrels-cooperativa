import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutPublico from '../components/LayoutPublico'

const ARTICULOS = [
  { id: 1, titulo: 'Guía de poda del almendro: cuándo y cómo hacerlo', categoria: 'Técnicas de cultivo', fecha: '15 marzo 2026', resumen: 'La poda del almendro es fundamental para obtener buenas cosechas. Explicamos los momentos clave y técnicas efectivas para agricultores de Alicante.', emoji: '🌳', tiempo: '5 min' },
  { id: 2, titulo: 'Tratamientos fitosanitarios permitidos en cultivos ecológicos', categoria: 'Fitosanitarios', fecha: '8 marzo 2026', resumen: 'Guía actualizada con los productos fitosanitarios autorizados para agricultura ecológica según la normativa vigente del Ministerio de Agricultura.', emoji: '🌿', tiempo: '8 min' },
  { id: 3, titulo: 'Previsión meteorológica para la comarca: riesgos de helada', categoria: 'Meteorología', fecha: '1 marzo 2026', resumen: 'Análisis de las previsiones meteorológicas y recomendaciones para proteger los cultivos frente a las heladas tardías.', emoji: '🌡️', tiempo: '4 min' },
  { id: 4, titulo: 'Cómo interpretar el análisis de suelo de tu parcela', categoria: 'Técnicas de cultivo', fecha: '22 febrero 2026', resumen: 'El análisis de suelo es la base de una fertilización correcta. Te explicamos cómo leer los valores de pH, materia orgánica y nutrientes.', emoji: '🧪', tiempo: '6 min' },
  { id: 5, titulo: 'Normativa de la PAC 2026: lo que necesitas saber', categoria: 'Normativa', fecha: '15 febrero 2026', resumen: 'Resumen de los principales cambios de la Política Agraria Común para 2025 y cómo afectan a los agricultores de la Comunitat Valenciana.', emoji: '📋', tiempo: '10 min' },
  { id: 6, titulo: 'Riego por goteo: eficiencia y ahorro de agua en verano', categoria: 'Riego', fecha: '8 febrero 2026', resumen: 'El riego por goteo puede reducir el consumo de agua hasta un 50%. Guía práctica para instalar y programar tu sistema.', emoji: '💧', tiempo: '7 min' },
]

const CATEGORIAS = ['Todos', 'Técnicas de cultivo', 'Fitosanitarios', 'Meteorología', 'Normativa', 'Riego']

const RECURSOS = [
  { label: 'Ministerio de Agricultura', url: 'https://www.mapa.gob.es', desc: 'Normativa, ayudas y estadísticas oficiales' },
  { label: 'AEMET - Meteorología', url: 'https://www.aemet.es', desc: 'Previsión del tiempo y avisos meteorológicos' },
  { label: 'GVA - Conselleria Agricultura', url: 'https://agricultura.gva.es', desc: 'Servicios y trámites de la Comunitat Valenciana' },
  { label: 'Registro Fitosanitarios', url: 'https://www.mapa.gob.es/es/agricultura/temas/sanidad-vegetal/', desc: 'Registro oficial de productos fitosanitarios' },
]

export default function Blog() {
  const navigate = useNavigate()
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  const articulosFiltrados = ARTICULOS.filter(a => {
    const matchCat = categoriaActiva === 'Todos' || a.categoria === categoriaActiva
    const matchBusq = busqueda === '' || a.titulo.toLowerCase().includes(busqueda.toLowerCase())
    return matchCat && matchBusq
  })

  return (
    <LayoutPublico>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1c2b1a]">Blog Agrícola</h1>
          <p className="text-slate-500 mt-1">Consejos, normativa y recursos para agricultores</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <input
              type="text"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              placeholder="Buscar artículos..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white
                         focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                         focus:border-[#4a7c59] text-sm mb-4"
            />

            <div className="flex gap-2 flex-wrap mb-6">
              {CATEGORIAS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoriaActiva(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all
                    ${categoriaActiva === cat ? 'bg-[#4a7c59] text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {articulosFiltrados.map(a => (
                <article key={a.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-[#eef4f0] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {a.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs bg-[#eef4f0] text-[#4a7c59] px-2 py-0.5 rounded-full font-medium">{a.categoria}</span>
                        <span className="text-xs text-slate-400">{a.fecha}</span>
                        <span className="text-xs text-slate-400">· {a.tiempo} lectura</span>
                      </div>
                      <h2 className="font-bold text-slate-800 mb-2 leading-snug">{a.titulo}</h2>
                      <p className="text-slate-500 text-sm leading-relaxed mb-3">{a.resumen}</p>
                      <button className="text-[#4a7c59] text-sm font-medium hover:underline">Leer más →</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-800 mb-4">🔗 Recursos oficiales</h3>
              <div className="space-y-3">
                {RECURSOS.map(r => (
                  <div key={r.label} className="block p-3 rounded-xl bg-[#f4f1ea] hover:bg-[#eef4f0] transition-colors">
                    <a href={r.url} target="_blank" rel="noopener noreferrer"
                       className="text-sm font-medium text-[#4a7c59] hover:underline block">
                      {r.label} ↗
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-800 mb-3">🌤️ Meteorología</h3>
              <p className="text-sm text-slate-500 mb-3">Previsión para Agost, Alicante</p>
              <a
                href="https://www.aemet.es/es/eltiempo/prediccion/municipios/agost-id03002"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#2471a3] hover:bg-[#1a5a8a] text-white py-2.5 rounded-xl text-sm font-semibold text-center transition-colors"
              >
                Ver previsión AEMET →
              </a>
            </div>

            <div className="bg-[#1c2b1a] rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2">¿Eres socio?</h3>
              <p className="text-[#8ab89a] text-sm mb-4">Accede a tu espacio personal con informes del ingeniero y datos de tus parcelas.</p>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-[#4a7c59] hover:bg-[#3d6b4e] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Acceder →
              </button>
            </div>
          </div>
        </div>
      </div>
    {/* Meteorología */}
      <section className="py-12 px-6 bg-[#f4f1ea]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1c2b1a] mb-2">🌤️ Meteorología</h2>
          <p className="text-slate-500 mb-6">Previsión y radar para Agost, Alicante</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-4 overflow-hidden">
              <h3 className="font-bold text-slate-800 mb-3">🌧️ Radar meteorológico</h3>
              <iframe
                src="https://embed.windy.com/embed2.html?lat=38.44&lon=-0.64&detailLat=38.44&detailLon=-0.64&width=650&height=350&zoom=8&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1"
                width="100%"
                height="350"
                frameBorder="0"
                title="Radar Windy Agost"
                className="rounded-xl"
              ></iframe>
            </div>
            <div className="bg-white rounded-2xl p-4 overflow-hidden">
              <h3 className="font-bold text-slate-800 mb-3">🌤️ Predicción Agost</h3>
              <iframe
                src="https://www.aemet.es/es/eltiempo/prediccion/municipios/widget/agost-id03002"
                width="100%"
                height="500"
                frameBorder="0"
                title="Widget AEMET Agost"
                className="rounded-xl"
                scrolling="no"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </LayoutPublico>
  )
}