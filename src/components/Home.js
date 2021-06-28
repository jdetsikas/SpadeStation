import React, { useState, useEffect } from 'react'
import { checkLogin } from '../utils'

function Home(props) {
  const [user, setUser] = useState({})

  useEffect(() => {
    async function setUserData() {
      let data = await checkLogin()
      console.log(data)
      if (!data.id) {
        // no user, return to login
        props.history.push('/login')
      } else {
        setUser(data)
      }
    }
    setUserData() //invoke
  }, [])

  return (
    <div className='Home'>
      <h1>Welcome home, {user.username}</h1>
    </div>
  )
}

export default Home
