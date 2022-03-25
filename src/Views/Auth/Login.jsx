import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { logIn } from '../../services/fetch-utils';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/AuthContext';
import './Auth.css'
import jwtDecode from 'jwt-decode';

export default function Login() {
const history = useHistory();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [errorx, setErrorX] = useState('');
const auth = useUser();

const handleSubmit = async (e) =>{
    try{
    e.preventDefault();
    let obj = { username, password};
    const res = await logIn(obj);
    if(res) {
        const decoded = jwtDecode(res.text);
        console.log('decoded', decoded);
        localStorage.setItem('user', JSON.stringify(decoded));
        auth.setUsername(username);
        history.replace('/');
    }
    }catch(err) {
    setErrorX(err.message);
    }
}

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Login</legend>
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
            <div>
                <Link className='link' to='/signup'>Signup</Link>
                <Link className='link' to='/home'>Home</Link>
                <Link className='link' to='/'>BetForm</Link>
            </div>
            <div >
                {errorx && <p className = 'error'>Invalid: Please Enter correct credentials</p>}
            </div>
        </div>
    )
}
