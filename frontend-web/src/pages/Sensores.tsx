import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Layout from '../components/Layout'
import { useState } from 'react'

interface Lectura {
  device_id: string
  ts: number
  temp_aire: number | null
  hum_aire: number | null
  hum_suelo: number | null
  temp_suelo: number | null
  luz_lux: number | null
  lluvia_raw: number | null
  nivel_agua_cm: number | null
  ph_suelo: number | null
}

const SENSORES = [
  { key: 'temp_aire',    label: 'Temp. Aire',   unidad: '°C',  color: '#e07a30', min: 5,  max: 38 },
  { key: 'hum_aire',     label: 'Hum. Aire',    unidad: '%',   color: '#2471a3', min: 30, max: 90 },
  { key: 'hum_suelo',    label: 'Hum. Suelo',   unidad: '%',   color: '#4a7c59', min: 20, max: 80 },
  { key: 'temp_suelo',   label: 'Temp. Suelo',  unidad: '°C',  color: '#8b5e3c', min: 5,  max: 35 },
  { key: 'luz_lux',      label: 'Luz Solar',    unidad: ' lux',color: '#d4a017', min: 0,  max: 65000 },
  { key: 'ph_suelo',     label: 'pH Suelo',     unidad: '',    color: '#7c3aed', min: 5.5,max: 8.0 },
  { key: 'nivel_agua_cm',label: 'Nivel Agua',   unidad: ' cm', color: '#1d4ed8', min: 10, max: 100 },
]

export default function Sensores() {
  const [deviceId, setDeviceId] = useState('NODO_01')
  const [sensorActivo, setSensorActivo] = useState('temp_aire')

  const { data: lecturas = [], isLoading } = useQuery({
    queryKey: ['sensores', deviceId],
    queryFn: async () => {
      const res = await axios.get(`/api/sensores/historico/${deviceId}?limite=24`)
      return res.data as Lectura[]
    },
    refetchInterval: 30000
  })

  const ultima = lecturas[lecturas.length - 1]
  const configActiva = SENSORES.find(s => s.key === sensorActivo)!

  const getEstado = (valor: number, s: typeof SENSORES[0]) => {
    if (valor < s.min || valor > s.max) return 'alerta'
    return 'ok'
  }

  const datos = lecturas.map(l => ({
    hora: new Date(l.ts).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    valor: l[sensorActivo as keyof Lectura] as number
  }))

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a]">📡 Sensores IoT</h2>
            <p className="text-slate-500 text-sm mt-1">Monitorización en tiempo real</p>
          </div>
          <select
            value={deviceId}
            onChange={e => setDeviceId(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30"
          >
            <option value="NODO_01">Nodo 01 — Parcela La Hoya</option>
            <option value="NODO_02">Nodo 02 — Parcela Campet</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : lecturas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-4xl mb-3">📡</p>
            <p className="text-slate-500 font-medium">Sin datos de sensores</p>
            <p className="text-slate-400 text-sm mt-1">
              Conecta el ESP32 o usa el simulador Python para enviar datos
            </p>
          </div>
        ) : (
          <>
            {/* Grid tarjetas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {SENSORES.map(s => {
                const valor = ultima?.[s.key as keyof Lectura] as number | null
                const estado = valor !== null ? getEstado(valor, s) : 'ok'
                const activo = sensorActivo === s.key
                return (
                  <button
                    key={s.key}
                    onClick={() => setSensorActivo(s.key)}
                    className={`text-left bg-white rounded-2xl p-4 border transition-all
                      ${activo ? 'ring-2 shadow-md' : 'border-slate-100 hover:border-slate-200'}
                      ${estado === 'alerta' ? 'border-amber-300' : ''}`}
                    style={activo ? { ringColor: s.color, borderColor: s.color } : {}}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                      {estado === 'alerta' && (
                        <span className="text-amber-500 text-xs">⚠️</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-slate-800">
                      {valor !== null ? `${valor.toFixed(1)}${s.unidad}` : '—'}
                    </p>
                    <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
                      {valor !== null && (
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, Math.max(0, ((valor - s.min) / (s.max - s.min)) * 100))}%`,
                            backgroundColor: s.color
                          }}
                        />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Gráfica */}
            {datos.length > 1 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                <h3 className="font-semibold text-slate-700 mb-4">
                  {configActiva.label} — últimas {lecturas.length} lecturas
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={datos} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="hora" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9', fontSize: 12 }}
                      formatter={(val: number) => [`${val.toFixed(1)}${configActiva.unidad}`, configActiva.label]}
                    />
                    <Line
                      type="monotone"
                      dataKey="valor"
                      stroke={configActiva.color}
                      strokeWidth={2}
                      dot={{ fill: configActiva.color, r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}