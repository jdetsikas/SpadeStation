import {React, useState } from 'react'


// const [products, setProducts] = useState([])
// adding items
const Addtocart = () => {

const [cart, setCart] = useState([]) 

function add(item) {
    let cart2 = [...cart]
    cart2.push({ ...item })
    products.map((i) => {
      if (i.id == item.id) {
        i.cart = true
      }
    })
    setCart(cart2)

  }

  function removetocart(item) {
    let cart2 = cart.filter((i) => i.id != item.id)
    products.map((i) => {
      if (i.id == item.id) {
        i.cart = false
      }
    })
    setCart(cart2)

  }


   function increase(item) {
    let x = cart.map((i) => {

      if (item.id == i.id) {
        console.log('hola')
        i.quantity += 1
      }
      return i
    })
    setCart(x)

  }


  function decrease(item) {
    let x = cart.map((i) => {

      if (item.id == i.id && i.quantity > 1) {
        console.log('hola')
        i.quantity -= 1
      }
      return i
    })
    setCart(x)
  }


   function total() {
    let x = 0
    cart.map((i) => {
      x += i.price * i.quantity

    })
    return x
  }

  

    }
export default Addtocart
