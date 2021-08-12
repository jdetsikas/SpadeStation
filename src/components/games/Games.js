/*
//////////////////
// Requirements //
/////////////////
*/

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GameTemplate from './GameTemplate'
import NewGame from '../admin/NewGame'
import './Games.css'

/*
////////////////
// Functions //
//////////////
*/

async function fetchGames(setGamesList) {
    try {
        const {data: games} = await axios.get('/api/games/');
        setGamesList(games)
    } catch (error) {
        throw error;
    };
};

/*
/////////////////
// Components //
///////////////
*/

const Games = (props) => {
    const {user} = props
    const [gamesList, setGamesList] = useState([])

    useEffect(() => {
        async function prefetchGames() {
            fetchGames(setGamesList)
        }
        prefetchGames()
    }, [])

    const gameInventory = gamesList.map( (game, idx) => { 
        if (game.available) {
            return <GameTemplate {...props} key={idx} game={game}/>
        } 
        return
    })

    return (
        
        <div className="games">
            <h1 className="gamesheader">List of Games</h1>
            { user.username === 'admin' ? <NewGame /> : null }
            <div className="gamegrid">
            { gameInventory /* each should be clickable, sends you to that game's details page */ }
            </div>
        </div> );
}

export default Games