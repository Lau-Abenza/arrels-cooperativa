import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../components/Layout'

interface Fichaje {
  id: number
  usuario_id: number
  usuario_nombre: string
  tipo: string
  timestamp: string
  lat: number | null
  lon: number | null
  notas: string | null
}

export default function Fichajes() {
  const queryClient = useQueryClient()
  const [notas, setNotas] = useState('')

  const { data: fichajes = [], isLoading } = useQuery({
    queryKey: ['fichajes-hoy'],
    queryFn: async () => {
      const res = await axios.get('/api/fichajes/hoy')
      return res.data as Fichaje[]
    },
    refetchInterval: 30000 // refresca cada 30 segundos
  })

  const ficharMutation = useMutation({
    mutationFn: (tipo: 'entrada' | 'salida') => axios.post('/api/fichajes/', {
      tipo,
      notas: notas || null
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fichajes-hoy'] })
      setNotas('')
    }
  })

  const ultimoFichaje = fichajes[0]
  const puedeEntrar = !ultimoFichaje || ultimoFichaje.tipo === 'salida'
  const puedeSalir = ultimoFichaje?.tipo === 'entrada'

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1c2b1a]">⏱ Fichajes</h2>
          <p className="text-slate-500 text-sm mt-1">
            Registro de entrada y salida del personal
          </p>
        </div>

        {/* Panel de fichaje rápido */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-slate-100">
          <h3 className="font-semibold text-slate-700 mb-4">Fichar ahora</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Notas (opcional)
            </label>
            <input
              type="text"
              value={notas}
              onChange={e => setNotas(e.target.value)}
              placeholder="Observaciones del fichaje..."
              className="w-full max-w-md px-3 py-2 rounded-xl border border-slate-200
                         focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                         focus:border-[#4a7c59] text-sm"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => ficharMutation.mutate('entrada')}
              disabled={!puedeEntrar || ficharMutation.isPending}
              className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                         px-6 py-3 rounded-xl font-semibold transition-colors
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ✅ Registrar entrada
            </button>
            <button
              onClick={() => ficharMutation.mutate('salida')}
              disabled={!puedeSalir || ficharMutation.isPending}
              className="bg-[#c0392b] hover:bg-[#a93226] text-white
                         px-6 py-3 rounded-xl font-semibold transition-colors
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              🚪 Registrar salida
            </button>
          </div>

          {ultimoFichaje && (
            <p className="text-sm text-slate-500 mt-3">
              Último fichaje: <span className="font-medium capitalize">{ultimoFichaje.tipo}</span>
              {' '}a las {new Date(ultimoFichaje.timestamp).toLocaleTimeString('es-ES')}
            </p>
          )}
        </div>

        {/* Lista de fichajes de hoy */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700">Fichajes de hoy</h3>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : fichajes.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p className="text-3xl mb-2">⏱</p>
              <p>No hay fichajes registrados hoy</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-[#f4f1ea] text-sm text-slate-600">
                <tr>
                  {['Trabajador', 'Tipo', 'Hora', 'Notas'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fichajes.map(f => (
                  <tr key={f.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{f.usuario_nombre}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                        ${f.tipo === 'entrada'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        }`}>
                        {f.tipo === 'entrada' ? '✅ Entrada' : '🚪 Salida'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-sm">
                      {new Date(f.timestamp).toLocaleTimeString('es-ES')}
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-sm">{f.notas || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  )
}