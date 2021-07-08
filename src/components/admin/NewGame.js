import React, {useState} from 'react';
import axios from 'axios';

const NewGame = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [console, setConsole] = useState('')
    const [year, setYear] = useState('')
    const [image, setImage] = useState('')

    let token = localStorage.getItem('token')

    async function addNewGameToInventory () {
        
            try {
                const {data: newGame} = await axios({
                    method: 'POST',
                    url: '/api/games',
                    data: {
                        'title': title,
                        'description': description,
                        'price': price,
                        'console': console,
                        'year': year,
                        'image': image
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`

                    }
        
                })
    
            } catch (error) {
                window.console.error(error);
            }
        }

        return (<div id="new-game">
        <h1>Create New Game</h1>
        <form id="new-game-form" onSubmit={function(event) 
            {event.preventDefault() 
            addNewGameToInventory()}}>
            <input type="text" value={title} onChange={async (e) => setTitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={description} onChange={async (e) => setDescription(e.target.value)} placeholder="Description" required />
            <input type="text" value={price} onChange={async (e) => setPrice(e.target.value)} placeholder="Price" required />
            <input type="text" value={console} onChange={async (e) => setConsole(e.target.value)} placeholder="Console" required />
            <input type="text" value={year} onChange={async (e) => setYear(e.target.value)} placeholder="Year" required />
            <input type="text" value={image} onChange={async (e) => setImage(e.target.value)} placeholder="Image" required />

            <input type="submit" id="submit-button"></input>
        </form>
    </div>)

    }
    export default NewGame