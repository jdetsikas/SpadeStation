import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Routes from './Routes'
import { Navbar } from './components/site_layout'
import { Cart } from './components/cart'
import { checkLogin, initializeCart } from './utils'

function App() {
  const [user, setUser] = useState({})
  const [cartView, setCartView] = useState(false)
  const [cart, setCart] = useState({})
  const [cartGames, setCartGames] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const setLogIn = async () => {
      let data = await checkLogin()
      if (data.id) {
        setUser(data)
      }
    }
    setLogIn()

    if (!user.id) {
      setCartGames(JSON.parse(localStorage.getItem('guestcart')) || [])
    }
  }, [])

  useEffect(() => {
    if (user.id) {
      async function getCart(userId) {
        const { data } = await axios.get(`/api/orders/${userId}`)
        const usersCart = await initializeCart(userId, data)
        window.console.log("Cart:", usersCart)
        setCart(usersCart)
        setCartGames(usersCart.games)
      }
      getCart(user.id)
    }
  }, [user])

  useEffect(() => {
    if (!user.id) {
    localStorage.setItem('guestcart', JSON.stringify(cartGames))
    }
   }, [cartGames])

  return (
    <div className='App'>
      <Navbar user={user} setUser={setUser} setCartGames={setCartGames} cartView={cartView} setCartView={setCartView} setCart={setCart}/>
      {cartView ? <Cart cartGames={cartGames} setCartGames={setCartGames} cart={cart} total={total} setTotal={setTotal}/> : null}
      <Routes user={user} setUser={setUser} cartGames={cartGames}  setCartGames={setCartGames} cart={cart}/>
    </div> )
}

export default App