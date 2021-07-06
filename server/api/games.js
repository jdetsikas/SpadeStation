const express = require('express');
const router = express.Router()
const{ createGame,
    getAllGames,
    getGameById,
    updateGame,
    deleteGame } = require('../db')
const{ requiredUser } = require('./utils')


///////////////////////
//get/ api/ getGame//
//////////////////////

gameRouter.get('/api/games/:gameId', async (req, res, next) => {
    try {
        const{id} = req.body;
        const gettingGame = await getGameById(id);
        if(gettingGame) {
            res.send(gettingGame);
        }

    } catch (error) {
        throw error
    };
}); 


///////////////////////////
//get/ api/ getAllGames//
//////////////////////////

gameRouter.get('/api/games', async (req, res, next) => {
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

gameRouter.post('/', requiredUser, async (req, res, next) =>{
    try{
        const{image, price, name, console} = req.body;
        const createdGames = await createGame({creatorId: req.user.id, image, price, name, console});
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

gameRouter.patch('/:gameId', requiredUser, async (req, res, next) =>{
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
            const updatedGame= await updateGame ({id: gameId, image, price, name, console});
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

gameRouter.delete('/:gameId', requiredUser, async (req, res, next)=>{
    try{
        const {gameId} = req.params;
        const updateToGame = await getGameById(gameId);
        if(!updateToGame){
            next({
                name: 'Not Found',
                message: 'No game by ID of ${gameId} was found'
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