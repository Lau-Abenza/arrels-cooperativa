import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../components/Layout'

interface PlanAccion {
  id: number
  socio_id: number
  socio_nombre: string
  ingeniero_nombre: string
  titulo: string
  descripcion: string
  estado: string
  fecha: string
}

export default function PlanesAccion() {
  const queryClient = useQueryClient()
  const [socioId, setSocioId] = useState<number | ''>('')
  const [buscando, setBuscando] = useState<number | null>(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState({ socio_id: '', titulo: '', descripcion: '' })

  const { data: planes = [], isLoading } = useQuery({
    queryKey: ['planes', buscando],
    queryFn: async () => {
      if (!buscando) return []
      const res = await axios.get(`/api/planes-accion/socio/${buscando}`)
      return res.data as PlanAccion[]
    },
    enabled: !!buscando
  })

  const crearMutation = useMutation({
    mutationFn: () => axios.post('/api/planes-accion/', {
      socio_id: parseInt(form.socio_id),
      titulo: form.titulo,
      descripcion: form.descripcion
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planes'] })
      setMostrarForm(false)
      setForm({ socio_id: '', titulo: '', descripcion: '' })
      if (form.socio_id) setBuscando(parseInt(form.socio_id))
    }
  })

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a]">📋 Planes de Acción</h2>
            <p className="text-slate-500 text-sm mt-1">Gestión de planes personalizados por socio</p>
          </div>
          <button
            onClick={() => setMostrarForm(true)}
            className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                       px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            + Nuevo plan
          </button>
        </div>

        {/* Buscar por socio */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4 border border-slate-100">
          <div className="flex gap-3">
            <input
              type="number"
              value={socioId}
              onChange={e => setSocioId(e.target.value ? parseInt(e.target.value) : '')}
              placeholder="ID del socio..."
              className="flex-1 max-w-xs px-3 py-2 rounded-xl border border-slate-200
                         focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 text-sm"
            />
            <button
              onClick={() => socioId && setBuscando(socioId as number)}
              disabled={!socioId}
              className="bg-[#2471a3] hover:bg-[#1a5a8a] text-white
                         px-4 py-2 rounded-xl text-sm font-semibold transition-colors
                         disabled:opacity-50"
            >
              Ver planes
            </button>
          </div>
        </div>

        {/* Formulario */}
        {mostrarForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-4">Nuevo plan de acción</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">ID Socio</label>
                <input
                  type="number"
                  value={form.socio_id}
                  onChange={e => setForm(prev => ({ ...prev, socio_id: e.target.value }))}
                  className="w-full max-w-xs px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Título</label>
                <input
                  type="text"
                  value={form.titulo}
                  onChange={e => setForm(prev => ({ ...prev, titulo: e.target.value }))}
                  placeholder="Ej: Plan de poda primavera 2025"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={e => setForm(prev => ({ ...prev, descripcion: e.target.value }))}
                  rows={4}
                  placeholder="Instrucciones detalladas para el agricultor..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 text-sm resize-none"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setMostrarForm(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200
                             text-slate-600 text-sm hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => crearMutation.mutate()}
                  disabled={!form.socio_id || !form.titulo || !form.descripcion}
                  className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                             px-4 py-2 rounded-xl text-sm font-semibold transition-colors
                             disabled:opacity-50"
                >
                  Crear plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista planes */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : planes.length > 0 ? (
          <div className="space-y-3">
            {planes.map(p => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm p-5 border border-slate-100">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-800">{p.titulo}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {p.socio_nombre} · {p.ingeniero_nombre} · {new Date(p.fecha).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full
                    ${p.estado === 'activo' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {p.estado}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{p.descripcion}</p>
              </div>
            ))}
          </div>
        ) : buscando ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-slate-500">No hay planes para este socio</p>
          </div>
        ) : null}
      </div>
    </Layout>
  )
}