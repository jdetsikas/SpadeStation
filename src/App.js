import React, { useState, useEffect } from 'react'

import Routes from './Routes'
import { Navbar } from './components/site_layout'
import { Cart } from './components/cart'
import { checkLogin } from './utils'

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

  return (
    <div className='App'>
      <Navbar user={user} setUser={setUser} cartGames={cartGames} setCartGames={setCartGames} cartView={cartView} setCartView={setCartView}/>
      {cartView ? <Cart cartGames={cartGames} setCartGames={setCartGames} /> : null}
      <Routes user={user} setUser={setUser} cartGames={cartGames} setCartGames={setCartGames} />
    </div> )
}

export default App