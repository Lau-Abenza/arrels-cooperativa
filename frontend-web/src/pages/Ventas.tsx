import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../components/Layout'

interface LineaVenta {
  id: number
  producto_id: number
  producto_nombre: string
  cantidad: number
  precio_ud: number
  subtotal: number
}

interface Venta {
  id: number
  socio_id: number | null
  socio_nombre: string | null
  trabajador_nombre: string | null
  fecha: string
  total: number
  lineas: LineaVenta[]
}

interface Producto {
  id: number
  nombre_es: string
  precio: number
  unidad: string
  stock: number
}

export default function Ventas() {
  const queryClient = useQueryClient()
  const [mostrarForm, setMostrarForm] = useState(false)
  const [socioId, setSocioId] = useState<number | ''>('')
  const [lineas, setLineas] = useState<{ producto_id: number, cantidad: number }[]>([
    { producto_id: 0, cantidad: 1 }
  ])

  const { data: ventas = [], isLoading } = useQuery({
    queryKey: ['ventas'],
    queryFn: async () => {
      const res = await axios.get('/api/ventas/')
      return res.data as Venta[]
    }
  })

  const { data: productos = [] } = useQuery({
    queryKey: ['productos'],
    queryFn: async () => {
      const res = await axios.get('/api/productos/')
      return res.data as Producto[]
    }
  })

  const crearMutation = useMutation({
    mutationFn: () => axios.post('/api/ventas/', {
      socio_id: socioId || null,
      lineas: lineas.filter(l => l.producto_id > 0)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ventas'] })
      queryClient.invalidateQueries({ queryKey: ['productos'] })
      setMostrarForm(false)
      setSocioId('')
      setLineas([{ producto_id: 0, cantidad: 1 }])
    }
  })

  const addLinea = () => setLineas(prev => [...prev, { producto_id: 0, cantidad: 1 }])
  const removeLinea = (i: number) => setLineas(prev => prev.filter((_, idx) => idx !== i))

  const total = lineas.reduce((acc, l) => {
    const prod = productos.find(p => p.id === l.producto_id)
    return acc + (prod ? prod.precio * l.cantidad : 0)
  }, 0)

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a]">🛒 Ventas</h2>
            <p className="text-slate-500 text-sm mt-1">{ventas.length} ventas registradas</p>
          </div>
          <button
            onClick={() => setMostrarForm(true)}
            className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                       px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            + Nueva venta
          </button>
        </div>

        {/* Formulario nueva venta */}
        {mostrarForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-4">Nueva venta</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-600 mb-1">
                ID Socio (opcional)
              </label>
              <input
                type="number"
                value={socioId}
                onChange={e => setSocioId(e.target.value ? parseInt(e.target.value) : '')}
                placeholder="Dejar vacío para venta sin socio"
                className="w-full max-w-xs px-3 py-2 rounded-xl border border-slate-200
                           focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                           focus:border-[#4a7c59] text-sm"
              />
            </div>

            {/* Líneas de venta */}
            <div className="space-y-3 mb-4">
              {lineas.map((linea, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <select
                    value={linea.producto_id}
                    onChange={e => setLineas(prev => prev.map((l, idx) =>
                      idx === i ? { ...l, producto_id: parseInt(e.target.value) } : l
                    ))}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200
                               focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                               focus:border-[#4a7c59] text-sm"
                  >
                    <option value={0}>Seleccionar producto...</option>
                    {productos.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.nombre_es} — {p.precio}€/{p.unidad} (stock: {p.stock})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={linea.cantidad}
                    onChange={e => setLineas(prev => prev.map((l, idx) =>
                      idx === i ? { ...l, cantidad: parseInt(e.target.value) } : l
                    ))}
                    className="w-20 px-3 py-2 rounded-xl border border-slate-200
                               focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                               focus:border-[#4a7c59] text-sm text-center"
                  />
                  {lineas.length > 1 && (
                    <button
                      onClick={() => removeLinea(i)}
                      className="text-red-400 hover:text-red-600 text-lg"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addLinea}
              className="text-[#4a7c59] text-sm hover:underline mb-4 block"
            >
              + Añadir producto
            </button>

            {/* Total */}
            <div className="bg-[#eef4f0] rounded-xl px-4 py-3 mb-4">
              <span className="text-slate-600 text-sm">Total estimado: </span>
              <span className="font-bold text-[#4a7c59] text-lg">{total.toFixed(2)}€</span>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setMostrarForm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200
                           text-slate-600 text-sm hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => crearMutation.mutate()}
                disabled={lineas.every(l => l.producto_id === 0)}
                className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                           px-4 py-2 rounded-xl text-sm font-semibold transition-colors
                           disabled:opacity-50"
              >
                Confirmar venta
              </button>
            </div>
          </div>
        )}

        {/* Lista de ventas */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : ventas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-4xl mb-3">🛒</p>
            <p className="text-slate-500 font-medium">No hay ventas registradas</p>
          </div>
        ) : (
          <div className="space-y-3">
            {ventas.map(v => (
              <div key={v.id} className="bg-white rounded-2xl shadow-sm p-5 border border-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-slate-800">
                      Venta #{v.id}
                      {v.socio_nombre && (
                        <span className="text-slate-500 font-normal"> · {v.socio_nombre}</span>
                      )}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(v.fecha).toLocaleString('es-ES')} · {v.trabajador_nombre}
                    </p>
                  </div>
                  <span className="text-xl font-bold text-[#4a7c59]">{v.total}€</span>
                </div>
                <div className="space-y-1">
                  {v.lineas.map(l => (
                    <div key={l.id} className="flex justify-between text-sm text-slate-600">
                      <span>{l.producto_nombre} × {l.cantidad}</span>
                      <span>{l.subtotal}€</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}