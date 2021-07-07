import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'



function Navbar({ user, setUser, history }) {
  function handleLogout() {
    localStorage.removeItem('token')
    setUser({})
    history.push('/')
  }

  return (
    <div>
      <h1 className='logo'><img src ="/icons/logo.png" alt="logo"/></h1>
      <nav className='navbar'>
        {user.id ? ( 
          <div>
            <NavLink to='/Home'>Home</NavLink>
            <a href='#' onClick={handleLogout}>Log Out</a>
          </div> 
          ) : (
          <div>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
          </div>
        )}
        <NavLink to='/games'>Games</NavLink>
        {user ? <NavLink to='/account'>{user.username}</NavLink> : null}
      </nav>
    </div> )
}

export default withRouter(Navbar)
