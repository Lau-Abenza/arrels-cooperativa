import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutPublico from '../components/LayoutPublico'

export default function SobreNosotros() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    municipio: '',
    tipo: 'socio',
    mensaje: ''
  })
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setEnviado(true)
    setEnviando(false)
  }

  return (
    <LayoutPublico>
      {/* Hero con imagen de fondo */}
      <section
        className="relative text-white py-16 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/almendrosflor.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#1c2b1a]/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Sobre Arrels</h1>
          <p className="text-[#8ab89a] text-lg max-w-2xl mx-auto">
            Somos una cooperativa agrícola digital de Agost, Alicante.
            Unimos tradición y tecnología para poner en valor los productos
            de nuestros agricultores.
          </p>
        </div>
      </section>

      {/* Historia y valores */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-[#1c2b1a] mb-4">Nuestra historia</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Arrels nació de la necesidad de modernizar la gestión de la cooperativa
              agrícola de la localidad. Con más de 50 socios agricultores y más de 200
              hectáreas de cultivo entre Agost, y otros municipios, gestionamos la producción
              de almendras, aceite de oliva, vino y productos hortícolas.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Nuestra plataforma digital permite a los agricultores gestionar sus parcelas,
              registrar anotaciones de campo, recibir planes de acción del ingeniero agrónomo
              y vender sus productos directamente a través de nuestra tienda online.
            </p>
          </div>
          <div className="bg-[#eef4f0] rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6 text-center">
              {[
                { valor: '+50', label: 'Socios agricultores' },
                { valor: '+200ha', label: 'Tierra cultivada' },
                { valor: '7', label: 'Categorías de productos' },
                { valor: '1965', label: 'Año de fundación' },
              ].map(({ valor, label }) => (
                <div key={label}>
                  <p className="text-3xl font-bold text-[#4a7c59]">{valor}</p>
                  <p className="text-slate-500 text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1c2b1a] mb-8 text-center">Nuestros valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🌿', titulo: 'Sostenibilidad', desc: 'Fomentamos prácticas agrícolas respetuosas con el medio ambiente, priorizando la agricultura ecológica y el uso eficiente del agua.' },
              { icon: '🤝', titulo: 'Cooperación', desc: 'Creemos en el trabajo conjunto. Cada socio aporta y recibe según su esfuerzo, en un modelo transparente y justo para todos.' },
              { icon: '💡', titulo: 'Innovación', desc: 'Integramos tecnología IoT, apps móviles y plataformas digitales para modernizar la gestión agrícola tradicional.' },
            ].map(({ icon, titulo, desc }) => (
              <div key={titulo} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <span className="text-4xl mb-4 block">{icon}</span>
                <h3 className="font-bold text-slate-800 mb-2">{titulo}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logo centrado */}
        <div className="flex justify-center mb-12">
          <img
            src="/arrels-logo-principal-color.png"
            alt="Arrels"
            className="h-40 w-auto opacity-90"
          />
        </div>

        {/* Equipo */}
        <div
          className="mb-16 rounded-2xl p-10 bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: "url('/vinalopo.jpg')" }}
        >
          <div className="absolute inset-0 bg-[#1c2b1a]/70 rounded-2xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Nuestro equipo</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { nombre: 'Josep Miralles', cargo: 'Director'},
                { nombre: 'Maria Antònia Pérez', cargo: 'Ingeniera Agrónoma'},
                { nombre: 'Pau Giménez', cargo: 'Trabajador'},
                { nombre: 'Neus Carbonell', cargo: 'Trabajadora'},
              ].map(({ nombre, cargo }) => (
                <div key={nombre} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                  <h3 className="font-bold text-white text-lg">{nombre}</h3>
                  <p className="text-[#8ab89a] text-sm font-medium mt-1">{cargo}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formulario contacto/solicitud */}
      <section
        className="relative py-16 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/parra-uva.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#f4f1ea]/80" />
        <div className="relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1c2b1a] mb-2 text-center">
            ¿Quieres unirte a Arrels?
          </h2>
          <p className="text-slate-500 text-center mb-8">
            Rellena el formulario y nos pondremos en contacto contigo
          </p>

          {enviado ? (
            <div className="bg-[#eef4f0] border border-[#4a7c59] rounded-2xl p-8 text-center">
              <span className="text-5xl mb-4 block">✅</span>
              <h3 className="font-bold text-[#1c2b1a] text-xl mb-2">¡Solicitud enviada!</h3>
              <p className="text-slate-600 mb-6">
                Hemos recibido tu solicitud. Nos pondremos en contacto contigo
                en un plazo de 48 horas.
              </p>
              <button
                onClick={() => navigate('/tienda')}
                className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                           px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Ver nuestra tienda →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {[
                  { label: 'Nombre completo', key: 'nombre', type: 'text', placeholder: 'Tu nombre' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'tu@email.com' },
                  { label: 'Teléfono', key: 'telefono', type: 'tel', placeholder: '600 000 000' },
                  { label: 'Municipio', key: 'municipio', type: 'text', placeholder: 'Agost, Otros...' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
                    <input
                      type={type}
                      required
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200
                                 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                                 focus:border-[#4a7c59] text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  ¿Qué te interesa?
                </label>
                <select
                  value={form.tipo}
                  onChange={e => setForm(prev => ({ ...prev, tipo: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                             focus:border-[#4a7c59] text-sm"
                >
                  <option value="socio">Quiero ser socio agricultor</option>
                  <option value="comprador">Solo quiero comprar productos</option>
                  <option value="info">Solicitar más información</option>
                  <option value="visita">Visitar la cooperativa</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Mensaje (opcional)
                </label>
                <textarea
                  value={form.mensaje}
                  onChange={e => setForm(prev => ({ ...prev, mensaje: e.target.value }))}
                  rows={3}
                  placeholder="Cuéntanos algo sobre ti o tu consulta..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30
                             focus:border-[#4a7c59] text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-[#4a7c59] hover:bg-[#3d6b4e] text-white
                           py-3 rounded-xl font-semibold transition-colors
                           disabled:opacity-50"
              >
                {enviando ? 'Enviando...' : 'Enviar solicitud →'}
              </button>

              <p className="text-xs text-slate-400 text-center mt-3">
                Tus datos serán tratados conforme a nuestra {' '}
                <span
                  onClick={() => navigate('/privacidad')}
                  className='undeline cursor-pointer hover:text-slate-600'
                >
                  política de privacidad
                </span>.
                  </p>
            </form>
          )}
        </div>
        </div>
      </section>
    </LayoutPublico>
  )
}