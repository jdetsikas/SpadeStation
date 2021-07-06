import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GameTemplate from './GameTemplate'

async function fetchGames(setGamesList) {
    try {
        const {data: games} = await axios.get('/api/games/');
        setGamesList(games)
    } catch (error) {
        throw error;
    };
};

const Games = () => {
    const [gamesList, setGamesList] = useState([])

    useEffect(() => {
        async function prefetchGames() {
            fetchGames(setGamesList)
        }
        prefetchGames()
    })

    const gameInventory = gamesList.map( (game, idx) => <GameTemplate key={idx} game={game}/> )

    return (
        <div>
            <h1>List of Games</h1>
            { gameInventory /* each should be clickable, sends you to that game's details page */ }
        </div> );
}

export default Games