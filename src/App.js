import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Routes from './Routes'
import { Navbar } from './components/site_layout'
import { Cart } from './components/cart'
import { checkLogin, initializeCart } from './utils'

function App() {
  const [user, setUser] = useState({})
  const [cartView, setCartView] = useState(false)
  const [cartGames, setCartGames] = useState([])

  useEffect(() => {
    const setLogIn = async () => {
      let data = await checkLogin()
      if (data.id) {
        setUser(data)
      }
    }
    setLogIn()
  }, [])

  useEffect(() => {
    if (user.id) {
      async function getCart(userId) {
        const { data } = await axios.get(`/api/orders/${userId}`)
        window.console.log("Data:", data)
        const usersCart = await initializeCart(userId, data)
        window.console.log("Cart:", usersCart)
        setCartGames(usersCart.games)
      }
      getCart(user.id)
    }
  }, [user])

  return (
    <div className='App'>
      <Navbar user={user} setUser={setUser} cartGames={cartGames} setCartGames={setCartGames} cartView={cartView} setCartView={setCartView}/>
      {cartView ? <Cart cartGames={cartGames} setCartGames={setCartGames} /> : null}
      <Routes user={user} setUser={setUser} cartGames={cartGames} setCartGames={setCartGames} />
    </div> )
}

export default App