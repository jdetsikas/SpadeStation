import React, {useState, useEffect} from 'react'
import axios from 'axios';
import CartGameTemplate from './CartGameTemplate'
import GameListTemplate from './GameListTemplate'
import './Cart.css'


const Checkout = (props) =>{
    const {orderId, cartGames, setCartGames, cart, user} = props;

    const [pay, setPay] = useState(null)
    const [shipping, setShipping] = useState('')
    const [subOrder, setSubOrder] = useState({})
    const [subbed, setSubbed] = useState(false)

    const payments = ['VISA', 'MasterCard', 'Discover', 'AmEx', 'Apple Pay', 'GPay', 'PayPal', 'Venmo' ];

    let token = localStorage.getItem('token')

    const handleSubmit =  async () =>{
        event.preventDefault()

        if (!user.id) {
            return location.assign('/login')
        }

        if (!cartGames.length) {
            return location.assign('/')
        }

        try{
            const {data: newAlias} = await axios({
                method: 'PATCH',
                url: `/api/checkout/${orderId}`,
                data: {

                    'payment': pay,
                    'shippingLoc': shipping
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            })
    
            setSubOrder(newAlias)
            setSubbed(true)
        }catch(error){
            window.console.error(error);
        }
    }

    const cartList = cartGames.map((game, index) => <CartGameTemplate game = {game} key = {index} cartGames={cartGames} setCartGames={setCartGames} cart={cart}/>)
    const confGames = cartGames.map((game, index) => <GameListTemplate game={game} key={index}/>)

    return(
        <div className='checkout'>
            
            <div className = 'chform'>
            <form className = 'formpay' onSubmit={() => handleSubmit(cartList)} >

                <h1>Checkout</h1>

                <div className = 'thecartlist'>
                    {cartList}
                </div>

                <label className = 'loc1'> Shipping Address: </label>
                <div className = 'toship'>
                    <input type ='text' className='location1' value={shipping} onChange={(event) => setShipping(event.target.value)} required/>
                </div>
               

                <select className = 'dropdown' onChange = { (event) => setPay(event.target.value) } required>
                        <option 
                        // value ='null'
                        >Select Payment</option>
                        {
                            payments.map((payment, index) => {
                                return(
                                    <option key = {index} value = {payment} >
                                        {payment}
                                    </option>
                                )
                            })
                        }
                        

                </select>

                    <button type ='submit' className = 'ordersubmit'> Submit </button>
                    <button type='button' onClick={() => {
                        location.assign('/')
                    }}>Cancel</button>
                </form>
            </div>

            <div id='confirmation' className={subbed ? 'show' : 'hide'}>
                <form>
                    <h2>Order Id: {subOrder.id} </h2>
                    <h2>Payment: {subOrder.payment}</h2>
                    <h2>Shipping To: {subOrder.shippingLoc}</h2>
                    <h2>Order Contents: </h2>
                    {confGames}
                    <button type='button' onClick={() => location.assign('/')}>Home</button>
                </form>
            </div>
        </div> )
}

export default Checkout;