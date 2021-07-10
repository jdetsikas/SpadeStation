/*
///////////////////
// Requirements //
/////////////////
*/

import axios from 'axios'
let token = localStorage.getItem('token')

/*
////////////////
// Functions //
//////////////
*/

export async function addToCart(item, cartGames, setCartGames, cartView, setCartView) {
  event.preventDefault()
  
  if (!cartView) {
    setCartView(true)
  }

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

/*
// Removal //
*/

export async function removeFromCart(item, cartGames, setCartGames, cart) {
  const newCart = cartGames.filter((game) => game.id !== item.id)

  if (token){
    await axios({
      method: 'DELETE',
      url: `/api/order_games/${cart.id}`,
      data: {
        'gameId': item.id
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    
    setCartGames(newCart)
  } else {
    setCartGames(newCart)
  }
}

export async function clearCart(setCartGames, cart) {
  if (token) {
    try {
      await axios({
        method: 'DELETE',
        url: `/api/order_games/${cart.id}/all`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (error) {
      throw error
    }
  }
  
  setCartGames([])
}

/*
// Quantitites //
*/

export async function increaseQuant(item, cart, quant, setQuant) {
  if (token) {
    try {
      await axios({
          method: 'PATCH',
          url: `/api/order_games/${cart.id}`,
          data: {
            'gameId': item.id,
            'quantity': quant + 1,
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
      })
    } catch (error) {
      throw error
    }
  }
  setQuant(quant + 1)
}

export async function decreaseQuant(item, cartGames, setCartGames, cart, quant, setQuant) {
  if (quant === 1) {
    return removeFromCart(item, cartGames, setCartGames, cart)
  }

  if (token) {
    try {
      await axios({
        method: 'PATCH',
        url: `/api/order_games/${cart.id}`,
        data: {
          'gameId': item.id,
          'quantity': quant -1,
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (error) {
      throw error
    }
  }

  setQuant(quant - 1)
}

/*
// Total //
*/

export async function calcTotal(cartGames) {
  const cartQuants = cartGames.map(game => parseFloat(game.quantity))
  const cartPrices = cartGames.map(game => parseFloat(game.price))

  let runningTotal = 0

  for (let i = 0; i < cartPrices.length; i++) {
    runningTotal = runningTotal + (cartPrices[i] * cartQuants[i])
  }

  return runningTotal
}