import React from 'react'
import { useState, useEffect } from 'react'
import { getBetData } from '../../services/fetch-utils'
import { useUser } from '../../context/AuthContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './BetData.css'

export default function BetData() {
    const [betData, setBetData] = useState([]);
    const [netResult, setNetResult] = useState(0);
    const auth = useUser();

    useEffect(() => {
       
        const onMount = async () => {
            let data = await getBetData(auth.username)
            setBetData(data.body);
            
        }
    
        
    if(auth.username){onMount()}}, [auth.username])

    useEffect(() => {
       
        sumResult(betData);}, [betData])
   
    const handleClick = async () => {
            
        let data = await getBetData(auth.username)
        setBetData(data.body);
    
    }

    const sumResult = (betData) => {
        let sum = 0;
       for( let i = 0; i<betData.length; i++) {
           if (betData[i].result === 'Win') {
               sum = sum + betData[i].win;
           }
           if(betData[i].result === 'Lose') {
               sum = sum - betData[i].wager
           }
           
       }
       console.log(sum);
       setNetResult(sum);
       return sum;
      
    }
    console.log(auth.username)
    console.log(betData)
    return (


        <div>
            {auth.username}
            <button onClick={handleClick}>Submit</button>
            <div className = 'summary'>{auth.username}, You placed {betData.length} bets with a net result of ${netResult}</div>
            {auth.username && <div className='all-container'>
         {betData.map((bet) => {
                return (
                    <div className='bet-container' key={bet._id}>
                    {bet.betDate ? <p>{bet.betDate}</p> : <p>{bet.submitDate}</p>}<br/>
                    <p>Result: {bet.result}</p>
                    <p>Bet Type: {bet.betType}</p>
                    <p>Spread: {bet.spread}</p>
                    <p>Wagered: {bet.wager}</p>
                    <p>To Win: {bet.win}</p>
                    {bet.result === "Win" ? <p>Amount won : {bet.win}</p> : ''}
                    {bet.result === "Lose" ? <p>Amount Lost : -{bet.wager}</p> : ''}
                    
                    </div>
            )})}
            </div> }
            <Link to='/'>Bet Form</Link>
        </div>
    )
}
