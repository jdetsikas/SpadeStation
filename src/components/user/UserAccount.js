import React, { useState, useEffect } from 'react';
import { setUserData } from '../../utils';

const UserAccount = (props) => {
    const { user, setUser } = props

    const [name, setName] = useState('')

    useEffect(() => {
        if (!user.id) {
            props.history.push('/')
        }
        setUserData(props, setUser)
        setName(user.username)
    }, [])
    
    return (
        <div>
                <h1>Account Management</h1>
                <h2>Username: {name}</h2>
        </div> );
}

export default UserAccount;