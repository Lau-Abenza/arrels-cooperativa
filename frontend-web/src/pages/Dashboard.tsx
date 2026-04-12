import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout'

export default function Dashboard() {
  const { usuario } = useAuth()

  const rolColor: Record<string, string> = {
    admin:       'bg-red-100 text-red-700',
    director:    'bg-purple-100 text-purple-700',
    trabajador:  'bg-blue-100 text-blue-700',
    ingeniero:   'bg-green-100 text-green-700',
    socio:       'bg-amber-100 text-amber-700',
    usuario_web: 'bg-slate-100 text-slate-700',
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a]">
              Bienvenid@, {usuario?.nombre?.split(' ')[0]} 👋
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Panel de control · Arrels Cooperativa
            </p>
          </div>
          <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${rolColor[usuario?.rol || '']}`}>
            {usuario?.rol}
          </span>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Parcelas',    valor: '—', color: 'bg-[#4a7c59]' },
            { label: 'Productos',   valor: '—', color: 'bg-[#2471a3]' },
            { label: 'Ventas hoy', valor: '—', color: 'bg-[#e07a30]' },
            { label: 'Alertas',    valor: '—', color: 'bg-[#c0392b]' },
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

        {/* Actividad reciente placeholder */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-slate-700 mb-4">Actividad reciente</h3>
          <p className="text-slate-400 text-sm">
            Los datos se cargarán aquí cuando conectemos los módulos.
          </p>
        </div>
      </div>
    </Layout>
  )
}