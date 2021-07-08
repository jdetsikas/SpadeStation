import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import PatchGame from '../admin/PatchGame';
import DeleteGame from '../admin/DeleteGame';

const GameTemplate = (props) => {
    const { game } = props
    const { id, title, description, price, console, year, image } = game;
    
    function gameClick() {
        event.preventDefault();
        props.history.push(`/games/${id}`)
    }

    return (
        <div className='game-icon'>
            <input type='image' src={image} alt={'space invaders'} onClick={gameClick} width='300' height='400'/>
            <h1>{title}</h1>
            <h2>{`$${price}.99`}</h2>
            {/* <PatchGame />
            <DeleteGame /> */}
        </div> );
};

export default GameTemplate;