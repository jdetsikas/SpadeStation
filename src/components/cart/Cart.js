import { React,useState } from 'react';
import CartGameTemplate from './CartGameTemplate'
import {Addtocarte} from './Addtocart'
import total from './Addtocart'
const Cart = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    // const cartList = cartGames.map( (game, idx) => <CartGameTemplate key={idx} game={game}/> )

//     return (
//         <div id='cart'>
//             <h3>My Cart</h3>
//             {/* {cartList.length ? cartList : <a>Cart Is Empty</a>} */}
//             <button>Checkout</button>
//         </div> );
// };

return (
    <div id='cart'>
      <div className='row justify-content-center'>
        {products.map((item) => (
          <div className='col-3' key={item.id}>
            <div className="card"  >
              <img src={item.url} className="card-img-top" />
              <div className="card-body">
                <h6 className="card-title">
                  {item.name} - $ {item.price}
                </h6>
                {
                  item.cart == false
                  &&
                  //nutton add to cart
                  <button className='btn btn-primary' onClick={() => addtocart(item)}>
                    Add to cart
                </button>
                }
                {
                  item.cart == true
                  &&
                  <button className='btn btn-success' onClick={() => addtocart(item)}>
                    Added
                </button>
                }
              </div>
            </div>
          </div>

        ))}

      </div>

      <div className='row mt-3'>
        <table className="table  text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map((i, index) => (

                < tr key={i.id}>
                  <th scope="row">{index + 1}</th>
                  <th scope="row">
                    <img src={i.url} style={{ width: '4rem' }} />
                  </th>
                  <td>{i.name}</td>
                  <td>
                    {i.price}
                  </td>
                  <td>
                    <button
                      onClick={() => decrease(i)}
                      className="btn btn-primary btn-sm"
                    >
                      -
                      </button>
                    {i.quantity}
                    <button
                      onClick={() => increase(i)}

                      className="btn btn-primary btn-sm"
                      size="sm"
                    >
                      +
                      </button>
                  </td>

                  <td>
                    <button onClick={() => removetocart(i)} className="btn btn-danger">
                      Remove
                      </button>
                  </td >
                </tr >
              ))
            }
          </tbody>
        </table>
      </div>
      <div class="row">
        <div class="col text-center">
          <h4>TOTAL: {total()}</h4>
        </div>
      </div>
    </div >
  );
        }
export default Cart;