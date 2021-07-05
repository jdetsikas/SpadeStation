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
            <GameTemplate game={ {id: 1, title: 'Pac-Man', description: 'Move the wheel of cheese around and eat them ghosts!', console: 'Atari 2600', price: 99, year: 1982, image: 'https://www.mobygames.com/images/covers/l/20097-pac-man-atari-2600-front-cover.jpg' } }/>
            <GameTemplate game={ {id: 2, title: 'Space Invaders', description: 'Pew pew!', console: 'Atari 2600', price: 89, year: 1980, image: 'https://www.mobygames.com/images/covers/l/19650-space-invaders-atari-2600-front-cover.jpg'} }/>
            { gameInventory /* each should be clickable, sends you to that game's details page */ }
        </div> );
}

export default Games