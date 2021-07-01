const client = require('./client');
const {
    createInsertString,
    createValueString,
    createSetString
} = require('./utils');

async function createOrder(fields) {
    const insert = createInsertString(fields)
    const values = createValueString(fields)

    try {
        const {
            rows: [newOrder]
        } = await client.query(`
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
        const {
            rows
        } = await client.query(`
            SELECT * FROM orders
        `)

        return rows;
    } catch (error) {
        throw error;
    };
};



async function updateOrder(id, fields) {
    try {
        const setString = createSetString(fields)
        if (setString.length === 0){
            return
        }

        const {
            rows: [updated]
        } = await client.query(`
    UPDATE orders
    SET ${ setString }
    WHERE id= ${id}
    RETURNING *;

`, Object.values(fields))
        return updated

    } catch (error) {
        throw error
    }

}


async function deleteOrder(id) {

    try {
        const {
            rows: [deleting]
        } = await client.query(`

DELETE FROM orders
WHERE id= ${id}
RETURNING *;

`)

        return deleting


    } catch (error) {
        throw error
    }

}

module.exports = {
    createOrder,
    getOrdersWithoutGames,
    updateOrder,
    deleteOrder
}