import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GameDetails = () => {
    const [game, setGame] = useState({})
    let { gameId } = useParams()

    useEffect(() => {
        // Fetches the game data for game with ID equal to location params
        async function fetchGameData() {
            const { data } = await axios.get(`api/games/${gameId}`)
            setGame(data)
        }
        fetchGameData()
    }, [])

    const { title, description, console, year, price, image } = game

    return (
        <div id='game-info'>
            <div id='game-details'>
                <h1>TESTING: ID IS {gameId} </h1>
                <h2 id='game-title'>Title: {title}</h2>
                <h3 id='game-release'>Released: {console, year}</h3>
                <h3 id='game-desc'>About: {description}</h3>
                <h3 id='game-price'>Price: {price}</h3>
            </div>
            <img id='game-box' src={image} width='500' height='500'/>
            <button>Add to Cart</button>
        </div> );
};

export default GameDetails;