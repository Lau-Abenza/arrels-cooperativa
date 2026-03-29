import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

interface NavItem {
  label: string
  icon: string
  path: string
  roles: string[]
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',    icon: '📊', path: '/dashboard',    roles: ['admin','director','trabajador','ingeniero','socio'] },
  { label: 'Parcelas',     icon: '🌿', path: '/parcelas',     roles: ['admin','director','ingeniero','trabajador'] },
  { label: 'Productos',    icon: '📦', path: '/productos',    roles: ['admin','trabajador','director'] },
  { label: 'Ventas',       icon: '🛒', path: '/ventas',       roles: ['admin','trabajador','director'] },
  { label: 'Alquileres',   icon: '🚜', path: '/alquileres',   roles: ['admin','trabajador','director'] },
  { label: 'Fichajes',     icon: '⏱',  path: '/fichajes',     roles: ['admin','trabajador','director'] },
  { label: 'Aportaciones', icon: '⚖️', path: '/aportaciones', roles: ['admin','trabajador','director'] },
  { label: 'Sensores IoT', icon: '📡', path: '/sensores',     roles: ['admin','ingeniero','director'] },
  { label: 'Mensajes',     icon: '💬', path: '/mensajes',     roles: ['admin','ingeniero','socio'] },
  { label: 'Planes de Acción', icon: '📋', path: '/planes_accion', roles: ['admin','ingeniero'] },
  { label: 'Usuarios',     icon: '👥', path: '/usuarios',     roles: ['admin'] },
]

export default function Sidebar() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const itemsFiltrados = NAV_ITEMS.filter(item =>
    item.roles.includes(usuario?.rol || '')
  )

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-[#1c2b1a] flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#2d4a1e]">
        <h1 className="text-xl font-bold text-[#4a7c59] tracking-tight">ARRELS</h1>
        <p className="text-[#6b8c5e] text-xs mt-0.5">Cooperativa Agrícola</p>
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
              key={item.path}
              onClick={() => navigate(item.path)}
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
  )
}