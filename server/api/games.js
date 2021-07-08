const express = require('express');
const gameRouter = express.Router()
const{ createGame,
    getAllGames,
    getGameById,
    updateGame,
    deleteGame } = require('../db')

    const {requireAdmin} = require('./utils')


//-------------------Require Admin is used for these routes--------------//

///////////////////////
//get/ api/ getGame//
//////////////////////

gameRouter.get('/:gameId', async (req, res, next) => {
    try {
        const {gameId} = req.params;
        const gettingGame = await getGameById(gameId);
        
        if (!gettingGame) {
            next({
              name: 'NotFound',
              message: `No Game by ID ${gameId}`
            })
        } else {
            res.send(gettingGame);
        }

    } catch (error) {
        throw error
    };
}); 


///////////////////////////
//get/ api/ getAllGames//
//////////////////////////

gameRouter.get('/', async (req, res, next) => {
    try {
        const gettingAllGames = await getAllGames();
        if(gettingAllGames) {
            res.send(gettingAllGames);
        }
    } catch (error) {
        throw error
    };
}); 


/////////////////////
//POST/ api/ games//
////////////////////

gameRouter.post('/', requireAdmin,async (req, res, next) =>{
    try{
        const {image, price, title, console, year, description} = req.body;
        const createdGames = await createGame({ image, price, title, console, year, description });
        if(createdGames) {
            res.send(createdGames);
        }else{
            next({
                name: 'Failed to Upload',
                message: 'There was an  error creating a new game for sale'
            })
        }
    }catch(error){
        next(error);
    }
})

/////////////////////
//PATCH/ api/ games//
////////////////////

gameRouter.patch('/:gameId', requireAdmin, async (req, res, next) =>{
    try{
        const {image, price, name, console} = req.body;
        const {gameId} = req.params;
        const updateToGame = await getGameById(gameId);
        if(!updateToGame){
            next({
                name: 'Not Found',
                message: 'No game by ID of ${gameId} was found'
            })
        }else{
            const updatedGame= await updateGame (gameId, {image, price, name, console});
            if(updatedGame){
                res.send(updatedGame);
            }else{
                next({
                    name:'Failed to Update',
                    message: 'There was an error when updating the game'
                })
            }
        }

    }catch (error){
        next(error);
    }
});

/////////////////////
//DELETE/ api/ games//
////////////////////

gameRouter.delete('/:gameId', requireAdmin, async (req, res, next)=>{
    try{
        const {gameId} = req.params;
        const updateToGame = await getGameById(gameId);
        if(!updateToGame){
            next({
                name: 'Not Found',
                message: `No game by ID of ${gameId} was found`
            })
        }else{
            const deletedGame = await deleteGame(gameId)
            res.send({sucess: true, ...deletedGame});
        }

    }catch(error){
        next(error);
    }
});


module.exports = gameRouter