import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../components/Layout'

interface Producto {
  id: number
  nombre_es: string
  nombre_en: string
  precio: number
  unidad: string
  categoria: string
  stock: number
  stock_minimo: number
  destacado: boolean
  activo: boolean
  alerta_stock: boolean
  certificado: string | null
  imagen_url: string | null
}

const FORM_VACIO = {
  nombre_es: '',
  nombre_en: '',
  descripcion_es: '',
  descripcion_en: '',
  precio: 0,
  unidad: 'ud',
  categoria: '',
  stock: 0,
  stock_minimo: 5,
  destacado: false,
  origen: '',
  certificado: '',
  imagen_url: '',
}

export default function Productos() {
  const queryClient = useQueryClient()
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState(FORM_VACIO)
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [filtroCategoria, setFiltroCategoria] = useState('')

  const { data: productos = [], isLoading } = useQuery({
    queryKey: ['productos'],
    queryFn: async () => {
      const res = await axios.get('/productos/')
      return res.data as Producto[]
    }
  })

  const crearMutation = useMutation({
    mutationFn: (datos: typeof FORM_VACIO) => axios.post('/productos/', datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] })
      setMostrarForm(false)
      setForm(FORM_VACIO)
    }
  })

  const actualizarMutation = useMutation({
    mutationFn: ({ id, datos }: { id: number, datos: typeof FORM_VACIO }) =>
      axios.put(`/productos/${id}`, datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] })
      setMostrarForm(false)
      setEditandoId(null)
      setForm(FORM_VACIO)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editandoId) {
      actualizarMutation.mutate({ id: editandoId, datos: form })
    } else {
      crearMutation.mutate(form)
    }
  }

  const handleEditar = (p: Producto) => {
    setForm({
      nombre_es: p.nombre_es,
      nombre_en: p.nombre_en,
      descripcion_es: '',
      descripcion_en: '',
      precio: p.precio,
      unidad: p.unidad,
      categoria: p.categoria,
      stock: p.stock,
      stock_minimo: p.stock_minimo,
      destacado: p.destacado,
      origen: '',
      certificado: p.certificado || '',
      imagen_url: p.imagen_url || '',
    })
    setEditandoId(p.id)
    setMostrarForm(true)
  }

  const productosFiltrados = filtroCategoria
    ? productos.filter(p => p.categoria === filtroCategoria)
    : productos

  const categorias = [...new Set(productos.map(p => p.categoria))]
  const alertas = productos.filter(p => p.alerta_stock).length

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a]">📦 Productos</h2>
            <p className="text-slate-500 text-sm mt-1">
              {productos.length} productos · {alertas > 0 && (
                <span className="text-amber-600 font-medium">{alertas} con stock bajo</span>
              )}
            </p>
          </div>
          <button
            onClick={() => { setMostrarForm(true); setEditandoId(null); setForm(FORM_VACIO) }}
            className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                       px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            + Nuevo producto
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={() => setFiltroCategoria('')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${filtroCategoria === '' ? 'bg-[#4a7c59] text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            Todos
          </button>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setFiltroCategoria(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all
                ${filtroCategoria === cat ? 'bg-[#4a7c59] text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Formulario */}
        {mostrarForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-4">
              {editandoId ? 'Editar producto' : 'Nuevo producto'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {[
                { label: 'Nombre (ES)', key: 'nombre_es' },
                { label: 'Nombre (EN)', key: 'nombre_en' },
                { label: 'Descripción (ES)', key: 'descripcion_es' },
                { label: 'Descripción (EN)', key: 'descripcion_en' },
                { label: 'Categoría', key: 'categoria' },
                { label: 'Origen', key: 'origen' },
                { label: 'URL Imagen', key: 'imagen_url' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
                  <input
                    type="text"
                    value={form[key as keyof typeof FORM_VACIO] as string}
                    onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200
                               focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                               focus:border-[#4a7c59] text-sm"
                  />
                </div>
              ))}

              {[
                { label: 'Precio (€)', key: 'precio' },
                { label: 'Stock actual', key: 'stock' },
                { label: 'Stock mínimo', key: 'stock_minimo' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
                  <input
                    type="number"
                    value={form[key as keyof typeof FORM_VACIO] as number}
                    onChange={e => setForm(prev => ({ ...prev, [key]: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200
                               focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                               focus:border-[#4a7c59] text-sm"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Unidad</label>
                <select
                  value={form.unidad}
                  onChange={e => setForm(prev => ({ ...prev, unidad: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                             focus:border-[#4a7c59] text-sm"
                >
                  {['ud', 'kg', 'botella', 'caja', 'litro'].map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => { setMostrarForm(false); setEditandoId(null) }}
                  className="px-4 py-2 rounded-xl border border-slate-200
                             text-slate-600 text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                             px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                >
                  {editandoId ? 'Guardar cambios' : 'Crear producto'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Grid de productos */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productosFiltrados.map(p => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
                <div className={`h-1.5 ${p.alerta_stock ? 'bg-amber-400' : 'bg-[#4a7c59]'}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-slate-800 leading-snug">{p.nombre_es}</h3>
                    {p.alerta_stock && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                        Stock bajo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{p.nombre_en}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-[#4a7c59]">{p.precio}€</span>
                      <span className="text-slate-400 text-sm">/{p.unidad}</span>
                    </div>
                    <span className={`text-sm font-medium px-2 py-1 rounded-lg
                      ${p.stock <= p.stock_minimo ? 'bg-amber-50 text-amber-700' : 'bg-[#eef4f0] text-[#4a7c59]'}`}>
                      {p.stock} en stock
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs text-slate-400 capitalize">{p.categoria}</span>
                    <button
                      onClick={() => handleEditar(p)}
                      className="text-[#4a7c59] hover:underline text-sm font-medium"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}