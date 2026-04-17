import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LayoutPublico from '../components/LayoutPublico'

interface Producto {
  id: number
  nombre_es: string
  nombre_en: string
  descripcion_es: string
  descripcion_en: string
  precio: number
  unidad: string
  categoria: string
  stock: number
  destacado: boolean
  origen: string | null
  certificado: string | null
  imagen_url: string | null
}

interface ItemCarrito {
  producto: Producto
  cantidad: number
}

export default function TiendaPublica() {
  const [idioma, setIdioma] = useState<'es' | 'en'>('es')
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [categoriaActiva, setCategoriaActiva] = useState('todos')
  const [busqueda, setBusqueda] = useState('')

  const { data: productos = [], isLoading } = useQuery({
    queryKey: ['productos-publicos'],
    queryFn: async () => {
      const res = await axios.get('/productos/publicos')
      return res.data as Producto[]
    }
  })

  const categorias = ['todos', ...new Set(productos.map(p => p.categoria))]

  const productosFiltrados = useMemo(() => {
    return productos.filter(p => {
      const matchCat = categoriaActiva === 'todos' || p.categoria === categoriaActiva
      const matchBusq = busqueda === '' ||
        p.nombre_es.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.nombre_en.toLowerCase().includes(busqueda.toLowerCase())
      return matchCat && matchBusq
    })
  }, [productos, categoriaActiva, busqueda])

  const totalItems = carrito.reduce((acc, i) => acc + i.cantidad, 0)
  const totalPrecio = carrito.reduce((acc, i) => acc + i.producto.precio * i.cantidad, 0)

  const addToCart = (producto: Producto) => {
    setCarrito(prev => {
      const existe = prev.find(i => i.producto.id === producto.id)
      if (existe) {
        return prev.map(i => i.producto.id === producto.id
          ? { ...i, cantidad: i.cantidad + 1 } : i)
      }
      return [...prev, { producto, cantidad: 1 }]
    })
    setCarritoAbierto(true)
  }

  const getEmoji = (categoria: string) => {
    const emojis: Record<string, string> = {
      aceite: '🫒',
      frutos_secos: '🌰',
      conservas: '🥫',
      semillas: '🌱',
      herramientas: '🔧',
      abonos: '🌿',
      vino: '🍷',
      miel: '🍯',
    }
    return emojis[categoria] || '📦'
  }

  return (
    <LayoutPublico>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header tienda */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1c2b1a]">Tienda Arrels</h1>
            <p className="text-slate-500 mt-1">Productos directos de nuestra cooperativa</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex rounded-lg bg-slate-100 p-0.5 gap-0.5">
              {(['es', 'en'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setIdioma(lang)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                    ${idioma === lang ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <span>{lang === 'es' ? '🇪🇸' : '🇬🇧'}</span>
                  <span>{lang.toUpperCase()}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setCarritoAbierto(!carritoAbierto)}
              className="relative bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                         px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              🛒 Carrito
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#e07a30]
                                 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {idioma === 'en' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 mb-4
                          text-sm text-blue-700 flex items-center gap-2">
            <span>🇬🇧</span>
            <span>Product names and descriptions shown in English.</span>
          </div>
        )}

        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex gap-3 mb-4 flex-wrap">
              <input
                type="text"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                placeholder="Buscar productos..."
                className="px-3 py-2 rounded-xl border border-slate-200
                           focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                           focus:border-[#4a7c59] text-sm flex-1 max-w-xs bg-white"
              />
              <div className="flex gap-2 flex-wrap">
                {categorias.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoriaActiva(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all capitalize
                      ${categoriaActiva === cat
                        ? 'bg-[#4a7c59] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : productosFiltrados.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="text-4xl mb-3">🌿</p>
                <p>No se encontraron productos</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {productosFiltrados.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl border border-slate-100
                                              shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="h-40 bg-gradient-to-br from-stone-100 to-amber-50
                                    flex items-center justify-center overflow-hidden">
                      {p.imagen_url && p.imagen_url !== 'string' ? (
                        <img
                          src={p.imagen_url}
                          alt={idioma === 'es' ? p.nombre_es : p.nombre_en}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-5xl">{getEmoji(p.categoria)}</span>
                      )}
                    </div>
                    <div className="p-4">
                      {p.certificado && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5
                                         rounded-full font-medium mb-2 inline-block">
                          {p.certificado}
                        </span>
                      )}
                      <h3 className="font-bold text-slate-800 leading-snug mb-1">
                        {idioma === 'es' ? p.nombre_es : p.nombre_en}
                      </h3>
                      <p className="text-slate-500 text-sm mb-3 line-clamp-2">
                        {idioma === 'es' ? p.descripcion_es : p.descripcion_en}
                      </p>
                      {p.origen && (
                        <p className="text-xs text-slate-400 mb-3">📍 {p.origen}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-[#4a7c59]">{p.precio}€</span>
                          <span className="text-slate-400 text-sm">/{p.unidad}</span>
                        </div>
                        <button
                          onClick={() => addToCart(p)}
                          className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                                     px-3 py-1.5 rounded-xl text-sm font-semibold
                                     transition-colors active:scale-95"
                        >
                          + Añadir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {carritoAbierto && (
            <aside className="w-72 flex-shrink-0">
              <div className="sticky top-20 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <h2 className="font-bold text-slate-800 mb-4">Tu carrito</h2>
                {carrito.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p className="text-3xl mb-2">🛒</p>
                    <p className="text-sm">Vacío</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {carrito.map(({ producto, cantidad }) => (
                        <div key={producto.id} className="flex items-center gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {idioma === 'es' ? producto.nombre_es : producto.nombre_en}
                            </p>
                            <p className="text-xs text-slate-400">{producto.precio}€/{producto.unidad}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setCarrito(prev =>
                                prev.map(i => i.producto.id === producto.id
                                  ? { ...i, cantidad: Math.max(0, i.cantidad - 1) }
                                  : i).filter(i => i.cantidad > 0)
                              )}
                              className="w-6 h-6 rounded bg-slate-100 text-slate-600 text-sm flex items-center justify-center"
                            >−</button>
                            <span className="text-sm w-4 text-center">{cantidad}</span>
                            <button
                              onClick={() => setCarrito(prev =>
                                prev.map(i => i.producto.id === producto.id
                                  ? { ...i, cantidad: i.cantidad + 1 } : i)
                              )}
                              className="w-6 h-6 rounded bg-slate-100 text-slate-600 text-sm flex items-center justify-center"
                            >+</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 pt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500">Subtotal</span>
                        <span className="font-semibold">{totalPrecio.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-slate-500">Envío</span>
                        <span className="text-green-600 font-medium">
                          {totalPrecio >= 40 ? 'Gratis' : '4.99€'}
                        </span>
                      </div>
                      {totalPrecio < 40 && (
                        <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mb-3">
                          Añade {(40 - totalPrecio).toFixed(2)}€ más para envío gratis
                        </p>
                      )}
                      <button className="w-full bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                                         font-semibold py-3 rounded-xl transition-colors text-sm">
                        Finalizar pedido →
                      </button>
                      <p className="text-xs text-slate-400 text-center mt-2">Pago seguro con Stripe</p>
                    </div>
                  </>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </LayoutPublico>
  )
}