import React, {useState} from 'react'
import { Cart } from '../games';
import { NavLink, withRouter } from 'react-router-dom'



function Navbar({ user, setUser, history }) {
  const [cartView, setCartView] = useState(false)

  function handleLogout() {
    localStorage.removeItem('token')
    setUser({})
    history.push('/')
  }

  return (
    <div>

      <h1 className='logo'><img src ="/icons/logo.png" alt="logo"/></h1>
      <nav className='navbar'>
        <NavLink to='/'>Home</NavLink>
        {user.username === 'admin' ? <NavLink to='/users'>User List</NavLink> : null}
        <NavLink to='/games'>Games</NavLink>
        <input type='image' src='https://www.freeiconspng.com/uploads/basket-cart-icon-27.png' onClick={(e) => {e.preventDefault(); setCartView(!cartView)}} height='30' width='30'/>
        {cartView ? <Cart/> : null}

        {user.id ? ( 
          <div>
            <NavLink to='/account'>{user.username}</NavLink>
            <a href='#' onClick={handleLogout}>Log Out</a>
          </div>
          ) : (
          <div>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
          </div>
        )}
      </nav>
    </div> )
}

export default withRouter(Navbar)
