import React from 'react'
import { useState, useEffect } from 'react';
import { signUp } from '../../services/fetch-utils';
import { Link, useHistory } from 'react-router-dom';
//import { useUser } from '../../context/AuthContext';

export default function Signup() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [signupDate, setSignupDate] = useState('');
    //const auth = useUser();

    const getDate = () => {
        let currentDate = new Date().toLocaleString();
        setSignupDate(currentDate);
    }

    useEffect(() => {
        getDate();
    }, [])

    const handleSubmit = async (e) => {
        try{
        e.preventDefault();
        let obj = { username: username, password: password, date: signupDate };
        console.log(obj);
        const response = await signUp(obj);
        console.log(response.text);
        history.replace('/login');
        }catch (err){
            setError(err.message)
        }
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
            {error && <p>{error.message}</p>}
        </div>
    )
}
