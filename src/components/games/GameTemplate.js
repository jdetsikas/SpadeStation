import React, { useState } from 'react';
import { Link } from 'react-router-dom'

async function gameClick(event, setPreview) {
    event.preventDefault();
    setPreview(!preview);
}

const GameTemplate = (game) => {
    const [preview, setPreview] = useState(false);
    const { id, title, description, price, console, year, image } = game;
    
    return (
        <div className='game-icon'>
            <button onClick={(e) => gameClick(e, setPreview)}>
                <img src={image}/>
            </button>
            <h1>{title}</h1>
            <h2>{price}</h2>
            {preview ? 
                <div className='game-prev'>
                    <Link to={`/games/details/:${id}`}>Details!</Link>
                </div>
            : null}
        </div> );
};

export default GameTemplate;