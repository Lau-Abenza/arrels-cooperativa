import { useNavigate } from 'react-router-dom'
import LayoutPublico from '../components/LayoutPublico'

export default function PoliticaPrivacidad() {
  const navigate = useNavigate()

  return (
    <LayoutPublico>
      {/* Hero */}
      <section
        className="relative text-white py-12 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/almendrosbancal.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#1c2b1a]/80" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">Política de Privacidad</h1>
          <p className="text-[#8ab89a] text-lg">
            Protección de datos personales conforme al RGPD y la LOPDGDD
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10 text-slate-700">

          {/* 1. Responsable */}
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Responsable del tratamiento
            </h2>
            <div className="bg-[#eef4f0] rounded-2xl p-6 space-y-2 text-sm">
              <p><span className="font-semibold">Denominación:</span> Cooperativa Agrícola ARRELS</p>
              <p><span className="font-semibold">CIF:</span> F-012345678</p>
              <p><span className="font-semibold">Domicilio:</span> Agost, Alicante, España</p>
              <p><span className="font-semibold">Email de contacto:</span> info@arrels.coop</p>
              <p><span className="font-semibold">Teléfono:</span> 965 00 00 00</p>
            </div>
          </div>

          {/* 2. Finalidad */}
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Finalidad del tratamiento
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              Tratamos los datos personales que nos facilitas para las siguientes finalidades:
            </p>
            <div className="space-y-3">
              {[
                { tipo: 'Usuarios web (compradores)', desc: 'Gestión del registro y acceso a la tienda online, tramitación de pedidos, comunicaciones relacionadas con las compras y atención al cliente.' },
                { tipo: 'Socios agricultores', desc: 'Gestión de la relación societaria, administración de parcelas, registros de anotaciones de campo, planes de acción agronómica, gestión de aportaciones y liquidaciones.' },
                { tipo: 'Solicitantes de información', desc: 'Atender consultas enviadas a través del formulario de contacto y gestionar solicitudes de adhesión a la cooperativa.' },
                { tipo: 'Usuarios del panel de gestión', desc: 'Control de acceso, auditoría de operaciones y prestación de los servicios digitales de la plataforma ARRELS.' },
              ].map(({ tipo, desc }) => (
                <div key={tipo} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                  <p className="font-semibold text-[#1c2b1a] text-sm mb-1">{tipo}</p>
                  <p className="text-sm text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Base legal */}
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Base legal del tratamiento
            </h2>
            <div className="space-y-3 text-sm">
              <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                <p className="font-semibold text-[#1c2b1a] mb-1">Consentimiento del interesado</p>
                <p className="text-slate-600">Para el registro como usuario web, suscripción a comunicaciones comerciales y envío de formularios de contacto (art. 6.1.a RGPD).</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                <p className="font-semibold text-[#1c2b1a] mb-1">Ejecución de un contrato</p>
                <p className="text-slate-600">Para la gestión de pedidos de la tienda online y la relación societaria con los socios agricultores (art. 6.1.b RGPD).</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                <p className="font-semibold text-[#1c2b1a] mb-1">Obligación legal</p>
                <p className="text-slate-600">Para el cumplimiento de obligaciones contables, fiscales y mercantiles derivadas de la actividad de la cooperativa (art. 6.1.c RGPD).</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                <p className="font-semibold text-[#1c2b1a] mb-1">Interés legítimo</p>
                <p className="text-slate-600">Para la seguridad de la plataforma, prevención del fraude y mejora de los servicios digitales (art. 6.1.f RGPD).</p>
              </div>
            </div>
          </div>

          {/* 4. Datos recogidos */}
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              Datos personales que tratamos
            </h2>
            <div className="bg-[#eef4f0] rounded-2xl p-6 text-sm space-y-3">
              <div>
                <p className="font-semibold text-[#1c2b1a] mb-1">Datos identificativos</p>
                <p className="text-slate-600">Nombre y apellidos, NIF/NIE (socios), dirección postal, teléfono, correo electrónico.</p>
              </div>
              <div>
                <p className="font-semibold text-[#1c2b1a] mb-1">Datos de acceso</p>
                <p className="text-slate-600">Nombre de usuario, contraseña cifrada (bcrypt), rol de acceso, fecha de registro y último acceso.</p>
              </div>
              <div>
                <p className="font-semibold text-[#1c2b1a] mb-1">Datos de actividad agrícola (socios)</p>
                <p className="text-slate-600">Parcelas y superficies, anotaciones de campo, datos de sensores IoT, aportaciones y liquidaciones.</p>
              </div>
              <div>
                <p className="font-semibold text-[#1c2b1a] mb-1">Datos comerciales (compradores)</p>
                <p className="text-slate-600">Historial de pedidos, dirección de envío, datos de facturación.</p>
              </div>
              <div>
                <p className="font-semibold text-[#1c2b1a] mb-1">Datos técnicos</p>
                <p className="text-slate-600">Dirección IP, tipo de navegador, logs de acceso a la plataforma.</p>
              </div>
            </div>
          </div>

          {/* 5. Conservación */}
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              Plazo de conservación
            </h2>
            <div className="text-sm leading-relaxed space-y-2">
              <p>Los datos se conservarán durante el tiempo necesario para cumplir la finalidad para la que fueron recogidos y mientras exista una relación activa contigo.</p>
              <p>Una vez finalizada dicha relación, los datos se bloquearán y conservarán durante los plazos legalmente establecidos:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
                <li>Datos contables y fiscales: <span className="font-medium">6 años</span> (Código de Comercio)</li>
                <li>Datos de socios: <span className="font-medium">5 años</span> tras la baja en la cooperativa</li>
                <li>Datos de pedidos: <span className="font-medium">5 años</span> (Ley de Contratos)</li>
                <li>Logs de acceso y seguridad: <span className="font-medium">12 meses</span></li>
                <li>Formularios de contacto sin contrato: <span className="font-medium">1 año</span></li>
              </ul>
            </div>
          </div>

          {/* 6. Destinatarios */}
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
              Destinatarios y transferencias
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              No cedemos tus datos a terceros salvo obligación legal. Utilizamos los siguientes proveedores de servicios como encargados del tratamiento:
            </p>
            <div className="space-y-2 text-sm">
              {[
                { proveedor: 'Supabase (PostgreSQL)', uso: 'Alojamiento de la base de datos en servidores de la UE (Irlanda, AWS eu-west-1)', transferencia: 'UE — sin transferencia internacional' },
                { proveedor: 'Railway', uso: 'Despliegue del servidor backend (API)', transferencia: 'Puede implicar servidores fuera de la UE — cláusulas contractuales estándar' },
                { proveedor: 'Vercel', uso: 'Alojamiento del frontend web', transferencia: 'EE.UU. — acogido al Data Privacy Framework UE-EE.UU.' },
                { proveedor: 'MongoDB Atlas', uso: 'Base de datos de logs y datos IoT', transferencia: 'Región EU — sin transferencia internacional' },
              ].map(({ proveedor, uso, transferencia }) => (
                <div key={proveedor} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                  <p className="font-semibold text-[#1c2b1a]">{proveedor}</p>
                  <p className="text-slate-600">{uso}</p>
                  <p className="text-xs text-[#4a7c59] mt-1">📍 {transferencia}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Derechos */}
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
              Tus derechos
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              Conforme al RGPD y la LOPDGDD, puedes ejercer los siguientes derechos dirigiendo un escrito a <span className="font-semibold">info@arrels.coop</span> con copia de tu documento de identidad:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {[
                { derecho: '✅ Acceso', desc: 'Conocer qué datos tuyos tratamos.' },
                { derecho: '✏️ Rectificación', desc: 'Corregir datos inexactos o incompletos.' },
                { derecho: '🗑️ Supresión', desc: 'Solicitar la eliminación de tus datos cuando no sean necesarios.' },
                { derecho: '⏸️ Limitación', desc: 'Solicitar que suspendamos el tratamiento en determinadas circunstancias.' },
                { derecho: '📦 Portabilidad', desc: 'Recibir tus datos en formato estructurado y legible por máquina.' },
                { derecho: '🚫 Oposición', desc: 'Oponerte al tratamiento basado en interés legítimo o con fines comerciales.' },
              ].map(({ derecho, desc }) => (
                <div key={derecho} className="bg-[#eef4f0] rounded-xl p-4">
                  <p className="font-semibold text-[#1c2b1a] mb-1">{derecho}</p>
                  <p className="text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Si consideras que el tratamiento no es conforme a la normativa, puedes presentar una reclamación ante la <span className="font-semibold">Agencia Española de Protección de Datos (AEPD)</span> en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#4a7c59] underline">www.aepd.es</a>.
            </p>
          </div>

          {/* 8. Seguridad */}
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-sm font-bold">8</span>
              Medidas de seguridad
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              ARRELS aplica medidas técnicas y organizativas apropiadas para garantizar la seguridad de tus datos:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 pl-2">
              <li>Contraseñas cifradas con algoritmo <span className="font-medium">bcrypt</span></li>
              <li>Autenticación mediante tokens <span className="font-medium">JWT</span> con caducidad</li>
              <li>Comunicaciones cifradas mediante <span className="font-medium">HTTPS/TLS</span></li>
              <li>Control de acceso por roles (admin, ingeniero, trabajador, socio, usuario web)</li>
              <li>Backups periódicos de la base de datos</li>
              <li>Acceso restringido a los datos según el principio de mínimo privilegio</li>
            </ul>
          </div>

          {/* 9. Cookies */}
          <div>
            <h2 className="text-2xl font-bold text-[#1c2b1a] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-sm font-bold">9</span>
              Cookies
            </h2>
            <p className="text-sm leading-relaxed">
              La plataforma ARRELS utiliza únicamente cookies técnicas estrictamente necesarias para el funcionamiento del servicio (gestión de sesión mediante token JWT almacenado en localStorage). No utilizamos cookies de rastreo, publicidad ni análisis de terceros.
            </p>
          </div>

          {/* 10. Actualización */}
          <div className="bg-[#eef4f0] rounded-2xl p-6 text-sm">
            <p className="font-semibold text-[#1c2b1a] mb-2">Última actualización</p>
            <p className="text-slate-600">Esta política de privacidad fue actualizada en mayo de 2026. Nos reservamos el derecho de modificarla para adaptarla a cambios normativos o funcionales de la plataforma. Te notificaremos cualquier cambio relevante a través de la plataforma o por correo electrónico.</p>
          </div>

          {/* Botón volver */}
          <div className="text-center pt-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#4a7c59] hover:bg-[#3d6b4e] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              ← Volver
            </button>
          </div>

        </div>
      </section>
    </LayoutPublico>
  )
}
