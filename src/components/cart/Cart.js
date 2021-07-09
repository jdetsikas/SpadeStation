import React, {useEffect} from 'react'
import CartGameTemplate from './CartGameTemplate'

const Cart = ({cartGames, setCartGames}) => {

    let cartList = cartGames.map((game, idx) => <CartGameTemplate game={game} key={idx} /> )

    return (
        <div id='cart'>
            <h2>Cart</h2>
            {cartList.length ? cartList : <a>Cart Is Empty</a>}
            <button>Checkout</button>
        </div> );
}

export default Cart
