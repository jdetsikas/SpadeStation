/*
///////////////////
// Requirements //
/////////////////
*/

const client = require('./client');
const { createInsertString, createValueString, createSetString } = require('./utils');

/*
////////////////
// Functions //
//////////////
*/

async function createOrder(fields) {
    try {
        const insert = createInsertString(fields)
        const values = createValueString(fields)

        const { rows: [newOrder] } = await client.query(`
            INSERT INTO orders(${insert})
            VALUES (${values})
            RETURNING *
        `, Object.values(fields));

        return newOrder;
    } catch (error) {
        throw error;
    };
};

async function getOrdersWithoutGames() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM orders
        `)

        return rows;
    } catch (error) {
        throw error;
    };
};

async function getUsersOrders(userId) {
    try {
        const { rows: orders } = await client.query(`
            SELECT * FROM orders
            WHERE "buyerId"=${userId}
        `)

        return orders
    } catch (error) {
        throw error;
    }
}

async function updateOrder(id, fields) {
    try {
        const setString = createSetString(fields)
        if (setString.length === 0) { return }

        const { rows: [updated] } = await client.query(`
            UPDATE orders
            SET ${ setString }
            WHERE id= ${id}
            RETURNING *
        `, Object.values(fields))

        return updated
    } catch (error) {
        throw error
    }

}


async function deleteOrder(id) {
    try {
        const { rows: [deleting] } = await client.query(`
            DELETE FROM orders
            WHERE id= ${id}
            RETURNING *;
        `)

        return deleting
    } catch (error) {
        throw error
    }
}

async function getOrderById(id){
    //return the order

    try{

        const {rows: [order]} = await client.query(`
        SELECT * FROM orders
        WHERE id =${id};
        `);

        return order

    }catch(error){
        throw error
    }
}

/*
//////////////
// Exports //
////////////
*/

module.exports = {
    createOrder,
    getOrdersWithoutGames,
    getUsersOrders,
    updateOrder,
    deleteOrder,
    getOrderById
}