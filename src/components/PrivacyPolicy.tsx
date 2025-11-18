import React from 'react';

interface PrivacyPolicyProps {
  onBack?: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-tektur font-bold mb-6 text-gray-800">
            Política de Privacidad
          </h1>
          
          <p className="text-gray-600 mb-6">
            <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-tektur font-bold mt-8 mb-4 text-gray-800">
                1. Información General
              </h2>
              <p>
                Informática González ("nosotros", "nuestro" o "la empresa") se compromete a proteger 
                la privacidad de los usuarios que visitan nuestro sitio web. Esta Política de Privacidad 
                describe cómo recopilamos, utilizamos, almacenamos y protegemos su información personal 
                cuando utiliza nuestro sitio web.
              </p>
              <p>
                Al utilizar nuestro sitio web, usted acepta las prácticas descritas en esta política. 
                Si no está de acuerdo con esta política, le recomendamos que no utilice nuestro sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-tektur font-bold mt-8 mb-4 text-gray-800">
                2. Información que Recopilamos
              </h2>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">
                2.1. Información Proporcionada por el Usuario
              </h3>
              <p>
                Cuando utiliza nuestro formulario de contacto, recopilamos la siguiente información:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Nombre completo:</strong> Para identificarlo y dirigirnos a usted de manera personalizada.</li>
                <li><strong>Correo electrónico:</strong> Para comunicarnos con usted y responder a sus consultas.</li>
                <li><strong>Número de teléfono:</strong> Para contactarlo directamente si es necesario.</li>
                <li><strong>Nombre de la empresa:</strong> Para entender mejor su contexto empresarial.</li>
                <li><strong>Mensaje:</strong> La información que nos proporciona sobre su proyecto o consulta.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">
                2.2. Información Recopilada Automáticamente
              </h3>
              <p>
                Cuando visita nuestro sitio web, podemos recopilar automáticamente cierta información técnica, 
                incluyendo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dirección IP</li>
                <li>Tipo de navegador y versión</li>
                <li>Sistema operativo</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Fecha y hora de acceso</li>
                <li>Referrer (sitio web desde el cual llegó a nuestro sitio)</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">
                2.3. Cookies y Tecnologías Similares
              </h3>
              <p>
                Utilizamos tecnologías como cookies y tokens de almacenamiento local (localStorage) para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mantener la seguridad de su sesión mediante tokens CSRF</li>
                <li>Mejorar la funcionalidad del sitio web</li>
                <li>Analizar el uso del sitio web</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-tektur font-bold mt-8 mb-4 text-gray-800">
                3. Uso de la Información
              </h2>
              <p>
                Utilizamos la información recopilada para los siguientes propósitos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Responder a sus consultas:</strong> Utilizamos su información de contacto para responder 
                a sus mensajes y proporcionarle la información solicitada.</li>
                <li><strong>Procesar solicitudes:</strong> Para procesar y gestionar sus solicitudes de servicios 
                o información.</li>
                <li><strong>Comunicación:</strong> Para comunicarnos con usted sobre nuestros servicios, proyectos 
                o información relevante.</li>
                <li><strong>Mejora del servicio:</strong> Para analizar y mejorar nuestros servicios y la experiencia 
                del usuario en nuestro sitio web.</li>
                <li><strong>Seguridad:</strong> Para proteger nuestro sitio web contra fraudes, abusos y actividades 
                maliciosas.</li>
                <li><strong>Cumplimiento legal:</strong> Para cumplir con las obligaciones legales y regulatorias.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-tektur font-bold mt-8 mb-4 text-gray-800">
                4. Compartir Información
              </h2>
              <p>
                No vendemos, alquilamos ni compartimos su información personal con terceros, excepto en las 
                siguientes circunstancias:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Proveedores de servicios:</strong> Podemos compartir información con proveedores de 
                servicios de confianza que nos ayudan a operar nuestro sitio web y realizar nuestras actividades 
                comerciales (por ejemplo, servicios de hosting, análisis web). Estos proveedores están obligados 
                contractualmente a mantener la confidencialidad de su información.</li>
                <li><strong>Plataformas de comunicación:</strong> Utilizamos servicios de mensajería como Telegram 
                para recibir y gestionar sus consultas. La información que nos proporciona puede ser procesada 
                a través de estas plataformas.</li>
                <li><strong>Requisitos legales:</strong> Podemos divulgar información si es requerido por ley, 
                orden judicial o proceso legal, o para proteger nuestros derechos, propiedad o seguridad, o la de 
                nuestros usuarios.</li>
                <li><strong>Con su consentimiento:</strong> Podemos compartir su información con terceros cuando 
                usted nos haya dado su consentimiento explícito para hacerlo.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-tektur font-bold mt-8 mb-4 text-gray-800">
                5. Seguridad de la Información
              </h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información 
                personal contra acceso no autorizado, alteración, divulgación o destrucción. Estas medidas incluyen:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encriptación de datos en tránsito</li>
                <li>Tokens de seguridad CSRF para prevenir ataques</li>
                <li>Validación y sanitización de datos de entrada</li>
                <li>Límites de tasa (rate limiting) para prevenir abusos</li>
                <li>Detección de bots y actividades sospechosas</li>
              </ul>
              <p className="mt-4">
                Sin embargo, ningún método de transmisión por Internet o método de almacenamiento electrónico es 
                100% seguro. Aunque nos esforzamos por utilizar medios comercialmente aceptables para proteger su 
                información personal, no podemos garantizar su seguridad absoluta.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-tektur font-bold mt-8 mb-4 text-gray-800">
                6. Retención de Datos
              </h2>
              <p>
                Conservamos su información personal solo durante el tiempo necesario para cumplir con los propósitos 
                descritos en esta política, a menos que la ley requiera o permita un período de retención más largo. 
                Cuando ya no necesitemos su información personal, la eliminaremos de forma segura.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-tektur font-bold mt-8 mb-4 text-gray-800">
                7. Sus Derechos
              </h2>
              <p>
                Usted tiene los siguientes derechos respecto a su información personal:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Derecho de acceso:</strong> Puede solicitar una copia de la información personal que 
                tenemos sobre usted.</li>
                <li><strong>Derecho de rectificación:</strong> Puede solicitar que corrijamos cualquier información 
                inexacta o incompleta.</li>
                <li><strong>Derecho de eliminación:</strong> Puede solicitar que eliminemos su información personal, 
                sujeto a ciertas limitaciones legales.</li>
                <li><strong>Derecho de oposición:</strong> Puede oponerse al procesamiento de su información personal 
                en ciertas circunstancias.</li>
                <li><strong>Derecho de portabilidad:</strong> Puede solicitar que transfiramos su información personal 
                a otro proveedor de servicios.</li>
                <li><strong>Derecho de retirar el consentimiento:</strong> Si el procesamiento se basa en su 
                consentimiento, puede retirarlo en cualquier momento.</li>
              </ul>
              <p className="mt-4">
                Para ejercer cualquiera de estos derechos, puede contactarnos utilizando la información de contacto 
                proporcionada al final de esta política.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-tektur font-bold mt-8 mb-4 text-gray-800">
                8. Enlaces a Sitios de Terceros
              </h2>
              <p>
                Nuestro sitio web puede contener enlaces a sitios web de terceros. No somos responsables de las 
                prácticas de privacidad o el contenido de estos sitios web. Le recomendamos que revise las políticas 
                de privacidad de cualquier sitio web de terceros que visite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-tektur font-bold mt-8 mb-4 text-gray-800">
                9. Privacidad de Menores
              </h2>
              <p>
                Nuestro sitio web no está dirigido a menores de 18 años. No recopilamos intencionalmente información 
                personal de menores. Si descubrimos que hemos recopilado información personal de un menor sin el 
                consentimiento de los padres, tomaremos medidas para eliminar esa información de nuestros servidores.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-tektur font-bold mt-8 mb-4 text-gray-800">
                10. Cambios a esta Política de Privacidad
              </h2>
              <p>
                Nos reservamos el derecho de actualizar o modificar esta Política de Privacidad en cualquier momento. 
                Le notificaremos cualquier cambio publicando la nueva política en esta página y actualizando la fecha 
                de "Última actualización" en la parte superior. Le recomendamos que revise periódicamente esta política 
                para mantenerse informado sobre cómo protegemos su información.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-tektur font-bold mt-8 mb-4 text-gray-800">
                11. Contacto
              </h2>
              <p>
                Si tiene preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el 
                tratamiento de su información personal, puede contactarnos a través de:
              </p>
              <ul className="list-none pl-0 space-y-2 mt-4">
                <li><strong>Correo electrónico:</strong> contacto@informaticagonzalez.com</li>
                <li><strong>Teléfono:</strong> +58 412 366 8513</li>
                <li><strong>Dirección:</strong> Av Las Fuentes El Paraiso, Caracas, Dtto Capital, 1020, Venezuela</li>
              </ul>
            </section>

            <section className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Al utilizar nuestro sitio web, usted reconoce que ha leído y entendido esta Política de Privacidad 
                y acepta sus términos.
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onBack}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

