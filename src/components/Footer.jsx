// import "../styles/components/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="logo">Mi Proyecto</h2>
        <nav className="footer-links">
          <a href="#about">Sobre nosotros</a>
          <a href="#services">Servicios</a>
          <a href="#contact">Contacto</a>
        </nav>
        <p className="footer-copy">
          © {new Date().getFullYear()} Mi Proyecto — Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export { Footer }