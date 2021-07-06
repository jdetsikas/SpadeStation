import React, { useState, useEffect } from 'react'
import { setUserData } from '../../utils'

function Home(props) {
  const [user, setUser] = useState({})

  useEffect(() => {
    setUserData(props, setUser) //invoke
  }, [])

  return (
    <div className='Home'>
      <h1>Welcome home, {user.username}</h1>
    </div>
  )
}

export default Home
