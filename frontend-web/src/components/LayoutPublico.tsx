import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LayoutPublico({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      {/* Header público */}
      <header className="bg-[#1c2b1a] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate('/inicio')} className="flex items-center gap-2">
            <img
              src="/arrels-logo-mono-clara.png"
              alt="Arrels Cooperativa Agrícola"
              className="h-22 w-auto"
            />
          </button>
          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: 'Inicio', path: '/inicio' },
              { label: 'Tienda', path: '/tienda' },
              { label: 'Blog', path: '/blog' },
              { label: 'Sobre Nosotros', path: '/sobre-nosotros' },
            ].map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="text-[#8ab89a] hover:text-white transition-colors text-base font-medium"
              >
                {label}
              </button>
            ))}
          </nav>
          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-[#8ab89a] hover:text-white text-sm transition-colors hidden md:block"
            >
              Acceso socios
            </button>
            <button
              onClick={() => navigate('/tienda')}
              className="bg-[#e07a30] hover:bg-[#c96a20] text-white
                         px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              🛒 Tienda
            </button>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#1c2b1a] text-[#6b8c5e] mt-16">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <img
                src="/arrels-logo-mono-clara.png"
                alt="Arrels"
                className="h-22 w-auto mb-3"
              />
              <p className="text-sm leading-relaxed">
                Cooperativa agrícola de Agost, Alicante. Productos de calidad directamente del campo a tu mesa.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">Enlaces</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Tienda', path: '/tienda' },
                  { label: 'Blog', path: '/blog' },
                  { label: 'Sobre nosotros', path: '/sobre-nosotros' },
                  { label: 'Política de privacidad', path: '/privacidad' },
                ].map(({ label, path }) => (
                  <p
                    key={path}
                    onClick={() => navigate(path)}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    {label}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">Contacto</h3>
              <div className="text-sm space-y-1">
                <p>📍 Agost, Alicante</p>
                <p>📧 info@arrels.coop</p>
                <p>📞 965 00 00 00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-[#2d4a1e] pt-6 text-center text-xs space-y-1">
            <p>© 2026 Arrels Cooperativa Agrícola · Todos los derechos reservados</p>
            <p>
              <span
                onClick={() => navigate('/privacidad')}
                className="hover:text-white cursor-pointer transition-colors underline"
              >
                Política de Privacidad
              </span>
              {' · '}
              <span
                onClick={() => navigate('/sobre-nosotros')}
                className="hover:text-white cursor-pointer transition-colors underline"
              >
                Contacto
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
