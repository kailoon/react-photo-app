import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider({ children }) {
  const [allPhotos, setAllPhotos] = useState([])
  const [cartItems, setCartItems] = useState([])
  const url =
    "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
  useEffect(() => {
    // Get the data from the api
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllPhotos(data))
    // save the data to state
  }, [])

  function toggleFavorite(id) {
    const updateArr = allPhotos.map((photo) => {
      if (photo.id === id) {
        return {
          ...photo,
          isFavorite: !photo.isFavorite,
        }
      }
      return photo
    })

    setAllPhotos(updateArr)
  }

  function addToCart(newItem) {
    setCartItems((prevItems) => [...prevItems, newItem])
  }

  function removeFromCart(id) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }
  function emptyCart() {
    setCartItems([])
  }
  return (
    <Context.Provider
      value={{
        allPhotos,
        toggleFavorite,
        addToCart,
        cartItems,
        removeFromCart,
        emptyCart,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
