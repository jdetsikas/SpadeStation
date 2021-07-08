import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const DeleteGame = () => {

    let token = localStorage.getItem('token')

    async function deleteGameFromInventory () {

        try {
            await axios({
                method: 'DELETE',
                url: `/api/games/${gameId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

        } catch (error) {
            window.console.error(error);
        }

    }

    return <div className="game-buttons">

    <button id="delete-game-button"
        onClick={() => {deleteGameFromInventory(gameId)}}>Delete Game</button> 

    </div>

}

export default DeleteGame