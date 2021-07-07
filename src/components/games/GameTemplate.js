import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const GameTemplate = ({ game }) => {
    const [preview, setPreview] = useState(false);
    const { id, title, description, price, console, year, image } = game;
    
    async function gameClick() {
        event.preventDefault();
        setPreview(!preview);
    }

    return (
        <div className='game-icon'>
            <input type='image' src={image} alt={'space invaders'} onClick={gameClick} width='300' height='400'/>
            <h1>{title}</h1>
            <h2>{`$${price}.99`}</h2>
            {preview ? 
                <div className='game-prev'>
                    <Link to={`/games/${id}`}>Details!</Link>
                </div>
            : null}
        </div> );
};

export default GameTemplate;