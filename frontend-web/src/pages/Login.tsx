import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch {
      setError('Email o contraseña incorrectos')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1c2b1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#4a7c59] tracking-tight">
            ARRELS
          </h1>
          <p className="text-[#8ab89a] mt-1 text-sm">
            Cooperativa Agrícola Digital
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#f4f1ea] rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-[#1c2b1a] mb-6">
            Acceder al sistema
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#334155] mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200
                           bg-white text-slate-800 placeholder-slate-400
                           focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40
                           focus:border-[#4a7c59] transition-all"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#334155] mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200
                           bg-white text-slate-800 placeholder-slate-400
                           focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40
                           focus:border-[#4a7c59] transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3
                              text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                         font-semibold py-3 rounded-xl transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cargando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p className="text-center text-[#6b8c5e] text-xs mt-6">
          Arrels © 2025 · Cooperativa Agrícola Digital
        </p>
      </div>
    </div>
  )
}