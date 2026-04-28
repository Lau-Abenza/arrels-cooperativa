import { useAuth } from '../context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/Layout'
import MapaParcela from '../components/MapaParcela'

export default function Dashboard() {
  const { usuario } = useAuth()
  const navigate = useNavigate()

  const rolColor: Record<string, string> = {
    admin:       'bg-red-100 text-red-700',
    director:    'bg-purple-100 text-purple-700',
    trabajador:  'bg-blue-100 text-blue-700',
    ingeniero:   'bg-green-100 text-green-700',
    socio:       'bg-amber-100 text-amber-700',
    usuario_web: 'bg-slate-100 text-slate-700',
  }

  // Cargar parcela del socio
  const { data: parcelas = [] } = useQuery({
    queryKey: ['parcelas'],
    queryFn: async () => {
      const res = await axios.get('/parcelas/')
      return res.data as any[]
    },
    enabled: usuario?.rol === 'socio'
  })

  const miParcela = parcelas.find((p: any) => p.agricultor_id === usuario?.id)

  // Vista socio
  if (usuario?.rol === 'socio') {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1c2b1a]">
                Bienvenid@, {usuario?.nombre?.split(' ')[0]} 👋
              </h2>
              <p className="text-slate-500 text-sm mt-1">Tu espacio personal en Arrels Cooperativa</p>
            </div>
            <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${rolColor['socio']}`}>
              socio
            </span>
          </div>

          {miParcela ? (
            <div className="space-y-6">
              {/* Info parcela */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                <h3 className="font-bold text-slate-800 text-xl mb-4">🌿 {miParcela.nombre}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Cultivo', valor: miParcela.cultivo },
                    { label: 'Superficie', valor: `${miParcela.superficie_ha} ha` },
                    { label: 'Municipio', valor: miParcela.municipio || '—' },
                    { label: 'Provincia', valor: miParcela.provincia || '—' },
                  ].map(({ label, valor }) => (
                    <div key={label} className="bg-[#f4f1ea] rounded-xl p-4">
                      <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
                      <p className="font-bold text-slate-800">{valor}</p>
                    </div>
                  ))}
                </div>
                {miParcela.descripcion && (
                  <p className="text-slate-500 text-sm leading-relaxed">{miParcela.descripcion}</p>
                )}
              </div>

              {/* Mapa */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">🗺️ Ubicación de tu parcela</h3>
                <MapaParcela
                  nombre={miParcela.nombre}
                  municipio={miParcela.municipio || 'Agost'}
                  lat={miParcela.lat}
                  lon={miParcela.lon}
                  editable={false}
                />
              </div>

              {/* Accesos rápidos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Mis Mensajes', icon: '💬', path: '/mensajes', color: 'bg-[#4a7c59]' },
                  { label: 'Planes de Acción', icon: '📋', path: '/planes_accion', color: 'bg-[#2471a3]' },
                  { label: 'Sensores IoT', icon: '📡', path: '/sensores', color: 'bg-[#8b5cf6]' },
                  { label: 'App de Campo', icon: '🌾', path: '/campo', color: 'bg-[#e07a30]' },
                ].map(({ label, icon, path, color }) => (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5
                               hover:shadow-md transition-all text-left"
                  >
                    <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3`}>
                      {icon}
                    </div>
                    <p className="font-semibold text-slate-800 text-sm">{label}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-slate-100">
              <span className="text-5xl mb-4 block">🌿</span>
              <h3 className="font-bold text-slate-800 text-lg mb-2">No tienes parcela asignada</h3>
              <p className="text-slate-500 text-sm">
                Contacta con el administrador para que te asigne una parcela.
              </p>
            </div>
          )}
        </div>
      </Layout>
    )
  }

  // Vista admin/director/trabajador/ingeniero
  return (
    <Layout>
      <div className="p-6">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Parcelas',   valor: '—', color: 'bg-[#4a7c59]' },
            { label: 'Productos',  valor: '—', color: 'bg-[#2471a3]' },
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