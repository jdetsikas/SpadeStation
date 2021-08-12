import React, { useState, useEffect } from 'react'
import { setUserData } from '../../utils'
import './Landing.css'

function Landing(props) {
  const [user, setUser] = useState({})

  useEffect(() => {
    setUserData(props, setUser) //invoke
    window.console.log(props.user)
  }, [])

  return (
    <div className='landing'>
      <h1>Welcome, {user.username}! Thanks for logging in! Buy some games, will ya?</h1>
    </div>
  )
}

export default Landing
