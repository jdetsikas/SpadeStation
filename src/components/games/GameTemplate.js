import React from 'react';


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
        </div> );
};

export default GameTemplate;