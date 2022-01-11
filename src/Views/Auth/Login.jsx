import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { logIn } from '../../services/fetch-utils';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/AuthContext';

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
    console.log(res.text);
    if(res.text === 'login success') {
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
            <div>
                <Link to='/signup'>Signup</Link>
            </div>
            <div>
                {errorx && <p>{errorx}</p>}
            </div>
        </div>
    )
}
