import React, { useState } from 'react';
import { Link } from 'react-router-dom'


const UserTemplate = (props) => {
    const { user } = props
    const { id, username, isActive } = user;
    
    return (
        <div className='user-card'>
            <h1>Name: {username}</h1>
            <h2>ID# {id}</h2>
            <h2>Active: {isActive ? "True" : "False"}</h2>
        </div> );
};

export default UserTemplate;