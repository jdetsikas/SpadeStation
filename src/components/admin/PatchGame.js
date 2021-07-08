import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PatchGame = ({game, editing}) => {

const {gameId} = useParams()

const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [price, setPrice] = useState('')
const [console, setConsole] = useState('')
const [year, setYear] = useState('')
const [image, setImage] = useState('')

useEffect (() => {

    setTitle(game.title)
    setDescription(game.description)
    setPrice(game.price)
    setConsole(game.console)
    setYear(game.year)
    setImage(game.image)

}, [])

let token = localStorage.getItem('token')

async function editGame (event) {
    
    event.preventDefault()
    window.console.log(event.target[0].value)
    const [title, description, price, console, year, image] = event.target

    try {
        const {data: revisedGame} = await axios({
            method: 'PATCH',
            url: `/api/games/${gameId}`,
            data: {
                'title': title.value,
                'description': description.value,
                'price': price.value,
                'console': console.value,
                'year': year.value,
                'image': image.value
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


    return (
   

        <form className="game-labels" onSubmit={event => editGame(event)}>
                                
        <input type="text" value={title} onChange={async (e) => setTitle(e.target.value)} placeholder="Title" required />
        <input type="text" value={description} onChange={async (e) => setDescription(e.target.value)} placeholder="Description" required />
        <input type="text" value={price} onChange={async (e) => setPrice(e.target.value)} placeholder="Price" required />
        <input type="text" value={console} onChange={async (e) => setConsole(e.target.value)} placeholder="Console" required />
        <input type="text" value={year} onChange={async (e) => setYear(e.target.value)} placeholder="Year" required />
        <input type="text" value={image} onChange={async (e) => setImage(e.target.value)} placeholder="Image" required />
        <button type="submit">Save Changes</button>
        </form>
            
    )
}



export default PatchGame
