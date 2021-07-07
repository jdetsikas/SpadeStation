import React, { useState, useEffect } from 'react'
import Routes from './Routes'

import { Navbar } from './components/site_layout'
import { checkLogin } from './utils'

function App() {
  const [user, setUser] = useState({})
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
      <Navbar user={user} setUser={setUser} cartGames={cartGames} setCartGames={setCartGames} />
      <Routes user={user} setUser={setUser} cartGames={cartGames} setCartGames={setCartGames} />
    </div> )
}

export default App