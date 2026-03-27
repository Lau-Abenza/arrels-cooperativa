import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const rolColor: Record<string, string> = {
    admin:       'bg-red-100 text-red-700',
    director:    'bg-purple-100 text-purple-700',
    trabajador:  'bg-blue-100 text-blue-700',
    ingeniero:   'bg-green-100 text-green-700',
    socio:       'bg-amber-100 text-amber-700',
    usuario_web: 'bg-slate-100 text-slate-700',
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      {/* Header */}
      <header className="bg-[#1c2b1a] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-[#4a7c59]">ARRELS</h1>
          <span className="text-[#6b8c5e] text-sm">Cooperativa Agrícola</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#8ab89a]">
            {usuario?.nombre}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${rolColor[usuario?.rol || ''] || 'bg-slate-100 text-slate-700'}`}>
            {usuario?.rol}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-[#8ab89a] hover:text-white transition-colors"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-[#1c2b1a] mb-6">
          Bienvenida, {usuario?.nombre?.split(' ')[0]} 👋
        </h2>

        {/* KPI cards placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Parcelas', valor: '—', color: 'bg-[#4a7c59]' },
            { label: 'Productos', valor: '—', color: 'bg-[#2471a3]' },
            { label: 'Ventas hoy', valor: '—', color: 'bg-[#e07a30]' },
            { label: 'Alertas', valor: '—', color: 'bg-[#c0392b]' },
          ].map(({ label, valor, color }) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className={`${color} h-1.5`} />
              <div className="p-5">
                <p className="text-sm text-slate-500 font-medium">{label}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{valor}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Módulos disponibles según rol */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-slate-700 mb-4">Módulos disponibles</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: '🌿 Parcelas', roles: ['admin','director','ingeniero','trabajador'] },
              { label: '🛒 Tienda', roles: ['admin','trabajador'] },
              { label: '🚜 Alquileres', roles: ['admin','trabajador','socio'] },
              { label: '⏱ Fichajes', roles: ['admin','trabajador'] },
              { label: '⚖️ Aportaciones', roles: ['admin','trabajador','director'] },
              { label: '📡 Sensores IoT', roles: ['admin','ingeniero','director'] },
            ]
            .filter(m => m.roles.includes(usuario?.rol || ''))
            .map(({ label }) => (
              <button
                key={label}
                className="text-left px-4 py-3 rounded-xl border border-slate-200
                           hover:border-[#4a7c59] hover:bg-[#eef4f0]
                           transition-all text-sm font-medium text-slate-700"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}