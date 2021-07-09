import React, {useState} from 'react'
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import CartGameTemplate from './CartGameTemplate'


const Checkout = (props) =>{
    const {orderId, cartGames} = props;
    // console.log('the order id', orderId)
    const [pay, setPay] = useState(null)
    const [shipping, setShipping] = useState('')

    

    // const [billing, setBilling] = useState('')

    {/* 'VISA', 'MasterCard', 'Discover', 'AmEx', 'Apple Pay', 'GPay', 'PayPal', 'Venmo' */}
    const payments = ['VISA', 'MasterCard', 'Discover', 'AmEx', 'Apple Pay', 'GPay', 'PayPal', 'Venmo' ];

    // console.log(typeof shipping, 'the shipping:', shipping)

    // console.log(typeof billing, 'the billing:', billing)

    // console.log(typeof pay,'selected pay -------', pay)

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

   const cartList = cartGames.map((game,index) => <CartGameTemplate game = {game} key = {index} />)



    return(

        <>
        {/* ------------------Cart GAMes-------------------- */}


        <div className = 'thecartlist'>
            {cartList}
        </div>




        {/* ------------------Payment form-------------------- */}
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
            



        </>


    )



}

export default Checkout;