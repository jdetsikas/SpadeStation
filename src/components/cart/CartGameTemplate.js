import React from 'react'

const CartGameTemplate = ({game}) => {


    
    return (
        <div className='cart-item'>
            <img src={game.image} width='30' height='30'/>
            <a>{game.title} </a>
            <a>Quantity: 1</a>
        </div> );
}

export default CartGameTemplate;