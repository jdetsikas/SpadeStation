import React, { useState, useEffect } from 'react';
import { setUserData } from '../../utils';
import './Profile.css'

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
        <div className="profilepage">
                <img src ="/icons/you.jpg" alt="you"/>
                <div className="userinfo">
                <h1>Look At YOU!</h1>
                <h2>Username: {name}</h2>
                </div>
        </div> );
}

export default UserAccount;