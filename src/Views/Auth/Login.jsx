import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { logIn } from '../../services/fetch-utils';
import { useHistory } from 'react-router-dom';
export default function Login() {
const history = useHistory();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [errorx, setErrorX] = useState('');

const handleSubmit = async (e) =>{
    try{
    e.preventDefault();
    let obj = { username, password};
    const response = await logIn(obj);
    const respStr = await JSON.stringify(response);
    console.log(respStr);
    console.log(response);
    history.replace('/');
    //so because only allows to proceed if correct un/pw is given can assume if site doesn't break and goes to '/' user is authorized. next step is to fill out form and get that data back and post it to mongodb database with username of current user. each user will have own collection?
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
