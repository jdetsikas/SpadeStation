import React from 'react';
import CartGameTemplate from './CartGameTemplate'

const Cart = ({cartGames, setCartGames}) => {

    // const cartList = cartGames.map( (game, idx) => <CartGameTemplate key={idx} game={game}/> )

    return (
        <div id='cart'>
            <h3>My Cart</h3>
            {/* {cartList.length ? cartList : <a>Cart Is Empty</a>} */}
            <button>Checkout</button>
        </div> );
};

export default Cart;