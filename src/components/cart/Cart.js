/*
///////////////////
// Requirements //
/////////////////
*/

import React from 'react'
// import Routes from './Routes'
import CartGameTemplate from './CartGameTemplate'
import { clearCart } from './CartFuncs'
// import { Route } from 'react-router'
import Checkout from './Checkout'
import { Link } from 'react-router-dom'

/*
/////////////////
// Components //
///////////////
*/

const Cart = ({ cartGames, setCartGames, cart, setCartView}) => {
    

    //  const handleClick = async () =>{

    // // //     // event.preventDefault();
    // // //     // console.log('click')
    // // //     // setShowCheckout(!showCheckout);
    // // //     // console.log('after',showCheckout)
       
    // //     <Link to ='/checkout' />

    //     window.location.reload()
    // }

    
    let cartList = cartGames.map((game, idx) => {
        return <CartGameTemplate key={idx} game={game} cartGames={cartGames} setCartGames={setCartGames} cart={cart}/>
    })

    return (
        <div id='cart'>
            <h2>Cart</h2>
            {cartList.length ? cartList : <a>Cart Is Empty</a>}
            <button onClick={() => clearCart(setCartGames, cart)}>Clear Cart</button>
            
            <Link to ='/checkout' > <button onClick = {() => setCartView(false) }> Checkout</button> </Link>
            {/* <button  
            onClick = { () => handleClick() }
            >Checkout</button> */}
            {/* <Link to ='/checkout' /> */}
             {/* {showCheckout ? <Checkout orderId = {cart.id} cartGames = {cartGames} /> : <div> </div>}  */}
            
        </div> );
}

export default Cart