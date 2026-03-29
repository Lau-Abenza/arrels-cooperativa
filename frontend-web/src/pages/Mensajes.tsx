import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

interface Mensaje {
  id: number
  de_id: number
  de_nombre: string
  para_id: number
  para_nombre: string
  texto: string
  leido: boolean
  fecha: string
}

export default function Mensajes() {
  const { usuario } = useAuth()
  const queryClient = useQueryClient()
  const [otroId, setOtroId] = useState<number | ''>('')
  const [texto, setTexto] = useState('')
  const [conversacionActiva, setConversacionActiva] = useState<number | null>(null)

  const { data: mensajes = [] } = useQuery({
    queryKey: ['mensajes', conversacionActiva],
    queryFn: async () => {
      if (!conversacionActiva) return []
      const res = await axios.get(`/api/mensajes/conversacion/${conversacionActiva}`)
      return res.data as Mensaje[]
    },
    enabled: !!conversacionActiva,
    refetchInterval: 10000
  })

  const enviarMutation = useMutation({
    mutationFn: () => axios.post('/api/mensajes/', {
      para_id: conversacionActiva,
      texto
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mensajes', conversacionActiva] })
      setTexto('')
    }
  })

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#1c2b1a] mb-6">💬 Mensajes</h2>

        {/* Selector de conversación */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4 border border-slate-100">
          <div className="flex gap-3">
            <input
              type="number"
              value={otroId}
              onChange={e => setOtroId(e.target.value ? parseInt(e.target.value) : '')}
              placeholder="ID del usuario con quien hablar..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200
                         focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 text-sm"
            />
            <button
              onClick={() => otroId && setConversacionActiva(otroId as number)}
              disabled={!otroId}
              className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                         px-4 py-2 rounded-xl text-sm font-semibold transition-colors
                         disabled:opacity-50"
            >
              Abrir conversación
            </button>
          </div>
        </div>

        {/* Conversación */}
        {conversacionActiva && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-[#1c2b1a] px-5 py-3">
              <p className="text-white text-sm font-medium">
                Conversación con usuario #{conversacionActiva}
              </p>
            </div>

            {/* Mensajes */}
            <div className="p-4 space-y-3 min-h-64 max-h-96 overflow-y-auto">
              {mensajes.length === 0 ? (
                <p className="text-center text-slate-400 text-sm py-8">
                  No hay mensajes aún. ¡Empieza la conversación!
                </p>
              ) : (
                mensajes.map(m => {
                  const esMio = m.de_nombre === usuario?.nombre
                  return (
                    <div key={m.id} className={`flex ${esMio ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm
                        ${esMio
                          ? 'bg-[#4a7c59] text-white rounded-br-sm'
                          : 'bg-[#f4f1ea] text-slate-800 rounded-bl-sm'
                        }`}>
                        <p>{m.texto}</p>
                        <p className={`text-xs mt-1 ${esMio ? 'text-green-200' : 'text-slate-400'}`}>
                          {new Date(m.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Input enviar */}
            <div className="border-t border-slate-100 p-4 flex gap-3">
              <input
                type="text"
                value={texto}
                onChange={e => setTexto(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && texto && enviarMutation.mutate()}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200
                           focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 text-sm"
              />
              <button
                onClick={() => enviarMutation.mutate()}
                disabled={!texto}
                className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                           px-4 py-2 rounded-xl text-sm font-semibold transition-colors
                           disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}