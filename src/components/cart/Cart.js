import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function initializeCart() {
            setCartItems([])
        }
        initializeCart()
    })


    return (
        <div id='cart'>
            <h3>My Cart</h3>

            <button>Checkout</button>
        </div> );
};

export default Cart;