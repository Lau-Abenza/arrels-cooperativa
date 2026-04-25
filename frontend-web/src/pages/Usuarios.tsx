import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../components/Layout'

interface Usuario {
  id: number
  nombre: string
  email: string
  rol: string
  activo: boolean
}

const ROLES = ['admin', 'director', 'trabajador', 'ingeniero', 'socio', 'usuario_web']

const ROL_COLOR: Record<string, string> = {
  admin:       'bg-red-100 text-red-700',
  director:    'bg-purple-100 text-purple-700',
  trabajador:  'bg-blue-100 text-blue-700',
  ingeniero:   'bg-green-100 text-green-700',
  socio:       'bg-amber-100 text-amber-700',
  usuario_web: 'bg-slate-100 text-slate-600',
}

export default function Usuarios() {
  const queryClient = useQueryClient()
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [form, setForm] = useState({ nombre: '', email: '', password: '', rol: 'socio' })
  const [filtroRol, setFiltroRol] = useState('')
  const [busqueda, setBusqueda] = useState('')

  const { data: usuarios = [], isLoading } = useQuery({
    queryKey: ['usuarios'],
    queryFn: async () => {
      const res = await axios.get('/auth/usuarios')
      return res.data as Usuario[]
    }
  })

  const crearMutation = useMutation({
    mutationFn: () => axios.post('/auth/registro', form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      setMostrarForm(false)
      setForm({ nombre: '', email: '', password: '', rol: 'socio' })
    }
  })

  const editarMutation = useMutation({
    mutationFn: ({ id, datos }: { id: number, datos: Partial<typeof form> }) =>
      axios.put(`/auth/usuarios/${id}`, datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      setMostrarForm(false)
      setEditandoId(null)
      setForm({ nombre: '', email: '', password: '', rol: 'socio' })
    }
  })

  const handleEditar = (u: Usuario) => {
    setForm({ nombre: u.nombre, email: u.email, password: '', rol: u.rol })
    setEditandoId(u.id)
    setMostrarForm(true)
  }

  const handleSubmit = () => {
    if (editandoId) {
      const datos: Partial<typeof form> = { nombre: form.nombre, email: form.email, rol: form.rol }
      if (form.password) datos.password = form.password
      editarMutation.mutate({ id: editandoId, datos })
    } else {
      crearMutation.mutate()
    }
  }

  const usuariosFiltrados = usuarios.filter(u => {
    const matchRol = filtroRol ? u.rol === filtroRol : true
    const matchBusqueda = busqueda
      ? u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.email.toLowerCase().includes(busqueda.toLowerCase())
      : true
    return matchRol && matchBusqueda
  })

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a]">👥 Usuarios</h2>
            <p className="text-slate-500 text-sm mt-1">{usuarios.length} usuarios registrados</p>
          </div>
          <button
            onClick={() => { setMostrarForm(true); setEditandoId(null); setForm({ nombre: '', email: '', password: '', rol: 'socio' }) }}
            className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            + Nuevo usuario
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-3 mb-4 flex-wrap">
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o email..."
            className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 focus:border-[#4a7c59] text-sm flex-1 max-w-xs"
          />
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFiltroRol('')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filtroRol === '' ? 'bg-[#4a7c59] text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
            >
              Todos
            </button>
            {ROLES.map(rol => (
              <button
                key={rol}
                onClick={() => setFiltroRol(rol)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filtroRol === rol ? 'bg-[#4a7c59] text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                {rol}
              </button>
            ))}
          </div>
        </div>

        {/* Formulario */}
        {mostrarForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-4">
              {editandoId ? 'Editar usuario' : 'Nuevo usuario'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Nombre completo</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={e => setForm(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 focus:border-[#4a7c59] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 focus:border-[#4a7c59] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  {editandoId ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña'}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 focus:border-[#4a7c59] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Rol</label>
                <select
                  value={form.rol}
                  onChange={e => setForm(prev => ({ ...prev, rol: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 focus:border-[#4a7c59] text-sm"
                >
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-4">
              <button
                onClick={() => { setMostrarForm(false); setEditandoId(null) }}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!form.nombre || !form.email || (!editandoId && !form.password)}
                className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {editandoId ? 'Guardar cambios' : 'Crear usuario'}
              </button>
            </div>
          </div>
        )}

        {/* Tabla */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1c2b1a] text-white text-sm">
                <tr>
                  {['ID', 'Nombre', 'Email', 'Rol', 'Estado', 'Acciones'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usuariosFiltrados.map((u, i) => (
                  <tr key={u.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f4f1ea]/50'}>
                    <td className="px-4 py-3 text-slate-400 text-sm font-mono">#{u.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{u.nombre}</td>
                    <td className="px-4 py-3 text-slate-500 text-sm">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ROL_COLOR[u.rol]}`}>
                        {u.rol}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${u.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {u.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleEditar(u)}
                        className="text-[#4a7c59] hover:underline text-sm font-medium"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  )
}