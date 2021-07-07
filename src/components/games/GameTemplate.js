import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const GameTemplate = (props) => {
    const { game } = props
    const { id, title, description, price, console, year, image } = game;
    
    function gameClick() {
        event.preventDefault();
        props.history.push(`/games/${id}`)
    }

    return (
        <div className='game-icon'>
            <h2>{title}</h2>
            <input type='image' src={image} alt={title} onClick={gameClick} width='225' height='150'/>
            <h2>{`$${price}.99`}</h2>
        </div> );
};

export default GameTemplate;