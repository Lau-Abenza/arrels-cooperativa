import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../components/Layout'
import MapaParcela from '../components/MapaParcela'

interface Parcela {
  id: number
  nombre: string
  superficie_ha: number
  cultivo: string
  municipio: string
  provincia: string
  descripcion: string
  agricultor_id: number | null
  agricultor_nombre: string | null
  lat: number | null
  lon: number | null
}

interface ParcelaForm {
  nombre: string
  superficie_ha: number
  cultivo: string
  municipio: string
  descripcion: string
  agricultor_id: number | null
  lat: number | null
  lon: number | null
}

const FORM_VACIO: ParcelaForm = {
  nombre: '',
  superficie_ha: 0,
  cultivo: '',
  municipio: '',
  descripcion: '',
  agricultor_id: null,
  lat: null,
  lon: null,
}

export default function Parcelas() {
  const queryClient = useQueryClient()
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState<ParcelaForm>(FORM_VACIO)
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [parcelaMapaId, setParcelaMapaId] = useState<number | null>(null)

  const { data: parcelas = [], isLoading } = useQuery({
    queryKey: ['parcelas'],
    queryFn: async () => {
      const res = await axios.get('/parcelas/')
      return res.data as Parcela[]
    }
  })

  const crearMutation = useMutation({
    mutationFn: (datos: ParcelaForm) => axios.post('/parcelas/', datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parcelas'] })
      setMostrarForm(false)
      setForm(FORM_VACIO)
    }
  })

  const actualizarMutation = useMutation({
    mutationFn: ({ id, datos }: { id: number, datos: ParcelaForm }) =>
      axios.put(`/parcelas/${id}`, datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parcelas'] })
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

  const handleEditar = (p: Parcela) => {
    setForm({
      nombre: p.nombre,
      superficie_ha: p.superficie_ha,
      cultivo: p.cultivo,
      municipio: p.municipio || '',
      descripcion: p.descripcion || '',
      agricultor_id: p.agricultor_id,
      lat: p.lat,
      lon: p.lon,
    })
    setEditandoId(p.id)
    setMostrarForm(true)
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a]">🌿 Parcelas</h2>
            <p className="text-slate-500 text-sm mt-1">
              {parcelas.length} parcelas registradas
            </p>
          </div>
          <button
            onClick={() => { setMostrarForm(true); setEditandoId(null); setForm(FORM_VACIO) }}
            className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                       px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            + Nueva parcela
          </button>
        </div>

        {/* Formulario */}
        {mostrarForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-4">
              {editandoId ? 'Editar parcela' : 'Nueva parcela'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {[
                { label: 'Nombre', key: 'nombre', type: 'text' },
                { label: 'Cultivo', key: 'cultivo', type: 'text' },
                { label: 'Superficie (ha)', key: 'superficie_ha', type: 'number' },
                { label: 'Municipio', key: 'municipio', type: 'text' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={form[key as keyof ParcelaForm] as string}
                    onChange={e => setForm(prev => ({
                      ...prev,
                      [key]: type === 'number' ? parseFloat(e.target.value) : e.target.value
                    }))}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200
                               focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                               focus:border-[#4a7c59] text-sm"
                  />
                </div>
              ))}

              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Descripción
                </label>
                <textarea
                  value={form.descripcion}
                  onChange={e => setForm(prev => ({ ...prev, descripcion: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                             focus:border-[#4a7c59] text-sm resize-none"
                />
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
                  {editandoId ? 'Guardar cambios' : 'Crear parcela'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabla */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : parcelas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-4xl mb-3">🌿</p>
            <p className="text-slate-500 font-medium">No hay parcelas registradas</p>
            <p className="text-slate-400 text-sm mt-1">Crea la primera parcela con el botón de arriba</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1c2b1a] text-white text-sm">
                <tr>
                  {['Nombre', 'Cultivo', 'Superficie', 'Municipio', 'Agricultor', 'Acciones'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {parcelas.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f4f1ea]/50'}>
                    <td className="px-4 py-3 font-medium text-slate-800">{p.nombre}</td>
                    <td className="px-4 py-3 text-slate-600">{p.cultivo}</td>
                    <td className="px-4 py-3 text-slate-600">{p.superficie_ha} ha</td>
                    <td className="px-4 py-3 text-slate-600">{p.municipio || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">{p.agricultor_nombre || '—'}</td>
                    <td className="px-4 py-3 flex gap-3">
                      <button
                        onClick={() => handleEditar(p)}
                        className="text-[#4a7c59] hover:underline text-sm font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setParcelaMapaId(parcelaMapaId === p.id ? null : p.id)}
                        className="text-[#2471a3] hover:underline text-sm font-medium"
                      >
                        🗺️ Mapa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {parcelaMapaId && (() => {
          const p = parcelas.find(p => p.id === parcelaMapaId)
          if (!p) return null
          return (
            <div className="mt-4">
              <h3 className="font-semibold text-slate-700 mb-3">
                🗺️ Mapa — {p.nombre} ({p.municipio})
              </h3>
              <MapaParcela
                key={`${p.id}-${p.lat}-${p.lon}`}
                nombre={p.nombre}
                municipio={p.municipio || 'Agost'}
                lat={p.lat}
                lon={p.lon}
                editable={true}
                onUbicacionChange={(lat, lon) => {
                  console.log('Guardando coordenadas:', lat, lon, 'para parcela:', p.id)
                  axios.put(`/parcelas/${p.id}`, { lat, lon })
                    .then((res) => {
                    console.log('Respuesta:', res.data)
                    queryClient.invalidateQueries({ queryKey: ['parcelas'] })
                  })
                  .catch(err => console.error('Error:', err))
                }}
              />
            </div>
          )
        })()}
      </div>
    </Layout>
  )
}