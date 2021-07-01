// require in the database adapter functions as you write them (createUser, createActivity...)
const client = require('./client');
const { 
  // user functions
  createUser, 
  // Game functions
  createGame, getAllGames,
  // Order functions
  createOrder, getOrdersWithoutGames,
  // Game Order functions
  addGameToOrder
} = require('./');

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
        "password" VARCHAR(255) NOT NULL
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
      
      CREATE TYPE status AS ENUM ('PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED');

      CREATE TABLE orders(
        "id" SERIAL PRIMARY KEY,
        "buyerId" INTEGER REFERENCES users(id),
        "payment" VARCHAR(255),
        "shippingLoc" TEXT,
        "orderStatus" status
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
ADD DATA BELOW AS NEEDED. This is default seed data, and will help you start testing
*/

async function createInitialUsers() {
  console.log('Starting to create users...')
  try {
    const usersToCreate = [
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
      { title: 'Pac-Man', description: 'Move the wheel of cheese around and eat them ghosts!', console: 'Atari 2600', price: 99, year: 1982, image: '' },
      { title: 'Space Invaders', description: 'Pew pew!', console: 'Atari 2600', price: 89, year: 1980, image: '' },
      { title: 'Donkey Kong', description: 'Avoid the barrels!', console: 'Atari 2600', price: 79, year: 1982, image: '' },
      { title: 'Ms. Pac-Man', description: 'Move the wheel of cheese with the bow on it and eat them ghosts!', console: 'Atari 2600', price: 69, year: 1983, image: '' },
      { title: 'Asteroids', description: 'Blast the asteroids before they crush you!', console: 'Atari 2600', price: 59, year: 1981, image: '' },
      { title: 'Frogger', description: 'Look both ways before you cross the street!', console: 'Atari', price: 49, year: 1982, image: '' },
      { title: 'Super Mario Bros.', description: 'Jump, squish, eat, repeat!', console: 'NES', price: 39, year: 1985, image: '' },
      { title: 'Duck Hunt', description: 'Move the wheel of cheese around and ear them ghosts!', console: 'NES', price: 39, year: 1984, image: '' },
      { title: 'Tetris', description: 'Make this puzzle, while it moves!', console: 'NES', price: 35, year: 1989, image: '' },
      { title: 'The Legend of Zelda', description: 'Move the wheel of cheese around and ear them ghosts!', console: 'NES', price: 35, year: 1986, image: '' },
      { title: 'Metroid', description: 'Stop the space pirates and retrieve the Metroid parasites!', console: 'NES', price: 29, year: 1971, image: '' },
      { title: 'Pokemon Red', description: 'Capture pocket monsters and battle against other trainers!', console: 'Gameboy', price: 25, year: 1996, image: '' },
      { title: 'Pokemon Yellow', description: 'Battle against other trainers with your best friend Pikachu!', console: 'Gameboy', price: 25, year: 1998, image: '' },
      { title: 'Sonic the Hedgehog', description: 'Run at supersonic speeds on your quest to defeat Dr. Robotnik!', console: 'Sega Genesis', price: 19, year: 1991, image: '' },
      { title: 'Mortal Kombat II', description: 'Defeat your oppponent in 1v1 combat and finish them with your fatality move!', console: 'Sega Genesis', price: 19, year: 1994, image: '' }
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
      {buyerId: 2, payment: 'Visa', shippingLoc: 'Chicago, IL', orderStatus: 'PROCESSING'},
      {buyerId: 1, payment: 'Mastercard', shippingLoc: 'Portland, OR', orderStatus: 'SHIPPED'},
      {buyerId: 3, payment: 'Paypal', shippingLoc: 'Cleveland, OH', orderStatus: 'CANCELED'},
      {buyerId: 2, payment: 'Check is its way', shippingLoc: 'Chicago, IL', orderStatus: 'DELIVERED'},
    ]
    const orders = await Promise.all(ordersToCreate.map(createOrder));
    console.log('Orders Created: ', orders)
    console.log('Finished creating orders.')
  } catch (error) {
    throw error;
  }
}

async function createInitialOrderGames() {
  try {
    console.log('starting to create order_games...');
    const [ firstOrder, secondOrder, thirdOrder, fourthOrder ] = await getOrdersWithoutGames();
    const [ game1, game2, game3, game4, game5, game6, game7 ] = await getAllGames();

    const orderGamesToCreate = [
      {
        orderId: firstOrder.id,
        gameId: game1.id,
        quantity: 2,
      },
      {
        orderId: firstOrder.id,
        gameId: game2.id,
        quantity: 1,
      },
      {
        orderId: secondOrder.id,
        gameId: game3.id,
        quantity: 3,
      },
      {
        orderId: secondOrder.id,
        gameId: game4.id,
        quantity: 1,
      },
      {
        orderId: thirdOrder.id,
        gameId: game5.id,
        quantity: 2,
      },
      {
        orderId: thirdOrder.id,
        gameId: game6.id,
        quantity: 1, 
      },
      {
        orderId: thirdOrder.id,
        gameId: game7.id,
        quantity: 1,
      },
      {
        orderId: fourthOrder.id,
        gameId: game6.id,
        quantity: 1, 
      },
      {
        orderId: fourthOrder.id,
        gameId: game7.id,
        quantity: 2, 
      },
    ]
    const orderGames = await Promise.all(orderGamesToCreate.map( ord => addGameToOrder(ord)));
    console.log('order_games created: ', orderGames)
    console.log('Finished creating order_games!')
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect()
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialGames()
    await createInitialOrders()
    await createInitialOrderGames()

    // create other data
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error
  }
}

module.exports = {
  rebuildDB,
}
