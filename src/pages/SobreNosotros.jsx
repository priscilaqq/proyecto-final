import { Layout } from "../components/Layout"

const SobreNosotros = () => {
  return (
    <Layout>
      <section>
        <h1>Nuestro Proyecto</h1>
        <p>Este es un desarrollo de e-commerce creado como parte de un curso de React. Consiste en una tienda en línea completa que reproduce una experiencia de compra real, con funciones de autenticación, administración de productos y navegación sencilla.</p>
        <p>El proyecto aplica buenas prácticas de desarrollo frontend, incluyendo manejo de estado, enrutamiento, validación de formularios y diseño adaptable a distintos dispositivos.</p>
      </section>
      <section>
        <h1>Nuestro Público</h1>
        <p>La aplicación está pensada para programadores y estudiantes que desean aprender React y otras tecnologías web modernas. También funciona como guía para implementar funcionalidades habituales en aplicaciones online.
        </p>
        <p>Los usuarios pueden explorar productos, registrarse, iniciar sesión y administrar el catálogo, disfrutando así de una experiencia de compra online completa.
        </p>
      </section>
      <section>
        <h1>Tecnologías y Enfoques</h1>
        <p>Frontend: React 19, React Router DOM, Vite
          Estilos: CSS moderno con variables, Grid y Flexbox, diseño adaptable
          APIs: FakeStoreAPI para productos y autenticación
          Enfoques: Uso de componentes funcionales, Hooks, Context API, formularios controlados y validación en tiempo real</p>
      </section>
    </Layout>
  )
}