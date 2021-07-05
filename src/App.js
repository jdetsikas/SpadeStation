import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import { checkLogin } from './utils'

function App() {
  const [user, setUser] = useState({})

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
      <Navbar user={user} setUser={setUser} />
      <Routes user={user} setUser={setUser} />
    </div> )
}

export default App