import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

async function fetchGame(gameId, setGame) {
    try {
        const { data: game } = await axios.get(`/api/games/${gameId}`)
        setGame(game)
    } catch (error) {
        throw error
    }
}

const GameDetails = () => {
    const [game, setGame] = useState({})
    let { gameId } = useParams()
    
    useEffect(() => {
        async function prefetchData() {
            fetchGame(gameId, setGame)
        }
        prefetchData()
    }, [])

    const { title, description, console, year, price, image } = game

    return (
        <div id='game-info'>
            <div id='game-details'>
                <h2 id='game-title'>Title: {title}</h2>
                <h3 id='game-release'>Released: {console, year}</h3>
                <h3 id='game-desc'>About: {description}</h3>
                <h3 id='game-price'>Price: {price}</h3>
            </div>
            <img id='game-box' src={image} width='500' height='300'/>
            <button>Add to Cart</button>
        </div> );
};

export default GameDetails;