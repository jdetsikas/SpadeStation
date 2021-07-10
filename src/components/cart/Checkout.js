import React, {useState} from 'react'
import axios from 'axios';
import CartGameTemplate from './CartGameTemplate'


const Checkout = (props) =>{
    const {orderId, cartGames, setCartGames, cart} = props;

    const [pay, setPay] = useState(null)
    const [shipping, setShipping] = useState('')

    const payments = ['VISA', 'MasterCard', 'Discover', 'AmEx', 'Apple Pay', 'GPay', 'PayPal', 'Venmo' ];

    let token = localStorage.getItem('token')

   const handleSubmit =  async (event) =>{
       event.preventDefault();

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
        
        window.console.log('Check out:', newAlias)
       }catch(error){
            window.console.error(error);
       }
   }

   const cartList = cartGames.map((game,index) => <CartGameTemplate game = {game} key = {index} cartGames={cartGames} setCartGames={setCartGames} cart={cart}/>)



    return(

        <>
      

        <div className = 'checkout'>

            <h1>Checkout</h1>
        {/* <div className = 'thecartlist'>
            {cartList}
        </div> */}

        <div className = 'chform'>

        <form className = 'formpay' onSubmit = {handleSubmit} >


            <label className = 'loc1'> Shipping Address: </label>
                <div className = 'toship'>
                    <input type ='text' className = 'location1' onChange = {(event) => setShipping(event.target.value)} />

                </div>


            {/* 
            <label className = 'loc2'>Billing Address: </label>
                    <div className = 'tobill'>
                        <input type = 'text' className = 'location2' onChange = {(event) => setBilling(event.target.value)}/>
                    </div> 
            */}

            <select className = 'dropdown' onChange = { (event) => setPay(event.target.value) }>
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

            </form>


        </div>
            
        </div>


        </>


    )



}

export default Checkout;