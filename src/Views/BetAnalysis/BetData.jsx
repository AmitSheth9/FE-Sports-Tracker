import React from 'react'
import { useState, useEffect } from 'react'
import { getBetData } from '../../services/fetch-utils'
import { useUser } from '../../context/AuthContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './BetData.css'
import { betDistributionAnalysis } from '../../services/handleData';
import { sumWageredandWin } from '../../services/handleData';

export default function BetData() {
    const [betData, setBetData] = useState([]);
    const [netResult, setNetResult] = useState(0);
    //const [wins, setWins] = useState(0);
    //const [losses, setLosses] = useState(0);
    //const [pushes, setPushes] = useState(0);
    const [winPercentage, setWinPercentage] = useState(0);
    const [spreadPct, setSpreadPct] = useState(0);
    const [totalsPct, setTotalsPct] = useState(0);
    const [mlPct, setMlPct] = useState(0);
    const [spreadWinPct, setSpreadWinPct] = useState(0);
    const [totalWinPct, setTotalWinPct] = useState(0);
    const [mlWinPct, setMlWinPct] = useState(0);
    const [wagerSum, setWagerSum] = useState(0);
    const [winSum, setWinSum] = useState(0);
    const auth = useUser();
    const [recentBets, setRecentBets] = useState([]);

    useEffect(() => {
       const onMount = async () => {
            let data = await getBetData(auth.username)
            setBetData(data.body[0]);
            setRecentBets(data.body[1]);  
        }    
        if(auth.username){onMount()}}, [auth.username])

    useEffect(() => {
        handleData(betData);}, [betData])

    useEffect(() => {
        betDistributionAnalysis(betData, setSpreadWinPct, setTotalWinPct, setMlWinPct);}, [betData])
   
    useEffect(() => {
        sumWageredandWin(betData, setWagerSum, setWinSum)
        },[betData])
    
    const handleData = (betData) => {
            let sum = 0;
            let win = 0;
    
            let spreadBets = 0;
            let totalBets = 0;
            let mlBets = 0;
       for( let i = 0; i<betData.length; i++) {
           if(betData[i].betType === 'Spread'){spreadBets++}
           if(betData[i].betType === 'Total'){totalBets++}
           if(betData[i].betType === 'Moneyline'){mlBets++}
           if (betData[i].result === 'Win') {
               sum = sum + betData[i].win;
               win++;
           }
           if(betData[i].result === 'Lose') {
               sum = sum - betData[i].wager;
               
           }
           if(betData[i].result === 'Push') {
               
           } 
        }
        let winP = Number(((win/betData.length)*100).toFixed(2));
        setWinPercentage(winP);
           
        setSpreadPct(Number(((spreadBets/betData.length) *100).toFixed(2)))
        setTotalsPct(Number((totalBets/betData.length).toFixed(2)) *100)
        setMlPct(Number((mlBets/betData.length).toFixed(2)) *100)
        console.log(sum);
        setNetResult(sum);
        return sum;
        }
      
    console.log(auth.username)
    console.log(betData)
    console.log(spreadWinPct);
    return (


        <div>{auth.username}
            <div className = 'summary'>
                <div className='heading'>Bets Placed: {betData.length}</div>
                <div className='heading'>Net result: ${Number(netResult.toFixed(2))}</div>
                <div className='heading'>Win percentage: {winPercentage}</div>
            </div>
            <div>
                <table>
                    <legend>Bet History</legend>
                    <tr>
                        <th>Date</th>
                        <th>Result</th>
                        <th>Bet Type</th>
                        <th>Spread</th>
                        <th>Wagered</th>
                        <th>To Win</th>
                        <th>Net</th>
                    </tr>
                 {betData.map((bet) => {
                    return (
                    <tr className='beta-container' key={bet._id}>
                        {bet.betDate ? 
                    <td>{bet.betDate.slice(0 , 10)}</td> : 
                    <td>{bet.submitDate.slice(0,10)}</td>}
                    <td>{bet.result}</td>
                    <td>{bet.betType}</td>
                    <td>{bet.spread}</td>
                    <td>{Number(bet.wager.toFixed(2))}</td>
                    <td>{Number(bet.win.toFixed(2))}</td>
                        {bet.result === "Win" ? 
                    <td>{Number(bet.win.toFixed(2))}</td> : ''}
                        {bet.result === "Lose" ? 
                    <td>-{Number(bet.wager.toFixed(2))}</td> : ''}
                        {bet.result === 'Push' ? 
                    <td>0</td> : ''}
                    </tr>
                    )})}
                    <tr>
                    <td></td>
                    <td>{winPercentage}%</td>
                    <td></td>
                    <td></td>
                    <td>{wagerSum}</td>
                    <td>{winSum}</td>
                    <td>{Number(netResult.toFixed(2))}</td>
                    </tr>
                </table><br/>
            </div>
            <div className='analysis-container'>Bet Distribution Analysis
                <div className= 'bet-distribution'>
                    <p className='dist-data'>Spread Bets: {spreadPct}%</p> 
                    <p className='dist-data'>Total Bets: {totalsPct}%</p> 
                    <p className='dist-data'>Moneyline Bets: {mlPct}%</p> 
                </div>
                <div className='distribution-analysis'>
                    <p className='dist-data'>Spread Bets Win Pct: {spreadWinPct}%</p>
                    <p className='dist-data'>Total Bets Win Pct: {totalWinPct}%</p>
                    <p className='dist-data'>Moneyline Bets Win Pct: {mlWinPct}%</p>
                </div>
                <div>
                    {recentBets.map((bet)=>{
                        return (
                            <div>
                            <div>{bet.submitDate}</div>
                            <div>{bet.result}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <p class='link-betform'><Link to='/'>Bet Form</Link></p>
        </div>
    )
}
