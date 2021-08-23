import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import './Nav.css'

function Navbar({ user, setUser, setCartGames, history, cartView, setCartView, setCart}) {

  function handleLogout() {
    localStorage.removeItem('token')
    setCartGames([])
    setCartView(false)
    setCart({})
    setUser({})
    history.push('/')
  }

  return (
    <div>

      <h1 className='logo'><img src='/icons/logo.png' alt="logo"/></h1>
      <nav className='navbar'>
        <NavLink to='/'><img src ="/icons/home.png" alt="home"/></NavLink>
        <NavLink to='/games'><img src ="/icons/games.png" alt="games"/></NavLink>
        <input type='image' src='/icons/cart.png' onClick={(e) => {e.preventDefault(); setCartView(!cartView)}}/>

        {user.id ? ( 
          <div>
            <NavLink to='/account'><img src ="/icons/profile.png" alt="profile"/></NavLink>
            <a href='#' onClick={handleLogout}><img src ="/icons/signout.png" alt="signout"/></a>
          </div>
          ) : (
          <div>
            <NavLink to='/login'><img src ="/icons/login.png" alt="login"/></NavLink>
            <NavLink to='/signup'><img src ="/icons/register.png" alt="register"/></NavLink>
          </div>
        )}
      </nav>
    </div> )
}

export default withRouter(Navbar)