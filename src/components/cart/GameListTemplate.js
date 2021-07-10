/*
///////////////////
// Requirements //
/////////////////
*/

import React from 'react'

/*
/////////////////
// Components //
///////////////
*/

const GameListTemplate = (props) => {
    const {game} = props
    const { title, price, image, quantity } = game

    return (
        <div className='cart-item'>
            <img src={image} width='30' height='30'/>
            <a>{title}</a>
            <a>${price}</a>
            <a>Copies: {quantity}</a>
        </div> );
}

export default GameListTemplate;