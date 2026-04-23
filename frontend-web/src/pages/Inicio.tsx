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
      <section className="bg-[#1c2b1a] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
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