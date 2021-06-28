import axios from 'axios'

function setHeaders() {
  let token = localStorage.getItem('token')
  let config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {}
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
