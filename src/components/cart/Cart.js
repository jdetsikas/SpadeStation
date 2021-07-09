/*
///////////////////
// Requirements //
/////////////////
*/

import React from 'react'
import CartGameTemplate from './CartGameTemplate'
import { clearCart } from './CartFuncs'

/*
/////////////////
// Components //
///////////////
*/

const Cart = ({ cartGames, setCartGames, cart }) => {
    let cartList = cartGames.map((game, idx) => {
        return <CartGameTemplate key={idx} game={game} cartGames={cartGames} setCartGames={setCartGames} cart={cart}/>
    })

    return (
        <div id='cart'>
            <h2>Cart</h2>
            {cartList.length ? cartList : <a>Cart Is Empty</a>}
            <button onClick={() => clearCart(setCartGames, cart)}>Clear Cart</button>
            <button>Checkout</button>
        </div> );
}

export default Cart