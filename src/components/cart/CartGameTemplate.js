/*
///////////////////
// Requirements //
/////////////////
*/

import React, { useState } from 'react'
import { removeFromCart, increaseQuant, decreaseQuant } from './CartFuncs'

/*
/////////////////
// Components //
///////////////
*/

const CartGameTemplate = (props) => {
    const {game, cartGames, setCartGames, cart} = props
    const { id, title, description, console, year, price, image, quantity } = game

    const [quant, setQuant] = useState(quantity)

    return (
        <div className='cart-item'>
            <img src={game.image} width='30' height='30'/>
            <a>{title}</a>
            <a>${price}</a>
            <a>Copies: {quant}</a>
            <button type='button' onClick={() => decreaseQuant(game, cartGames, setCartGames, cart, quant, setQuant)}>-</button>
            <button type='button' onClick={() => increaseQuant(game, cart, quant, setQuant)}>+</button>
            <button type='button' onClick={() => removeFromCart(game, cartGames, setCartGames, cart)}>Remove</button>
        </div> );
}

export default CartGameTemplate;