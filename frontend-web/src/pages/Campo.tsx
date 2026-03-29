import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../components/Layout'
import { db } from '../db'
import { useSync } from '../hooks/useSync'
import { v4 as uuidv4 } from 'uuid'

interface Parcela {
  id: number
  nombre: string
  cultivo: string
  municipio: string
}

export default function Campo() {
  const { online, sincronizando, pendientes, sincronizar } = useSync()
  const [parcelaId, setParcelaId] = useState<number>(0)
  const [texto, setTexto] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const { data: parcelas = [] } = useQuery({
    queryKey: ['parcelas-campo'],
    queryFn: async () => {
      const res = await axios.get('/api/parcelas/')
      return res.data as Parcela[]
    },
    retry: false,
    staleTime: 1000 * 60 * 10 // cache 10 minutos
  })

  const guardarAnotacion = async () => {
    if (!texto || !parcelaId) return
    setGuardando(true)

    try {
      // Obtener GPS si está disponible
      let lat: number | undefined
      let lon: number | undefined
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 3000 })
        )
        lat = pos.coords.latitude
        lon = pos.coords.longitude
      } catch { /* sin GPS */ }

      // Guardar en Dexie (IndexedDB) — funciona sin internet
      await db.anotaciones.add({
        uuid: uuidv4(),
        parcela_id: parcelaId,
        texto,
        lat,
        lon,
        device_ts: new Date().toISOString(),
        synced: false
      })

      setTexto('')
      setMensaje(online ? 'Guardado. Sincronizando...' : 'Guardado localmente. Se sincronizará al conectar.')
      setTimeout(() => setMensaje(''), 3000)

      if (online) sincronizar()
    } finally {
      setGuardando(false)
    }
  }

  return (
    <Layout>
      <div className="p-4 max-w-lg mx-auto">
        {/* Estado de conexión */}
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl mb-4 text-sm font-medium
          ${online ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          <span className={`w-2 h-2 rounded-full ${online ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
          {online ? 'Conectado' : 'Sin conexión — modo offline'}
          {pendientes > 0 && (
            <span className="ml-auto bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded-full">
              {pendientes} pendiente{pendientes > 1 ? 's' : ''}
            </span>
          )}
          {sincronizando && (
            <span className="ml-auto text-xs">Sincronizando...</span>
          )}
        </div>

        {/* Header */}
        <h2 className="text-xl font-bold text-[#1c2b1a] mb-4">🌾 App de Campo</h2>

        {/* Formulario de anotación */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4 border border-slate-100">
          <h3 className="font-semibold text-slate-700 mb-4">Nueva anotación</h3>

          <div className="mb-3">
            <label className="block text-sm font-medium text-slate-600 mb-1">Parcela</label>
            <select
              value={parcelaId}
              onChange={e => setParcelaId(parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200
                         focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                         focus:border-[#4a7c59] text-sm"
            >
              <option value={0}>Seleccionar parcela...</option>
              {parcelas.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombre} — {p.cultivo}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-1">Anotación</label>
            <textarea
              value={texto}
              onChange={e => setTexto(e.target.value)}
              rows={4}
              placeholder="Describe lo que observas en la parcela..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200
                         focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                         focus:border-[#4a7c59] text-sm resize-none"
            />
          </div>

          {mensaje && (
            <div className="bg-[#eef4f0] text-[#4a7c59] text-sm px-4 py-2.5 rounded-xl mb-3">
              {mensaje}
            </div>
          )}

          <button
            onClick={guardarAnotacion}
            disabled={!texto || !parcelaId || guardando}
            className="w-full bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                       py-3 rounded-xl font-semibold transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {guardando ? 'Guardando...' : '💾 Guardar anotación'}
          </button>
        </div>

        {/* Botón sync manual */}
        {pendientes > 0 && online && (
          <button
            onClick={sincronizar}
            disabled={sincronizando}
            className="w-full bg-[#e07a30] hover:bg-[#c96a20] text-white
                       py-3 rounded-xl font-semibold transition-colors
                       disabled:opacity-50 mb-4"
          >
            🔄 Sincronizar {pendientes} anotación{pendientes > 1 ? 'es' : ''} ahora
          </button>
        )}

        {/* Info offline */}
        <div className="bg-[#1c2b1a] rounded-2xl p-4 text-sm text-[#8ab89a]">
          <p className="font-semibold text-white mb-1">📱 Funciona sin internet</p>
          <p>Las anotaciones se guardan en tu dispositivo y se sincronizan automáticamente cuando vuelves a tener conexión.</p>
        </div>
      </div>
    </Layout>
  )
}