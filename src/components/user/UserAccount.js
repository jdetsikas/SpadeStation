import React, { useState, useEffect } from 'react';
import { setUserData } from '../../utils';



const UserAccount = (props) => {
    const { user, setUser } = props

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [loc, setLoc] = useState('')
    const [bill, setBill] = useState('')

    useEffect(() => {
        setUserData(props, setUser)
        setName(user.username)
    }, [])
    
    return (
        <>
        { user ?
            <div>
                <h1>Account Management</h1>
                <h2>Username: {name}</h2>
            </div> 
         :  <div>
                <h1>Please log-in</h1>
            </div>
        }
        </>
        );
}

export default UserAccount;