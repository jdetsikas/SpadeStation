const client = require('./client');
const { createInsertString, createValueString } = require('./utils');

async function createOrder(fields) {
    const insert = createInsertString(fields)
    const values = createValueString(fields)
    
    try {
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

module.exports = {
    createOrder,
    getOrdersWithoutGames
}