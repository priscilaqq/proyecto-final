import { useEffect, useState, useRef } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import "../styles/pages/Home.css"

const Home = () => {
  const [products, setProducts] = useState([])
  const [showPopup, setShowPopup] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")

  //estado para la busqueda
  const [searchValue, setSearchValue] = useState("")
  const inputRef = useRef(null)

  // simulando existencia del usuario, proximamente este estado será global
  const { user } = useAuth()

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
    const data = await response.json()
    setProducts(data)
  }

  useEffect(() => {
    fetchingProducts()
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id != id))
    }
  }

  const handleOpenEdit = (product) => {
    setShowPopup(true)
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }

  // petición al backend mediante fetch para modificar-> método PATCH / PUT https://fakeproductapi.com/products
  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(prevProduct =>
          prevProduct.map((product) =>
            product.id === productToEdit.id
              ? data
              : product
          ))
      }
      setShowPopup(false)
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <Layout>
      <section>
  <h1>Bienvenido a Nuestra Tienda</h1>
  <p>Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.</p>

  <h2>¿Por qué elegirnos?</h2>
  <div class="cards-container">
    <div class="card">
      <span>🚚</span>
      <h3>Envíos a todo el país</h3>
      <p>Recibí tu compra en la puerta de tu casa estés donde estés.</p>
    </div>
    <div class="card">
      <span>💳</span>
      <h3>Pagos seguros</h3>
      <p>Trabajamos con plataformas que garantizan tu seguridad.</p>
    </div>
    <div class="card">
      <span>🎯</span>
      <h3>Atención personalizada</h3>
      <p>Estamos disponibles para ayudarte en todo momento.</p>
    </div>
  </div>
      </section>

      <section>
        <h2>Nuestros productos</h2>
        <p>Elegí entre nuestras categorías más populares.</p>

        <div className="search-container">
          <h3>🔍 Buscar producto</h3>
          <input
            ref={inputRef}
            type="search"
            value={searchValue}
            placeholder="Buscar por nombre..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {
          showPopup && <section className="popup-edit">
            <h2>Editando producto.</h2>
            <button onClick={() => setShowPopup(null)}>Cerrar</button>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
              />
              <input
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
              <textarea
                placeholder="Ingrese la descripción"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              ></textarea>
              <input
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              />
              <button>Actualizar</button>
            </form>
          </section>
        }

        <div className="products-container">
          {
            products
              .filter(product =>
                product.title.toLowerCase().includes(searchValue.toLowerCase())
                        )
            .map((product) => <div key={product.id}>
              <img width="80px" src={product.image} alt={`Imagen de ${product.title}`} />
              <h2 key={product.id}>{product.title}</h2>
              <p className="price">${product.price}</p>
              <p className="description">{product.description}</p>
              <p className="category"><strong>{product.category}</strong></p>
              {
                user && <div>
                  <button onClick={() => handleOpenEdit(product)}>Actualizar</button>
                  <button onClick={() => handleDelete(product.id)}>Borrar</button>
                </div>
              }
            </div>)
          }
        </div>
      </section>
    </Layout>
  )
}

export { Home }
