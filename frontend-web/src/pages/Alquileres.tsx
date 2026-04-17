import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../components/Layout'

interface Apero {
  id: number
  nombre: string
  tipo: string
  descripcion: string | null
  precio_dia: number
  disponible: boolean
}

interface Alquiler {
  id: number
  apero_id: number
  apero_nombre: string
  socio_id: number
  socio_nombre: string
  trabajador_nombre: string
  fecha_inicio: string
  fecha_fin: string
  precio_total: number
  estado: string
  observaciones: string | null
}

export default function Alquileres() {
  const queryClient = useQueryClient()
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState({
    apero_id: 0,
    socio_id: '',
    fecha_inicio: '',
    fecha_fin: '',
    observaciones: ''
  })

  const { data: aperos = [] } = useQuery({
    queryKey: ['aperos'],
    queryFn: async () => {
      const res = await axios.get('/alquileres/aperos')
      return res.data as Apero[]
    }
  })

  const { data: alquileres = [], isLoading } = useQuery({
    queryKey: ['alquileres'],
    queryFn: async () => {
      const res = await axios.get('/alquileres/')
      return res.data as Alquiler[]
    }
  })

  const crearMutation = useMutation({
    mutationFn: () => axios.post('/alquileres/', {
      apero_id: form.apero_id,
      socio_id: parseInt(form.socio_id),
      fecha_inicio: new Date(form.fecha_inicio).toISOString(),
      fecha_fin: new Date(form.fecha_fin).toISOString(),
      observaciones: form.observaciones || null
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alquileres'] })
      queryClient.invalidateQueries({ queryKey: ['aperos'] })
      setMostrarForm(false)
      setForm({ apero_id: 0, socio_id: '', fecha_inicio: '', fecha_fin: '', observaciones: '' })
    }
  })

  const devolverMutation = useMutation({
    mutationFn: (id: number) => axios.put(`/api/alquileres/${id}/devolver`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alquileres'] })
      queryClient.invalidateQueries({ queryKey: ['aperos'] })
    }
  })

  const aperoSeleccionado = aperos.find(a => a.id === form.apero_id)
  const dias = form.fecha_inicio && form.fecha_fin
    ? Math.max(0, Math.round((new Date(form.fecha_fin).getTime() - new Date(form.fecha_inicio).getTime()) / 86400000))
    : 0
  const precioEstimado = aperoSeleccionado ? aperoSeleccionado.precio_dia * dias : 0

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a]">🚜 Alquileres</h2>
            <p className="text-slate-500 text-sm mt-1">
              {aperos.filter(a => a.disponible).length} aperos disponibles
            </p>
          </div>
          <button
            onClick={() => setMostrarForm(true)}
            className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                       px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            + Nuevo alquiler
          </button>
        </div>

        {/* Catálogo de aperos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {aperos.map(a => (
            <div key={a.id} className={`bg-white rounded-xl p-4 border
              ${a.disponible ? 'border-green-200' : 'border-slate-200 opacity-60'}`}>
              <p className="font-semibold text-slate-800 text-sm">{a.nombre}</p>
              <p className="text-xs text-slate-400 capitalize">{a.tipo}</p>
              <p className="text-[#4a7c59] font-bold mt-2">{a.precio_dia}€/día</p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block
                ${a.disponible ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                {a.disponible ? 'Disponible' : 'Alquilado'}
              </span>
            </div>
          ))}
        </div>

        {/* Formulario */}
        {mostrarForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-4">Nuevo alquiler</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Apero</label>
                <select
                  value={form.apero_id}
                  onChange={e => setForm(prev => ({ ...prev, apero_id: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 text-sm"
                >
                  <option value={0}>Seleccionar apero...</option>
                  {aperos.filter(a => a.disponible).map(a => (
                    <option key={a.id} value={a.id}>
                      {a.nombre} — {a.precio_dia}€/día
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">ID Socio</label>
                <input
                  type="number"
                  value={form.socio_id}
                  onChange={e => setForm(prev => ({ ...prev, socio_id: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Fecha inicio</label>
                <input
                  type="datetime-local"
                  value={form.fecha_inicio}
                  onChange={e => setForm(prev => ({ ...prev, fecha_inicio: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Fecha fin</label>
                <input
                  type="datetime-local"
                  value={form.fecha_fin}
                  onChange={e => setForm(prev => ({ ...prev, fecha_fin: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 text-sm"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-1">Observaciones</label>
                <input
                  type="text"
                  value={form.observaciones}
                  onChange={e => setForm(prev => ({ ...prev, observaciones: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 text-sm"
                />
              </div>
            </div>

            {precioEstimado > 0 && (
              <div className="bg-[#eef4f0] rounded-xl px-4 py-3 mt-4">
                <span className="text-slate-600 text-sm">{dias} días · Total estimado: </span>
                <span className="font-bold text-[#4a7c59] text-lg">{precioEstimado.toFixed(2)}€</span>
              </div>
            )}

            <div className="flex gap-3 justify-end mt-4">
              <button
                onClick={() => setMostrarForm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200
                           text-slate-600 text-sm hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => crearMutation.mutate()}
                disabled={!form.apero_id || !form.socio_id || !form.fecha_inicio || !form.fecha_fin}
                className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                           px-4 py-2 rounded-xl text-sm font-semibold transition-colors
                           disabled:opacity-50"
              >
                Confirmar alquiler
              </button>
            </div>
          </div>
        )}

        {/* Lista alquileres */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {alquileres.map(a => (
              <div key={a.id} className="bg-white rounded-2xl shadow-sm p-5 border border-slate-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">
                      {a.apero_nombre}
                      <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full
                        ${a.estado === 'activo' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {a.estado}
                      </span>
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {a.socio_nombre} · {new Date(a.fecha_inicio).toLocaleDateString('es-ES')} → {new Date(a.fecha_fin).toLocaleDateString('es-ES')}
                    </p>
                    {a.observaciones && (
                      <p className="text-xs text-slate-400 mt-1">{a.observaciones}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#4a7c59]">{a.precio_total}€</p>
                    {a.estado === 'activo' && (
                      <button
                        onClick={() => devolverMutation.mutate(a.id)}
                        className="text-xs text-[#c0392b] hover:underline mt-1"
                      >
                        Registrar devolución
                      </button>
                    )}
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