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
        if(password.length > 4){
        let obj = { username: username, password: password, date: signupDate };
        const response = await signUp(obj);
        console.log(response);
        history.replace('/login');
        alert('You have succesfully signed up for Bettracker. Please login with your credentials')
        }
        else {
            alert('Please enter a password at least 5 characters');
        }
        }catch (err){
        setError(err.message)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Signup</legend>
                    <label 
                    className='label'
                    htmlFor='username'>Email
                        <input 
                        className='input'
                        name='username' 
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}/>
                    </label>
                    <label 
                    className='label'
                    htmlFor='password'>Password
                        <input 
                        className='input'
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}/>
                    </label>
                    <button type='submit'>Submit</button>
                </fieldset>
            </form><br/>
            <Link className='link' to='/login'>Login</Link>
            <Link className='link' to='/home'>Home</Link>
            {error && <p>{error.message}</p>}
            <Link className='link' to='/'>BetForm</Link>
        </div>
    )
}
