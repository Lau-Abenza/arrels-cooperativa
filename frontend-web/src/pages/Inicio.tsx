import { useNavigate } from 'react-router-dom'
import LayoutPublico from '../components/LayoutPublico'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function Inicio() {
  const navigate = useNavigate()
  const { data: productosDestacados = [] } = useQuery<any[]>({
  queryKey: ['productos-destacados'],
  queryFn: async () => {
    const res = await axios.get('/productos/publicos')
    return (res.data as any[]).filter((p: any) => p.destacado).slice(0, 3)
  }
  })

  return (
    <LayoutPublico>
      {/* Hero */}
      <section
        className="relative text-white py-24 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-campo.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#1c2b1a]/80" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#2d4a1e] text-[#8ab89a] text-sm font-medium
                           px-4 py-1.5 rounded-full mb-6">
            🌿 Cooperativa Agrícola de Agost, Alicante
          </span>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Del campo a tu mesa,<br />
            <span className="text-[#4a7c59]">con tecnología</span>
          </h1>
          <p className="text-[#8ab89a] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Arrels es una cooperativa agrícola digital que conecta a los agricultores
            de Agost con consumidores que valoran la calidad y la proximidad.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/tienda')}
              className="bg-[#e07a30] hover:bg-[#c96a20] text-white
                         px-8 py-3.5 rounded-xl font-semibold transition-colors text-lg"
            >
              Ver la tienda →
            </button>
            <button
              onClick={() => navigate('/blog')}
              className="bg-[#2d4a1e] hover:bg-[#3d6b2e] text-white
                         px-8 py-3.5 rounded-xl font-semibold transition-colors text-lg"
            >
              Blog agrícola
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#4a7c59] text-white py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { valor: '+50', label: 'Socios agricultores' },
            { valor: '+200ha', label: 'De tierra cultivada' },
            { valor: '100%', label: 'Producto local' },
            { valor: '2026', label: 'Cooperativa digital' },
          ].map(({ valor, label }) => (
            <div key={label}>
              <p className="text-3xl font-bold">{valor}</p>
              <p className="text-[#a8c49a] text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1c2b1a] mb-2">Productos destacados</h2>
          <p className="text-slate-500 mb-8">Lo mejor de nuestra cooperativa</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productosDestacados.map((p: any) => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100
                                    hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-stone-100 to-amber-50
                            flex items-center justify-center overflow-hidden">
                {p.imagen_url && p.imagen_url !== 'string' ? (
                  <img src={p.imagen_url} alt={p.nombre_es} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="text-6xl">🌿</span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-800 mb-1">{p.nombre_es}</h3>
                <p className="text-slate-500 text-sm mb-3">{p.descripcion_es}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#4a7c59]">{p.precio}€/{p.unidad}</span>
                  <button
                    onClick={() => navigate('/tienda')}
                    className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                            px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/tienda')}
              className="bg-[#1c2b1a] hover:bg-[#2d4a1e] text-white
                         px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Ver todos los productos →
            </button>
          </div>
        </div>
      </section>

      {/* Meteorología */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1c2b1a] mb-2">🌤️ Meteorología</h2>
          <p className="text-slate-500 mb-6">Previsión del tiempo para Agost, Alicante</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#f4f1ea] rounded-2xl p-4 overflow-hidden">
              <h3 className="font-bold text-slate-800 mb-3">🌧️ Radar meteorológico</h3>
            <iframe
              src="https://embed.windy.com/embed2.html?lat=38.44&lon=-0.64&detailLat=38.44&detailLon=-0.64&width=650&height=350&zoom=8&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1"
              width="100%"
              height="350"
              frameBorder="0"
              title="Radar Windy Agost"
              className="rounded-x1"
            ></iframe>
          </div>
          
          <div className="bg-white rounded-2xl p-4 overflow-hidden flex flex-col">
            <h3 className="font-bold text-slate-800 mb-3">🌤️ Predicción Agost</h3>
            <div className="bg-[#eef4f0] rounded-xl p-6 flex-1 flex flex-col items-center justify-center text-center gap-4">
              <span className="text-6xl">⛅</span>
              <div>
                <p className="font-bold text-slate-800 text-lg">Agost, Alicante</p>
                <p className="text-slate-500 text-sm mt-1">Consulta la predicción completa en AEMET</p>
              </div>
              
              <a href="https://www.aemet.es/es/eltiempo/prediccion/municipios/agost-id03002"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2471a3] hover:bg-[#1a5a8a] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
              >
                Ver predicción 7 días →
              </a>
              
              <a href="https://www.aemet.es/es/eltiempo/prediccion/avisos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#e07a30] hover:bg-[#c96a20] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
              >
                ⚠️ Ver avisos meteorológicos →
              </a>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1c2b1a] mb-2">¿Cómo funciona?</h2>
          <p className="text-slate-500 mb-12">Simple, transparente y local</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '01', titulo: 'El agricultor cultiva', desc: 'Nuestros socios trabajan sus parcelas con técnicas tradicionales y apoyo tecnológico.' },
              { num: '02', titulo: 'La cooperativa gestiona', desc: 'Recogemos, clasificamos y preparamos los productos manteniendo la trazabilidad.' },
              { num: '03', titulo: 'Tú recibes calidad', desc: 'Compra online o visítanos. Producto fresco directamente del campo a tu puerta.' },
            ].map(({ num, titulo, desc }) => (
              <div key={num} className="text-center">
                <div className="w-12 h-12 bg-[#4a7c59] text-white rounded-full
                                flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {num}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{titulo}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#e07a30] py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Eres agricultor o quieres ser socio?
          </h2>
          <p className="text-orange-100 mb-8">
            Únete a la cooperativa y accede a todas las herramientas digitales para gestionar tus parcelas.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-[#e07a30] hover:bg-orange-50
                       px-8 py-3.5 rounded-xl font-bold transition-colors"
          >
            Solicitar acceso →
          </button>
        </div>
      </section>
    </LayoutPublico>
  )
}
