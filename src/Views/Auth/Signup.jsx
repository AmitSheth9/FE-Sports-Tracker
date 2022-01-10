import React from 'react'
import { useState } from 'react';
import { signUp } from '../../services/fetch-utils';
import { Link, useHistory } from 'react-router-dom';

export default function Signup() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        let obj = { username: username, password: password };
        console.log(obj);
        const response = await signUp(obj);
        console.log(response);
        history.replace('/login');
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Signup</legend>
                    <label htmlFor='username'>Email
                        <input
                        name='username' 
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}/>
                    </label>
                    <label htmlFor='password'>Password
                        <input 
                        name='password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}/>
                    </label>
                    <button type='submit'>Submit</button>
                </fieldset>
            </form>
            <Link to='/login'>Login</Link>
        </div>
    )
}
