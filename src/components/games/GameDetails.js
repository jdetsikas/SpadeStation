/*
///////////////////
// Requirements //
/////////////////
*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PatchGame from '../admin/PatchGame';
import './Details.css'

import { addToCart } from '../cart/'

/*
////////////////
// Functions //
//////////////
*/

async function fetchGame(gameId, setGame) {
    try {
        const { data: game } = await axios.get(`/api/games/${gameId}`)
        setGame(game)
    } catch (error) {
        throw error
    }
}

async function changeAvailability(e, gameId) {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
        const {data: revisedGame} = await axios({
            method: 'PATCH',
            url: `/api/games/${gameId}`,
            data: {
                'available': false
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        window.console.log('Updated game:', revisedGame)
    } catch (error) {
        window.console.error(error);
    }
}

/*
/////////////////
// Components //
///////////////
*/

const GameDetails = (props) => {
    const {user, cartGames, setCartGames, cart, cartView, setCartView} = props
    let { gameId } = useParams()

    const [game, setGame] = useState({})
    const [editing, setEditing] = useState(false)
    
    useEffect(() => {
        async function prefetchData() {
            fetchGame(gameId, setGame)
        }
        prefetchData()
    }, [])

    const {id, title, description, console, year, price, image } = game

    return (
        <div id='game-info'>
            { editing ? <PatchGame game={game}/> 
            : <>
                <div id='game-details'>
                    <h2 id='game-title' >Title: {title}</h2>
                    <h3 id='game-release'>Released: {console, year}</h3>
                    <h3 id='game-desc'>About: {description}</h3>
                    <h3 id='game-price'>Price: {price}</h3> 
                </div> 
                <img id='game-box' src={image} width='800' height='425'/>
            </> }
            <button onClick={() => addToCart(game, cartGames, setCartGames, cartView, setCartView)}>Add to Cart</button>
            { user.username === 'admin' ? <button onClick={e => {e.preventDefault(); setEditing(true)}}>Edit</button> : null }
            { user.username === 'admin' ? <button onClick={e => changeAvailability(e, gameId)}>Sold Out</button> : null }
        </div> );

};

export default GameDetails;