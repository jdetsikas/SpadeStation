import React from 'react';

const GameDetails = (game) => {
    const { title, description, price, console, year, image } = game;
    
    return (
        <div id='game-info'>
            <h1 id='game-title'>{title}</h1>
            <h2 id='game-details'>{console, year}</h2>
            <h3 id='game-price'>{price}</h3>
            <h4 id='game-desc'>{description}</h4>
            <img id='game-box' src={image} width='500' height='500'/>
            <button>Add to Cart</button>
        </div> );
};

export default GameDetails;