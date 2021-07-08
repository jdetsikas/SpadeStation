import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PatchGame = () => {

let { gameId } = useParams()
let [editable, setEditable] = useState(false);

const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [price, setPrice] = useState('')
const [console, setConsole] = useState('')
const [year, setYear] = useState('')
const [image, setImage] = useState('')

let token = localStorage.getItem('token')

async function editGame () {
    
    try {
        const {data: revisedGame} = await axios({
            method: 'PATCH',
            url: `/api/games/${gameId}`,
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


    return <><div className="game">
                <div className="game-labels">
                { editable ? <> 
                        
                    <input type="text" value={title} onChange={async (e) => setTitle(e.target.value)} placeholder="Title" required />
                    <input type="text" value={description} onChange={async (e) => setDescription(e.target.value)} placeholder="Description" required />
                    <input type="text" value={price} onChange={async (e) => setPrice(e.target.value)} placeholder="Price" required />
                    <input type="text" value={console} onChange={async (e) => setConsole(e.target.value)} placeholder="Console" required />
                    <input type="text" value={year} onChange={async (e) => setYear(e.target.value)} placeholder="Year" required />
                    <input type="text" value={image} onChange={async (e) => setImage(e.target.value)} placeholder="Image" required />
                
                </> : <>
                
                    <div className="game-title">{title}</div>
                    <div className="game-description">{description}</div>
                    <div className="game-price">{price}</div>
                    <div className="game-console">{console}</div>
                    <div className="game-year">{year}</div>
                    <div className="game-image">{image}</div>
                </> }
                </div>
        </div>
        <div className="edit-buttons">
                    <>
                        {editable ? 
                            <><button className="edit-game-button" 
                                onClick={() => {
                                    editGame();
                                }}>Save Changes</button>
                            <button className="edit-game-button" onClick={() => {setEditable(false)}}>Cancel Changes</button>
                            </> : 
                            <button className="edit-game-button" 
                                onClick={() => {setEditable(true)}}>Edit Game</button>
                        }
                </> 
        </div>
    </>

}



export default PatchGame