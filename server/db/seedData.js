/*
///////////////////
// Requirements //
/////////////////
*/

const client = require('./client');
const testDB = require('./dbTest')
const { createUser, createGame, getAllGames, createOrder, getOrdersWithoutGames, addGameToOrder } = require('./');

/*
/////////////
// Tables //
///////////
*/

async function dropTables() {
    console.log('Dropping All Tables...');

    try {
        await client.query(`
            DROP TABLE IF EXISTS order_games;
            DROP TABLE IF EXISTS orders;
            DROP TYPE IF EXISTS status;
            DROP TABLE IF EXISTS games;
            DROP TABLE IF EXISTS users;
        `)
    } catch (error) {
        throw error;
    };
};
 
async function createTables() {
    try {
        console.log('Starting to build tables...')
        
        await client.query(`
            CREATE TABLE users(
                "id"  SERIAL PRIMARY KEY, 
                "username" VARCHAR(255) UNIQUE NOT NULL, 
                "password" VARCHAR(255) NOT NULL,
                "isActive" BOOLEAN default true
            );

            CREATE TABLE games(
                "id" SERIAL PRIMARY KEY,
                "title" VARCHAR(255) NOT NULL,
                "description" TEXT NOT NULL,
                "price" DECIMAL(2) NOT NULL,
                "console" VARCHAR(255) NOT NULL,
                "year" INTEGER NOT NULL,
                "image" TEXT
            );
            
            CREATE TYPE status AS ENUM ('CART', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED');

            CREATE TABLE orders(
                "id" SERIAL PRIMARY KEY,
                "buyerId" INTEGER REFERENCES users(id),
                "payment" VARCHAR(255),
                "shippingLoc" TEXT,
                "orderStatus" status DEFAULT 'CART'
            );

            CREATE TABLE order_games(
                "id" SERIAL PRIMARY KEY,
                "orderId" INTEGER REFERENCES orders(id),
                "gameId" INTEGER REFERENCES games(id),
                "quantity" INTEGER NOT NULL,
                "purchCost" DECIMAL(2) NOT NULL
            );
        `);

        console.log('Finished building tables!')
    } catch (error) {
        console.error('Error building tables!')
        throw error
    }
}

/*
///////////////////
// Initial Data //
/////////////////
*/

async function createInitialUsers() {
    try {
        console.log('Starting to create users...')

        const usersToCreate = [
            { username: 'admin', password: 'password' },
            { username: 'albert', password: 'bertie99' },
            { username: 'sandra', password: 'sandra123' },
            { username: 'glamgal', password: 'glamgal123' },
        ]
        const users = await Promise.all(usersToCreate.map(createUser))

        console.log('Users created:')
        console.log(users)

        console.log('Finished creating users!')
    } catch (error) {
        console.error('Error creating users!')
        throw error
    }
}

