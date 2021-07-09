import React, { useState } from 'react'
import axios from 'axios'


export async function addToCart(e, item, cartGames, setCartGames) {
  e.preventDefault()
  let token = localStorage.getItem('token')

  const found = cartGames.filter((game) => game.id === item.id)

  if (!found.length){
    if (token) {
      await axios({
        method: 'POST',
        url: '/api/order_games/',
        data: {
          'gameId': item.id
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
    }

    item.quantity = 1
    setCartGames([...cartGames, item])
  } else {
    return
  }
}

export async function removeFromCart(item, setCart) {
    let cart2 = cart.filter((i) => i.id != item.id)
    products.map((i) => {
      if (i.id == item.id) {
        i.cart = false
      }
    })
    setCart(cart2)

}

export async function increaseQuant(item, setCart) {
    let x = cart.map((i) => {

      if (item.id == i.id) {
        console.log('hola')
        i.quantity += 1
      }
      return i
    })
    setCart(x)

}

export async function decreaseQuant(item, setCart) {
    let x = cart.map((i) => {

      if (item.id == i.id && i.quantity > 1) {
        console.log('hola')
        i.quantity -= 1
      }
      return i
    })
    setCart(x)
}

export async function calcTotal() {
    let x = 0
    cart.map((i) => {
      x += i.price * i.quantity

    })
    return x
}