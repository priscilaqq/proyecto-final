import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import "../styles/components/Header.css"

const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
            {
            user && <>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
              }
                  {
            !user && <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/registrate" className="registro-btn">Registrate</Link></li>
            </>
          }
      </ul>
    </div>
  </div>
</nav>

      </>
  )
}

export { Header }