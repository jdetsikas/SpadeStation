/*
///////////////////
// Requirements //
/////////////////
*/

const express = require('express');
const gameRouter = express.Router()

const { createGame, getAllGames,  getGameById, updateGame, deleteGame } = require('../db')
const {requireAdmin} = require('./utils')

/*
////////////////
// Listeners //
//////////////
*/

// CREATE //
gameRouter.post('/', requireAdmin, async (req, res, next) =>{
    try {
        const {image, price, title, console, year, description} = req.body;
        const createdGame = await createGame({ image, price, title, console, year, description });

        if (createdGame) {
            res.send(createdGame);
        } else {
            next({
                name: 'CreationFailed',
                message: 'There was an error creating a new game for sale'
            })
        }
    } catch (error) {
        next(error);
    }
})


// READ //
gameRouter.get('/:gameId', async (req, res, next) => {
    try {
        const { gameId } = req.params;
        const foundGame = await getGameById(gameId);
        
        if (!foundGame) {
            next({
              name: 'NotFound',
              message: `No Game by ID ${gameId}`
            })
        } else {
            res.send(foundGame);
        }
    } catch (error) {
        throw error
    };
}); 

gameRouter.get('/', async (req, res, next) => {
    try {
        const allGames = await getAllGames();

        if (allGames) {
            res.send(allGames);
        }
    } catch (error) {
        throw error
    };
}); 


// UPDATE //
gameRouter.patch('/:gameId', requireAdmin, async (req, res, next) =>{
    try {
        const {gameId} = req.params;
        const gameToUpdate = await getGameById(gameId);

        if (!gameToUpdate) {
            next({
                name: 'NotFound',
                message: `No game with ID of ${gameId} was found`
            })
        } else {
            const updatedGame= await updateGame(gameId, req.body);

            if (updatedGame) {
                res.send(updatedGame);
            } else {
                next({
                    name:'Failed to Update',
                    message: 'There was an error when updating the game'
                })
            }
        }
    } catch (error) {
        next(error);
    }
});


// DELETE //
gameRouter.delete('/:gameId', requireAdmin, async (req, res, next)=>{
    try {
        const {gameId} = req.params;
        const gameToDelete = await getGameById(gameId);

        if (!gameToDelete) {
            next({
                name: 'Not Found',
                message: `No game by ID of ${gameId} was found`
            })
        } else {
            const deletedGame = await deleteGame(gameId)
            res.send({sucess: true, ...deletedGame});
        }
    } catch (error) {
        next(error);
    }
});

module.exports = gameRouter