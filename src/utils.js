import axios from 'axios'

function setHeaders() {
  let token = localStorage.getItem('token')
  let config = token ? {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } : {}
  return config
}

/**
 * If logged on returns user data and json web token.  If not logged on, an error will be thrown
 * And no data will be returned
 *
 * @returns {
 *      user: {
 *          username: String,
 *          password: String
 *      },
 *      token: JSonWebToken
 *  }
 */
export async function checkLogin() {
  try {
    let { data } = await axios.get('/api/users/me', setHeaders())
    // if data has an id and user the user is logged on
    return data
  } catch (err) {
    console.log('checkLogin(): User is not logged on.\n', err)
    return err
  }
}

// sets the user data if logged in
export async function setUserData(props, setUser) {
  let data = await checkLogin()
  console.log("User:", data)
  if (!data.id) {
    // no user, return to login
    props.history.push('/login')
  } else {
    setUser(data)
  }
}

/**
 *  Login
 *
 *  @param username - Name of the user
 *  @param password - Users' password
 *
 *  @returns {
 *      user: {
 *          username: String,
 *          password: String
 *      },
 *      token: JSonWebToken
 *  }
 */
export async function login(username, password) {
  try {
    const { data } = await axios.post('/api/users/login', {
      username,
      password,
    })
    if (data.token) {
      setToken(data.token)
    }
    return data
  } catch (err) {
    console.error('login(): Unable to login.\n', err)
    // returns error to be handled.
    return err
  }
}

/**
 *  Register
 *
 *  @param username - Name of the user
 *  @param password - Users' password
 *
 *  @returns {
 *      user: {
 *          username: String,
 *          password: String
 *      },
 *      token: JSonWebToken
 *  }
 */
export async function register(username, password) {
  try {
    const { data } = await axios.post('/api/users/register', {
      username,
      password,
    })
    if (data.token) {
      setToken(data.token)
    }
    return data
  } catch (err) {
    console.error('register(): Unable to register user.\n', err)
    // returns error to be handled
    return err
  }
}

function setToken(token) {
  localStorage.setItem('token', token)
}

export async function initializeCart(userId, ordersArr) {
  // There should only ever by 1 order per user with status of 'CART'
  const filteredOrders = ordersArr.filter( (order) => order.orderStatus === 'CART')
  const token = localStorage.getItem('token')

  // If that order doesn't exist, create it
  if (!filteredOrders.length) {
    const { data: newOrder} = await axios({
      method: 'post',
      url: '/api/orders',
      data: {
        'buyerId': userId
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })

    // Create a games array to populate with games
    newOrder.games = []
    return newOrder
  }

  // If 'CART' order already exists, fetch its games and populate games array for the front-end
  const { data: games } = await axios.get(`/api/order_games/${filteredOrders[0].id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  filteredOrders[0].games = games
  
  return filteredOrders[0]
}