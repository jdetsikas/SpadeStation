import {useState, useEffect} from 'react';



function App() {
  const PAGE_PRODUCT = 'products'
  const PAGE_CART = 'cart'
  const cartFromLoacalstorage = JSON.parse(localStorage.getItem("cart") ||"[]")

  const [ page, setPage ] = useState(PAGE_PRODUCT)
  const [ cart, setCart ] = useState(cartFromLoacalstorage)
    
  

  useEffect(() => {
   localStorage.setItem("cart", JSON.stringify(cart))
    
  }, [cart])
 

  const [ products ] = useState([
   {
     name : 'Ball',
     cost: '$50.00',
     image : 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQoa9aE-2Gk9hPyAL02GzaIXuqz75sxNDNmfSSBtDTOem0gPwsDJBW2Lm0bbM2Lkt5bK-LZpfDDOw&usqp=CAc'
   },
   {
    name : 'Shoes',
    cost : '$20.00',
    image : 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQy24Xi39q-smu3UM3Wn8fKMc7eZYcE7qb-VJBu7StPWTzpI4c4ysHZLzR0xis9V0xzyh8suWeppQ&usqp=CAc'
  },
  
  {
    name : 'Shoes',
    cost : '$20.00',
    image : 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQy24Xi39q-smu3UM3Wn8fKMc7eZYcE7qb-VJBu7StPWTzpI4c4ysHZLzR0xis9V0xzyh8suWeppQ&usqp=CAc'
  }




  ])
      //Now Adding to carte
  const addTocart = (product) => {
    setCart([...cart, product])
    console.log('PRODUCT ADDED TO CART',product)
  }

//navigate to both sections cart and products
  const navigateTo = (nextPage) => {
    setPage(nextPage)
  }
  

  const removeFromCart = (productTomeRemove) => {
    setCart(
      cart.filter(products => products !== productTomeRemove )
      )
  }

  //render products

  const renderProducts = () => (

    <>
<h1>Products</h1>
      <div className="products">
      {products.map((product, idx) => (
      
        <div className="product" key={idx}>
        <h3>{product.name}</h3>
        <h4>{product.cost}</h4>
        <img src={product.image} alt={product.image} />
      
        <button onClick={ () => addTocart(product)} >
        Add to Carte
        </button>
        
        
        </div>
      ))}
      </div>
      </>
    )
  
  ;
  
const chekOut = () => (


  <h1>checkout</h1>
)




  const renderCart = () => (

   
    <>
       <h1>Cart</h1>
      
      <div className="products">
      {cart.map((product, idx) => (
      
        <div className="product" key={idx}>
         <h3>{product.name}</h3>
         <h4>{product.cost}</h4>
         <img src={product.image} alt={product.image} />
      
          <button onClick={ () => removeFromCart(product)} >
          Remove</button>
          
          </div>
        ))}
        </div>
        </>
    )
      
      
  
  


  return (
    <div className="App">
      <header>
        
        <div className="length"> 
        <h2>{cart.length}</h2>
        </div>
        <button onClick={() => navigateTo(PAGE_PRODUCT)}> View Products</button>
        <button id='cart' onClick={()=> navigateTo(PAGE_CART)}> </button>

      </header>


      {page  === PAGE_PRODUCT  && renderProducts() }
      {page === PAGE_CART && renderCart(console.log("CART SECTION")) }
    </div>
  );


  

    
  }

export default App;
