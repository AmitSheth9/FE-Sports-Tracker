import React from 'react'
import { useState, useEffect } from 'react'
import { getBetData, deleteBet, logOut } from '../../services/fetch-utils'
import { useUser } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom'
import './BetData.css'
import { betDistributionAnalysis } from '../../services/handleData';
import { sumWageredandWin } from '../../services/handleData';


export default function BetData() {
    const [betData, setBetData] = useState([]);
    const [netResult, setNetResult] = useState(0);
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [pushes, setPushes] = useState(0);
    const [winPercentage, setWinPercentage] = useState(0);
    const [spreadPct, setSpreadPct] = useState(0);
    const [totalsPct, setTotalsPct] = useState(0);
    const [mlPct, setMlPct] = useState(0);
    const [spreadWinPct, setSpreadWinPct] = useState(0);
    const [totalWinPct, setTotalWinPct] = useState(0);
    const [mlWinPct, setMlWinPct] = useState(0);
    const [wagerSum, setWagerSum] = useState(0);
    const [winSum, setWinSum] = useState(0);
    const [avgWager, setAvgWager] = useState('');
    const auth = useUser();
    // eslint-disable-next-line no-unused-vars
    const [recentBets, setRecentBets] = useState([]);
    const history = useHistory();

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
        sumWageredandWin(betData, setWagerSum, setWinSum, setAvgWager)
        },[betData])

    useEffect(() => {
        const onLoad = async () => {
            if(localStorage.getItem('user')){
            const userObj = JSON.parse(localStorage.getItem('user'))
            console.log('userobj', userObj);
            auth.setUsername(userObj.username);
            }
            else {
                auth.setUsername('');
            }
        }
    onLoad()}, [auth])
    
    const handleData = (betData) => {
            let sum = 0;
            let win = 0;
            let lose = 0;
            let push = 0;
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
               lose++;  
           }
           if(betData[i].result === 'Push') {
               push++;  
        }
        }
        console.log(win,lose, push);
        setWins(win);
        setLosses(lose);
        setPushes(push);
        let winPerct = Number(((win/(win+lose))*100).toFixed(2));
        setWinPercentage(winPerct);
        setSpreadPct(Number(((spreadBets/betData.length) *100).toFixed(2)))
        setTotalsPct(Number(((totalBets/betData.length)*100).toFixed(2)))
        setMlPct(Number(((mlBets/betData.length)*100).toFixed(2)))
        console.log(sum);
        setNetResult(sum);
        return sum;
        }
    const handleLogout = async () => {
        const response = await logOut();
        console.log(response);
        auth.setUsername('');
        localStorage.clear();
        history.replace('/login');
        }
    const removeBet = async (id) => {
        
        console.log(id);
        let deletedBet = await deleteBet(id);
        console.log('delete bet', betData);
        console.log(deletedBet)
        let response = await getBetData(auth.username);
        console.log(response.body[0])
        setBetData(response.body[0]);
        alert('You have sucessfully removed the bet')
    }
    console.log(betData);
    return (


        <div>
            {auth.username ? 
            <div className='login-status'>Logged in as {auth.username}</div> : 
            <div className='login-status'>Not logged in</div>}
            {!betData.length && 
            <div className = 'nobets'>You have not submitted any bets to track. Submit a bet in the <Link to='/'>BetForm</Link></div>}
            <div className = 'summary'>
                <div className='heading'>Bets Tracked: {betData.length}</div>
                <div className='heading'>Record: {wins}-{losses}-{pushes}</div>
                <div className='heading'>Net result: ${Number(netResult.toFixed(2))}</div>
                <div className='heading'>Win percentage: {winPercentage}%</div>
                <div className='heading'>Average Wager: ${Number(avgWager).toFixed(2)}</div>
            </div>
            <div>
                <table>
                    <caption>Bet History</caption>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Result</th>
                        <th>Bet Type</th>
                        <th>Sport</th>
                        <th>Spread</th>
                        <th>Wagered</th>
                        <th>To Win</th>
                        <th>Net</th>
                    </tr>
                    </thead>
                 {betData.map((bet) => {
                    return (
                    <tbody key={bet._id}>
                    <tr className='beta-container'>
                        {bet.betDate ? 
                    <td>{bet.betDate.slice(0, 10)}</td> : 
                    <td>{bet.submitDate.slice(0,10)}</td>}
                    <td>{bet.result}</td>
                    <td>{bet.betType}</td>
                    <td>{bet.sport}</td>
                    <td>{bet.spread}</td>
                    <td>{Number(bet.wager.toFixed(2))}</td>
                    <td>{Number(bet.win.toFixed(2))}</td>
                        {bet.result === "Win" && 
                    <td>{Number(bet.win.toFixed(2))}</td>}
                        {bet.result === "Lose" && 
                    <td>-{Number(bet.wager.toFixed(2))}</td>}
                        {bet.result === 'Push' && 
                    <td>0</td>}
                    <td><button className='remove-button' onClick={() => removeBet(bet._id)}>RemoveBet</button></td>
                    </tr>
                    </tbody>
                    )})}
                    <tfoot>
                    <tr>
                    <td></td>
                    <td>{winPercentage}%</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{wagerSum}</td>
                    <td>{winSum}</td>
                    <td>{Number(netResult.toFixed(2))}</td>
                    </tr>
                    </tfoot>
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
                   {/* {recentBets.map((bet)=>{
                        return (
                            <div>
                            <div>{bet.submitDate}</div>
                            <div>{bet.result}</div>
                            </div>
                        )
                    })}
                */}
                </div>
            </div>
            <p className = 'link-container'>
            <Link className='link' to='/signup'>Signup</Link><br/>
            <Link className='link' to='/login'>Login</Link><br/>
            <Link className='link' to='/'>Add another bet</Link>
            {auth.username && <button onClick={handleLogout}>Logout</button>}
            </p>
        </div>
    )
}
