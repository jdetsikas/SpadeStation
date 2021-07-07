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

const Games = (props) => {
    const [gamesList, setGamesList] = useState([])

    useEffect(() => {
        async function prefetchGames() {
            fetchGames(setGamesList)
        }
        prefetchGames()
    }, [])

    const gameInventory = gamesList.map( (game, idx) => <GameTemplate {...props} key={idx} game={game}/> )

    return (
        <div className="games">
            <h1 className="gamesheader">List of Games</h1>
            <div className="gamegrid">
            { gameInventory /* each should be clickable, sends you to that game's details page */ }
            </div>
        </div> );
}

export default Games