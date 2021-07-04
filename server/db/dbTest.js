/*
///////////////////
// Requirements //
/////////////////
*/

const { 
    // user functions
    getAllUsers, getAllActiveUsers, deactivateUser, updateUser, 
    // Game functions
    getAllGames, updateGame,
    // Order functions
    getOrdersWithoutGames, updateOrder,
    // Game Order functions
    getAllOrderGames, updateOrderGame, removeOrderGame
  } = require('./');

/*
////////////////
// Functions //
//////////////
*/

async function testDB() {
    try {
        console.log("Starting to test database...");
  
        // Tests for users table
  
        console.log("------Testing Users Functions-------")
  
        console.log("Calling getAllUsers");
        const users = await getAllUsers();
        console.log("Result:", users);
  
        console.log("Calling updateUser on users[0]");
        const updateUserResult = await updateUser(users[0].id, {
            username: "Catherine B. Shopper"
        });
        console.log("Result:", updateUserResult);
  
        console.log("Deleteing user[1]");
        const deactivatedUser = await deactivateUser(users[1].id)
        console.log("We deleted:", deactivatedUser)
  
        console.log("Calling getAllUsers with changes");
        const newUsers = await getAllActiveUsers();
        console.log("Result:", newUsers);
  
        // Tests for games table
  
        console.log("------Testing Games Functions-------")
  
        console.log("Calling getAllGames");
        const games = await getAllGames();
        console.log("Result:", games);
  
        console.log("Calling updateGames on games[0]");
        const updateGameResult = await updateGame(games[0].id, {
            title: "I love Pac-man",
            description: "Oh my lord I love it so much..."
        });
        console.log("Result:", updateGameResult);
  
        console.log("Calling getAllGames with changes");
        const newGames = await getAllGames();
        console.log("Result:", newGames);
  
        // Tests for orders table
  
        console.log("------Testing Order Functions-------")
  
        console.log("Calling getOrdersWithoutGames");
        const orders = await getOrdersWithoutGames();
        console.log("Result:", orders);
  
        console.log("Calling updateOrder on orders[0]");
        const updateOrderResult = await updateOrder(orders[0].id, {
            orderStatus: "DELIVERED"
        });
        console.log("Result:", updateOrderResult);
  
        console.log("Calling getOrders... with changes");
        const newOrders = await getOrdersWithoutGames();
        console.log("Result:", newOrders);
  
        // Tests for order_games table
  
        console.log("------Testing Order Game Functions-------")
  
        console.log("Calling getAllOrderGames");
        const orderGames = await getAllOrderGames();
        console.log("Result:", orderGames);
  
        console.log("Calling updateOrderGame on orderGame[0]");
        const updateOrderGameResult = await updateOrderGame(orderGames[0].id, {
            quantity: "100"
        });
        console.log("Result:", updateOrderGameResult);
  
        console.log("Calling removeGameFromOrder on orderGame[1] from order[1]");
        const removeGameResult = await removeOrderGame(1, 1)
        console.log("Remove Game From Order Result:", removeGameResult)
  
        console.log("Calling getAllOrderGames with changes");
        const newOrderGames = await getAllOrderGames();
        console.log("Result:", newOrderGames);
  
        console.log("Finished database tests!");
    } catch (error) {
        console.log("Error during testDB");
        throw error;
    }
}

module.exports = testDB