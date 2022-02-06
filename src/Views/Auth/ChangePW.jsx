import React, { useState } from 'react';
import { useUser } from '../../context/AuthContext';
import { changePW } from '../../services/fetch-utils';
import { Link } from 'react-router-dom';

export default function ChangePW() {
    const auth = useUser();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPW, setConfirmPW] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPW) {
            alert('Please type password correctly twice');
            return
        }
        if (password === confirmPW) {
            console.log(user);
            let obj = {
                username: auth.username || user,
                password: password,
            }
            const response = await changePW(obj);
            console.log(response);
        }
    }

  return <div>
        {auth.username}
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Change Password</legend>
                    <label 
                    className='label'
                    htmlFor='username'>Username
                        <input 
                        className='input'
                        name='username'
                        value={user}
                        onChange={(e)=> setUser(e.target.value)}/>
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
                    </label><br/>
                    <label 
                    className='label'
                    htmlFor='confirm'>Confirm PW
                        <input
                        className='input'
                        type='password'
                        name='confirm' 
                        value={confirmPW}
                        onChange={(e)=> setConfirmPW(e.target.value)}/>
                    </label>
                    <button type='submit'>Submit</button>
                </fieldset>
            </form><br/>
            <div>
                <Link className='link' to='/login'>Login</Link>
                <Link className='link' to='/signup'>Signup</Link>
                <Link className='link' to='/'>BetForm</Link>
            </div>
  </div>
}
