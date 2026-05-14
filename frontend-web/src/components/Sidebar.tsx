import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

interface NavItem {
  label: string
  icon: string
  path: string
  roles: string[]
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',        icon: '📊', path: '/dashboard',    roles: ['admin','director','trabajador','ingeniero','socio'] },
  { label: 'Parcelas',         icon: '🌿', path: '/parcelas',     roles: ['admin','director','ingeniero','trabajador'] },
  { label: 'Mi Parcela',       icon: '🗺️', path: '/parcelas',     roles: ['socio'] },
  { label: 'Productos',        icon: '📦', path: '/productos',    roles: ['admin','trabajador','director'] },
  { label: 'Ventas',           icon: '🛒', path: '/ventas',       roles: ['admin','trabajador','director'] },
  { label: 'Mis Compras',      icon: '🛒', path: '/ventas',       roles: ['socio'] },
  { label: 'Alquileres',       icon: '🚜', path: '/alquileres',   roles: ['admin','trabajador','director','socio'] },
  { label: 'Fichajes',         icon: '⏱',  path: '/fichajes',     roles: ['admin','trabajador','director'] },
  { label: 'Aportaciones',     icon: '⚖️', path: '/aportaciones', roles: ['admin','trabajador','director','socio'] },
  { label: 'Sensores IoT',     icon: '📡', path: '/sensores',     roles: ['admin','ingeniero','director','socio'] },
  { label: 'Mensajes',         icon: '💬', path: '/mensajes',     roles: ['admin','ingeniero','socio'] },
  { label: 'Planes de Acción', icon: '📋', path: '/planes_accion',roles: ['admin','ingeniero','socio'] },
  { label: 'Usuarios',         icon: '👥', path: '/usuarios',     roles: ['admin'] },
  { label: 'App de Campo',     icon: '🌾', path: '/campo',        roles: ['admin','ingeniero','socio','trabajador'] },
]

export default function Sidebar() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [abierto, setAbierto] = useState(false)

  const itemsFiltrados = NAV_ITEMS.filter(item =>
    item.roles.includes(usuario?.rol || '')
  )

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const irA = (path: string) => {
    navigate(path)
    setAbierto(false)
  }

  return (
    <>
      {/* Botón hamburguesa — solo móvil */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#1c2b1a] text-white p-2 rounded-xl shadow-lg"
      >
        <div className="flex flex-col gap-1.5 w-5">
          <span className={`block h-0.5 bg-white transition-all ${abierto ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 bg-white transition-all ${abierto ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-white transition-all ${abierto ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Overlay oscuro cuando está abierto en móvil */}
      {abierto && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setAbierto(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 min-h-screen bg-[#1c2b1a] flex flex-col flex-shrink-0
        transition-transform duration-300
        ${abierto ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-[#2d4a1e] flex items-center justify-center">
          <img
            src="/arrels-logo-mono-clara.png"
            alt="Arrels Cooperativa Agrícola"
            className="h-16 w-auto"
          />
        </div>

        {/* Usuario */}
        <div className="px-6 py-4 border-b border-[#2d4a1e]">
          <p className="text-white text-sm font-medium truncate">{usuario?.nombre}</p>
          <span className="inline-block mt-1 text-xs bg-[#2d4a1e] text-[#8ab89a] px-2 py-0.5 rounded-full">
            {usuario?.rol}
          </span>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {itemsFiltrados.map(item => {
            const activo = location.pathname === item.path
            return (
              <button
                key={item.label}
                onClick={() => irA(item.path)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-sm font-medium transition-all text-left
                  ${activo
                    ? 'bg-[#4a7c59] text-white'
                    : 'text-[#8ab89a] hover:bg-[#2d4a1e] hover:text-white'
                  }
                `}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Salir */}
        <div className="px-3 py-4 border-t border-[#2d4a1e]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                       text-sm font-medium text-[#8ab89a] hover:bg-[#2d4a1e]
                       hover:text-white transition-all"
          >
            <span>🚪</span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}