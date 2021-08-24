/*
///////////////////
// Requirements //
/////////////////
*/

import React from 'react'
import CartGameTemplate from './CartGameTemplate'
import { clearCart } from './CartFuncs'
import './Cart.css'

async function beginCheckout(cartGames, setCartView) {
    if (!cartGames.length) {
        return
    }
    setCartView(false)
    location.assign('/checkout')
}

/*
/////////////////
// Components //
///////////////
*/

const Cart = ({ cartGames, setCartGames, cart, total, setTotal, cartView, setCartView }) => {
    let cartList = cartGames.map((game, idx) => {
        return <CartGameTemplate key={idx} game={game} cartGames={cartGames} setCartGames={setCartGames} cart={cart}/>
    })

    return (
        <div id='cart' className={cartView ? 'show' : 'hide'}>
            <div className='contents'>
                <button className='close-cart' onClick={() => setCartView(false)}>x</button>
                <h2>Cart</h2>
                <div className='cart-list'>
                    {cartList.length ? cartList : <a>Cart Is Empty</a>}
                </div>
                <button type='button' onClick={() => clearCart(setCartGames, cart)}>Clear Cart</button>
                <button type='button' onClick={() => beginCheckout(cartGames, setCartView)}>Checkout</button>
            </div>
        </div> );
}

export default Cart