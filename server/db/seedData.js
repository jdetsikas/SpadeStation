// require in the database adapter functions as you write them (createUser, createActivity...)
const { createUser } = require('./');
const client = require('./client');

async function dropTables() {
  console.log('Dropping All Tables...');
  // drop all tables, in the correct order

  //  Add more tables as you need them
  try {
    await client.query(`
    DROP TABLE IF EXISTS order_games;
    DROP TABLE IF EXISTS orders;
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
    // create all tables, in the correct order

    // User's Table
    await client.query(`
      CREATE TABLE users(
        id  SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE games(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        console VARCHAR(255) NOT NULL,
        year INTEGER NOT NULL
      );

      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        buyerId INTEGER REFERENCES users(id),
        payment VARCHAR(255),
        shippingLoc TEXT,
        orderStatus VARCHAR(255)
      );

      CREATE TABLE order_games(
        id SERIAL PRIMARY KEY,
        orderId INTEGER REFERENCES orders(id),
        gameId INTEGER REFERENCES games(id),
        amount INTEGER NOT NULL
      );
    `);


    // Add tables as you need them (A good place to start is Products and Orders
    // You may also need an extra table that links products and orders together (HINT* Many-To-Many)

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
      { title: 'Pac-Man', description: 'Move the wheel of cheese around and eat them ghosts!', console: 'Atari 2600', price: 50, year: 1982, image: '' },
      { title: 'Space Invaders', description: 'Pew pew!', console: 'Atari 2600', price: 50, year: 1980, image: '' },
      { title: 'Donkey Kong', description: 'Avoid the barrels!', console: 'Atari 2600', price: 50, year: 1982, image: '' },
      { title: 'Ms. Pac-Man', description: 'Move the wheel of cheese with the bow on it and eat them ghosts!', console: 'Atari 2600', price: 50, year: 1983, image: '' },
      { title: 'Asteroids', description: 'Blast the asteroids before they crush you!', console: 'Atari 2600', price: 50, year: 1981, image: '' },
      { title: 'Frogger', description: 'Look both ways before you cross the street!', console: 'Atari', price: 50, year: 1982, image: '' },
      { title: 'Super Mario Bros.', description: 'Jump, squish, eat, repeat!', console: 'NES', price: 50, year: 1985, image: '' },
      { title: 'Duck Hunt', description: 'Move the wheel of cheese around and ear them ghosts!', console: 'NES', price: 50, year: 1984, image: '' },
      { title: 'Tetris', description: 'Make this puzzle, while it moves!', console: 'NES', price: 50, year: 1989, image: '' },
      { title: 'The Legend of Zelda', description: 'Move the wheel of cheese around and ear them ghosts!', console: 'NES', price: 50, year: 1986, image: '' },
      { title: 'Metroid', description: 'Stop the space pirates and retrieve the Metroid parasites!', console: 'PS5', price: 50, year: 1971, image: '' },
      { title: 'Pokemon Red', description: 'Capture pocket monsters and battle against other trainers!', console: 'Gameboy', price: 50, year: 1996, image: '' },
      { title: 'Pokemon Yellow', description: 'Battle against other trainers with your best friend Pikachu!', console: 'Gameboy', price: 50, year: 1998, image: '' },
      { title: 'Sonic the Hedgehog', description: 'Run at supersonic speeds on your quest to defeat Dr. Robotnik!', console: 'Sega Genesis', price: 50, year: 1991, image: '' },
      { title: 'Mortal Kombat II', description: 'Defeat your oppponent in 1v1 combat and finish them with your fatality move!', console: 'Sega Genesis', price: 50, year: 1994, image: '' }
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

async function rebuildDB() {
  try {
    client.connect()
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialGames()

    // create other data
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error
  }
}

module.exports = {
  rebuildDB,
}
