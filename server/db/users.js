/*
///////////////////
// Requirements //
/////////////////
*/

const client = require('./client')
const bcrypt = require('bcrypt')
const SALT_COUNT = 10

const { createSetString } = require('./utils')

/*
////////////////
// Functions //
//////////////
*/

/////////////
// Create //
///////////

async function createUser({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, password) VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING 
            RETURNING id, username
        `, [username, hashedPassword])

        return user
    } catch (error) {
        throw error
    }
}

///////////
// Read //
/////////

async function getAllUsers() {
    try {
        const { rows: users } = await client.query(`
            SELECT * FROM users
        `)

        return users
    } catch (error) {
        throw error
    }
}

async function getAllActiveUsers() {
    try {
        const { rows: activeUsers } = await client.query(`
            SELECT * FROM users
            WHERE "isActive"=true
        `)

        return activeUsers
    } catch (error) {
        throw error
    }
}

async function getUser({ username, password }) {
    if (!username || !password) { return }

    try {
        const user = await getUserByUsername(username)
        if (!user) { return }

        const hashedPassword = user.password
        const passwordsMatch = await bcrypt.compare(password, hashedPassword)
        if (!passwordsMatch) { return }

        delete user.password
        
        return user
    } catch (error) {
        throw error
    }
}

async function getUserById(userId) {
    try {
        // first get the user
        const { rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE id = $1;
        `, [userId])

        // if it doesn't exist, return null
        if (!user) return null

        // if it does: delete the 'password' key from the returned object
        delete user.password

        return user
    } catch (error) {
        throw error
    }
}

async function getUserByUsername(userName) {
    // first get the user
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM users
            WHERE username = $1;
        `, [userName])

        // if it doesn't exist, return null
        if (!rows || !rows.length) return null

        // if it does: delete the 'password' key from the returned object
        const [user] = rows
        // delete user.password;
        return user
    } catch (error) {
        throw error
    }
}

/////////////
// Update //
///////////

async function updateUser(id, fields) {
    try {
        const setString = createSetString(fields)
        if (setString.length === 0) { return }

        const { rows: [user] } = await client.query(`
            UPDATE users
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields))

        return user
    } catch (error) {
        throw error
    }
}

/////////////
// Delete //
///////////

async function deactivateUser(id) {
    try { 
        const { rows: [deactivatedUser] } = await client.query(`
            UPDATE users
            SET "isActive"=false
            WHERE id=${id}
            RETURNING *;
        `)

        return deactivatedUser
    } catch (error) {
        throw error
    }
}

//activate users
async function activateUser(id) {
    try { 
        const { rows: [activatedUser] } = await client.query(`
            UPDATE users
            SET "isActive"=true
            WHERE id=${id}
            RETURNING *;
        `)

        return activatedUser
    } catch (error) {
        throw error
    }
}


/*
//////////////
// Exports //
////////////
*/

module.exports = {
    createUser,
    getAllUsers,
    getAllActiveUsers,
    getUser,
    getUserById,
    getUserByUsername,
    updateUser,
    deactivateUser,
    activateUser,
}