import { useState } from "react"
import { Layout } from "../components/Layout"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const dominiosValidos = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];

    if (!username || !email || !password) {
      setError("Debes completar todos los campos")
      return
    }
    //-------------validacion de user--------------
    
    if (username.length < 5) {
      setError("El nombre de usuario debe conter 5 caracteres")
      return
    }
    
    //-------------validacion de email--------------
    
    if (!email.includes("@") || !email.includes(".")) {
      setError("El email debe contener '@' y '.'")
    }

    const arrobaIndex = email.indexOf("@");
    const dominio = email.substring(arrobaIndex + 1) // todo lo que está después del "@"

    if (!dominiosValidos.includes(dominio)) {
      setError("Dominio inválido o mal escrito (ej: gmail.com, hotmail.com)")
      return
    }

//-------------validacion de password--------------

    if (password.length < 8) {
      setError("La contraseña debe tener 8 caracteres")
      return
    }

    const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;

    if (!valid.test(password)) {
      setError(
        "La contraseña debe contener al menos 1 mayúscula, minúscula, número y símbolo");
      return
    }
  

    const newUser = {
      username,
      email,
      password
    }

    console.log(newUser)
    setSuccess("Usuario registrado con éxito")

    setUsername("")
    setEmail("")
    setPassword("")
  }

  return (
    <Layout>
      <h1>Registrate</h1>

      <section>
        <h2>Hola, bienvenido</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label>Correo electrónico:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button>Ingresar</button>
        </form>

        {
          error && <p style={{ color: "red" }}>{error}</p>
        }
        {
          success && <p style={{ color: "green" }}>{success}</p>
        }
      </section>
    </Layout>
  )
}

export { Register }