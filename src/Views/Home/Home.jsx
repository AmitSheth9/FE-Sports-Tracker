import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useUser } from '../../context/AuthContext';
import { logOut } from '../../services/fetch-utils';
import './home.css'
export default function Home() {
    const auth = useUser();
    const history = useHistory();

    const handleLogout = async () => {
        const response = await logOut();
        console.log(response);
        auth.setUsername('');
        localStorage.clear();
        history.replace('/login');
    }
  return (
      <>
      <br/><br/>
    <div className='welcome'><Link className='logo' to='/'>BETTRACKER</Link></div><br/><br/><br/>
    <p className='intro'>Welcome to Bettracker. The purpose of this site is to give sports fans a place to track their bets and obtain useful data about their betting patterns.  Submit your bet details <Link to='/'>here</Link> and then view analysis <Link to='/betdata'>here</Link>. All fields are optional. The more data the better the analysis</p><br/><br/>
    <p className = 'link-container'>
            <Link className='link' to='/signup'>Signup</Link><br/>
            {!auth.username && <Link className='link' to='/login'>Login</Link>}<br/>
            <Link className='link' to='/'>Add a bet</Link>
            <Link className='link' to='/betdata'>Bet Data</Link>
            {auth.username && <button onClick={handleLogout}>Logout</button>}
            </p>

    </>
  )
}
