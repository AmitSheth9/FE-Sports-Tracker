import React from 'react'
import { useState } from 'react'
import { getBetData } from '../../services/fetch-utils'
import { useUser } from '../../context/AuthContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function BetData() {
    const [betData, setBetData] = useState([]);
    const auth = useUser();
   
    const handleClick = async () => {
            let data = await getBetData(auth.username)
            console.log(data);
            setBetData(data);
    
}
    console.log(auth.username)
    console.log(betData)
    return (


        <div>
            {auth.username}
            <button onClick={handleClick}>Submit</button>
            <Link to='/'>Bet Form</Link>
        </div>
    )
}