async function createInitialGames() {
    try {
        console.log('Starting to create games...');

        const gamesToCreate = [
            { title: 'Pac-Man', description: 'Move the wheel of cheese around and eat them ghosts!', console: 'Atari 2600', price: 99, year: 1982, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/atari_2600/a2600_pacmanvcs_thumb.jpg' },
            { title: 'Space Invaders', description: 'Pew pew!', console: 'Atari 2600', price: 89, year: 1980, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/atari_2600/a2600_spaceinvaders_au_thumb.jpg' },
            { title: 'Donkey Kong', description: 'Avoid the barrels!', console: 'Atari 2600', price: 79, year: 1982, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/atari_2600/a2600_donkeykong_thumb.jpg' },
            { title: 'Ms. Pac-Man', description: 'Move the wheel of cheese with the bow on it and eat them ghosts!', console: 'Atari 2600', price: 69, year: 1983, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/atari_2600/a2600_mspacman_thumb.jpg' },
            { title: 'Asteroids', description: 'Blast the asteroids before they crush you!', console: 'Atari 2600', price: 59, year: 1981, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/atari_2600/a2600_asteroids_au_thumb.jpg' },
            { title: 'Frogger', description: 'Look both ways before you cross the street!', console: 'Atari 2600', price: 49, year: 1982, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/atari_2600/a2600_frogger_thumb.jpg' },
            { title: 'Super Mario Bros.', description: 'Jump, squish, eat, repeat!', console: 'NES', price: 39, year: 1985, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/nes/nes_supermariobros_thumb.jpg' },
            { title: 'Duck Hunt', description: 'Move the wheel of cheese around and ear them ghosts!', console: 'NES', price: 39, year: 1984, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/nes/nes_duckhunt_thumb.jpg' },
            { title: 'Tetris', description: 'Make this puzzle, while it moves!', console: 'NES', price: 35, year: 1989, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/nes/nes_tetris_thumb.jpg' },
            { title: 'The Legend of Zelda', description: 'Move the wheel of cheese around and ear them ghosts!', console: 'NES', price: 35, year: 1986, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/nes/nes_legendofzelda_thumb.jpg' },
            { title: 'Metroid', description: 'Stop the space pirates and retrieve the Metroid parasites!', console: 'NES', price: 29, year: 1971, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/nes/nes_metroid_thumb.jpg' },
            { title: 'Pokemon Red', description: 'Capture pocket monsters and battle against other trainers!', console: 'Gameboy', price: 25, year: 1996, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/gameboy/gb_pokemonred_thumb.jpg' },
            { title: 'Pokemon Yellow', description: 'Battle against other trainers with your best friend Pikachu!', console: 'Gameboy', price: 25, year: 1998, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/gameboy/gb_pokemonyellow_au_thumb.jpg' },
            { title: 'Sonic the Hedgehog', description: 'Run at supersonic speeds on your quest to defeat Dr. Robotnik!', console: 'Sega Genesis', price: 19, year: 1991, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/genesis/genesis_sonic_thumb.jpg' },
            { title: 'Mortal Kombat', description: 'Defeat your oppponent in 1v1 combat and finish them with your fatality move!', console: 'Sega Genesis', price: 19, year: 1994, image: 'https://coverproject.sfo2.cdn.digitaloceanspaces.com/genesis/genesis_mortalkombat_pal_thumb.jpg' }
        ]
        const games = await Promise.all(gamesToCreate.map(createGame));

        console.log('games created:');
        console.log(games);

        console.log('Finished creating games!');
    } catch (error) {
        console.error('Error creating games!');
        throw error;
    }
}

async function createInitialOrders() {
    try {
        console.log('starting to create orders...');

        const ordersToCreate = [
        {buyerId: 2, payment: 'Visa', shippingLoc: 'Chicago, IL', orderStatus: 'DELIVERED'},
        {buyerId: 2, payment: 'Visa', shippingLoc: 'Chicago, IL', orderStatus: 'SHIPPED'},
        {buyerId: 3, payment: 'Paypal', shippingLoc: 'Cleveland, OH', orderStatus: 'CANCELED'},
        {buyerId: 4, payment: 'Check is on its way', shippingLoc: 'Portland, OR', orderStatus: 'DELIVERED'},
        ]
        const orders = await Promise.all(ordersToCreate.map(createOrder));

        console.log('Orders Created: ', orders)

        console.log('Finished creating orders.')
    } catch (error) {
        console.error('Error creating orders!');
        throw error;
    }
}

async function createInitialOrderGames() {
    try {
        console.log('starting to create order_games...');

        const [ firstOrder, secondOrder, thirdOrder, fourthOrder ] = await getOrdersWithoutGames();
        const [ game1, game2, game3, game4, game5, game6, game7 ] = await getAllGames();

        const orderGamesToCreate = [
            // First order
            { orderId: firstOrder.id, gameId: game1.id, quantity: 2 },
            { orderId: firstOrder.id, gameId: game2.id, quantity: 1 },
            // Second order
            { orderId: secondOrder.id, gameId: game3.id, quantity: 3 },
            { orderId: secondOrder.id, gameId: game4.id, quantity: 1 },
            // Third Order
            { orderId: thirdOrder.id, gameId: game5.id, quantity: 2 },
            { orderId: thirdOrder.id, gameId: game6.id, quantity: 1 },
            { orderId: thirdOrder.id, gameId: game7.id, quantity: 1 },
            // Fourth order
            { orderId: fourthOrder.id, gameId: game6.id, quantity: 1 },
            { orderId: fourthOrder.id, gameId: game7.id, quantity: 2 },
        ]
        const orderGames = await Promise.all(orderGamesToCreate.map( ord => addGameToOrder(ord)));

        console.log('order_games created: ', orderGames)
        
        console.log('Finished creating order_games!')
    } catch (error) {
        console.error('Error creating order games!');
        throw error;
    }
}

/*
///////////////
// Build DB //
/////////////
*/

async function rebuildDB() {
    try {
        client.connect()
        await dropTables()
        await createTables()
        await createInitialUsers()
        await createInitialGames()
        await createInitialOrders()
        await createInitialOrderGames()
        // await testDB()
    } catch (error) {
        console.log('Error during rebuildDB')
        throw error
    }
}

module.exports = {
    rebuildDB
}
