import React, { useState, useEffect } from 'react'
import GameTemplate from './GameTemplate'

const Games = () => {
    const [gamesList, setGamesList] = useState([])

    useEffect(() => {
        // fetch and set the initial games
        async function prefetchGames() {
            // call to api and call setGamesList with the result
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