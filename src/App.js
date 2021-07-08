import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Routes from './Routes'
import { Navbar } from './components/site_layout'
import { Cart } from './components/cart'
import { checkLogin } from './utils'



async function filterCompletedOrders(userId, ordersArr) {
  // There should only ever by 1 order per user with status of 'CART'
  const filteredOrders = ordersArr.filter( (order) => order.orderStatus === 'CART')

  // If that order doesn't exist, create it
  if (!filteredOrders.length) {
    const token = localStorage.getItem('token')
    const { data: newOrder} = await axios({
      method: 'post',
      url: '/api/orders',
      data: {
        'buyerId': userId
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })

    // Create a games array to populate with games
    newOrder.games = []

    return newOrder
  }

  // If 'CART' order already exists, fetch its games and populate games array for the front-end
  filteredOrders[0].games = []

  return filteredOrders[0]
}

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
        const cart = await filterCompletedOrders(userId, data)
        window.console.log("Cart:", cart)
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