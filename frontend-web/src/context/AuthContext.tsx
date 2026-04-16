import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

interface Usuario {
  nombre: string
  email: string
  rol: string
  id?: number
}

interface AuthContextType {
  usuario: Usuario | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  cargando: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const tokenGuardado = localStorage.getItem('arrels_token')
    const usuarioGuardado = localStorage.getItem('arrels_usuario')
    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado)
      setUsuario(JSON.parse(usuarioGuardado))
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenGuardado}`
    }
    setCargando(false)
  }, [])

  const login = async (email: string, password: string) => {
    const res = await axios.post(`/auth/login`, { email, password })
    const { access_token, nombre, rol } = res.data
    const usuarioData = { nombre, email, rol }
    setToken(access_token)
    setUsuario(usuarioData)
    localStorage.setItem('arrels_token', access_token)
    localStorage.setItem('arrels_usuario', JSON.stringify(usuarioData))
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
  }

  const logout = () => {
    setToken(null)
    setUsuario(null)
    localStorage.removeItem('arrels_token')
    localStorage.removeItem('arrels_usuario')
    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}