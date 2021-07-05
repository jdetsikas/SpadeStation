import React, { useState, useEffect } from 'react';
import { checkLogin, setUserData } from '../../utils';

const UserAccount = ({ user, setUser }) => {
    useEffect(() => {
        setUserData(setUser) //invoke
      }, [])
    
    return (
        <div>
            <h1>Account Management</h1>
            <h2>{user.username}</h2>
        </div> );
}

export default UserAccount;