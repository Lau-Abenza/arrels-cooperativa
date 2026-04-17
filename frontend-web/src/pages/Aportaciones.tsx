import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../components/Layout'

interface Aportacion {
  id: number
  socio_id: number
  socio_nombre: string
  trabajador_nombre: string
  producto: string
  kg: number
  precio_kg: number | null
  total: number | null
  fecha: string
  notas: string | null
}

export default function Aportaciones() {
  const queryClient = useQueryClient()
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState({
    socio_id: '',
    producto: '',
    kg: '',
    precio_kg: '',
    notas: ''
  })

  const { data: aportaciones = [], isLoading } = useQuery({
    queryKey: ['aportaciones'],
    queryFn: async () => {
      const res = await axios.get('/aportaciones/')
      return res.data as Aportacion[]
    }
  })

  const crearMutation = useMutation({
    mutationFn: () => axios.post('/aportaciones/', {
      socio_id: parseInt(form.socio_id),
      producto: form.producto,
      kg: parseFloat(form.kg),
      precio_kg: form.precio_kg ? parseFloat(form.precio_kg) : null,
      notas: form.notas || null
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aportaciones'] })
      setMostrarForm(false)
      setForm({ socio_id: '', producto: '', kg: '', precio_kg: '', notas: '' })
    }
  })

  const totalKg = aportaciones.reduce((acc, a) => acc + a.kg, 0)
  const totalEuros = aportaciones.reduce((acc, a) => acc + (a.total || 0), 0)

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a]">⚖️ Aportaciones</h2>
            <p className="text-slate-500 text-sm mt-1">
              Registro de pesos y productos de socios
            </p>
          </div>
          <button
            onClick={() => setMostrarForm(true)}
            className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                       px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            + Registrar aportación
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-5 overflow-hidden border border-slate-100">
            <div className="bg-[#4a7c59] h-1.5 -mx-5 -mt-5 mb-4 rounded-t-2xl" />
            <p className="text-sm text-slate-500">Total kg registrados</p>
            <p className="text-3xl font-bold text-slate-800">{totalKg.toFixed(1)} kg</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 overflow-hidden border border-slate-100">
            <div className="bg-[#e07a30] h-1.5 -mx-5 -mt-5 mb-4 rounded-t-2xl" />
            <p className="text-sm text-slate-500">Total liquidaciones</p>
            <p className="text-3xl font-bold text-slate-800">{totalEuros.toFixed(2)}€</p>
          </div>
        </div>

        {/* Formulario */}
        {mostrarForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-4">Registrar aportación</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'ID Socio', key: 'socio_id', type: 'number', placeholder: 'ID del socio' },
                { label: 'Producto', key: 'producto', type: 'text', placeholder: 'Ej: Almendras Marcona' },
                { label: 'Kilogramos', key: 'kg', type: 'number', placeholder: '0.0' },
                { label: 'Precio/kg (€)', key: 'precio_kg', type: 'number', placeholder: 'Opcional' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200
                               focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                               focus:border-[#4a7c59] text-sm"
                  />
                </div>
              ))}

              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-1">Notas</label>
                <input
                  type="text"
                  value={form.notas}
                  onChange={e => setForm(prev => ({ ...prev, notas: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                             focus:border-[#4a7c59] text-sm"
                />
              </div>

              {form.kg && form.precio_kg && (
                <div className="col-span-2 bg-[#eef4f0] rounded-xl px-4 py-3">
                  <span className="text-slate-600 text-sm">Total: </span>
                  <span className="font-bold text-[#4a7c59] text-lg">
                    {(parseFloat(form.kg) * parseFloat(form.precio_kg)).toFixed(2)}€
                  </span>
                </div>
              )}
            </div>

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
                disabled={!form.socio_id || !form.producto || !form.kg}
                className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                           px-4 py-2 rounded-xl text-sm font-semibold transition-colors
                           disabled:opacity-50"
              >
                Registrar
              </button>
            </div>
          </div>
        )}

        {/* Tabla */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : aportaciones.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-4xl mb-3">⚖️</p>
            <p className="text-slate-500 font-medium">No hay aportaciones registradas</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1c2b1a] text-white text-sm">
                <tr>
                  {['Socio', 'Producto', 'Kg', 'Precio/kg', 'Total', 'Fecha', 'Notas'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {aportaciones.map((a, i) => (
                  <tr key={a.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f4f1ea]/50'}>
                    <td className="px-4 py-3 font-medium text-slate-800">{a.socio_nombre}</td>
                    <td className="px-4 py-3 text-slate-600">{a.producto}</td>
                    <td className="px-4 py-3 text-slate-600">{a.kg} kg</td>
                    <td className="px-4 py-3 text-slate-600">{a.precio_kg ? `${a.precio_kg}€` : '—'}</td>
                    <td className="px-4 py-3 font-semibold text-[#4a7c59]">{a.total ? `${a.total}€` : '—'}</td>
                    <td className="px-4 py-3 text-slate-500 text-sm">
                      {new Date(a.fecha).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">{a.notas || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  )
}