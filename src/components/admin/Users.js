import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UserTemplate from './UserTemplate';

async function fetchUsers(setUsersList) {

let token = localStorage.getItem('token')

    try {
        const {data: users} = await axios({
            method: 'GET',
            url: '/api/users/all',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        window.console.log('Users:', users)
        setUsersList(users)
    } catch (error) {
        throw error;
    };
};

const Users = (props) => {

    const {user} = props

    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        if (user.username !== 'admin') {
            props.history.push('/Home')
        }
        async function prefetchUsers() {
            fetchUsers(setUsersList)
        }
        prefetchUsers()
    }, [])  

    const userCatalog = usersList.map((user, idx) => {

        return <UserTemplate  key={idx} user={user}/>

    })

    return (

        <div id="users-list">
            <h1>Users</h1>
            {userCatalog}
        </div>

    )

}

export default Users
