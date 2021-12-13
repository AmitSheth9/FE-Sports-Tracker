import React, {useState, useEffect} from 'react'
import { mlArr, spreadArr, totalArr, juiceArr } from '../HelperStuff';
import Datetime from 'react-datetime';
import { nflArr, nbaArr } from '../SportTeams';
import "react-datetime/css/react-datetime.css";
import './betinputform.css';

export default function BetInputForm() {
    const [firstDropValue, setFirstDropValue] = useState('Spread');
    const [sportDropValue, setSportDropValue] = useState('NFL')
    const [spreadDropValue, setSpreadDropValue] = useState(-3)
    const [totalDropValue, setTotalDropValue ] = useState('');
    const [team, setTeam] = useState('');
    const [wagered, setWagered] = useState(100);
    const [toWin, setToWin] = useState(100);
    const [rotationNum, setRotationNum] = useState('');
    const [priceDropValue, setPriceDropValue] = useState(-105);
    const [resultValue, setResultValue] = useState('Win');
    const [notes, setNotes] = useState('');
    const [dateBet, setDateBet] = useState();
    const [dateSubmit, setDateSubmit] = useState();
    const [overUnder, setOverUnder] = useState('');

    console.log('firstdropvalue', firstDropValue);
    console.log('sportDropValue', sportDropValue)
    console.log('spreadDropValue', spreadDropValue);
    console.log('totalDropVal', totalDropValue)
    console.log('priceDropValue', priceDropValue);
    console.log('date submit', dateSubmit)

    useEffect(() => {
        function calcJuiceToWin () {
            if(wagered !== (toWin/((priceDropValue/100))) || (wagered!== (toWin*(priceDropValue/100)))) {
                if(priceDropValue>0) {
                let wagerPlus = (toWin/(priceDropValue/100));
                setWagered(wagerPlus);
                }
                else if (priceDropValue<0) {
                let wagerMinus = (toWin * ((priceDropValue/100)*-1));
                setWagered(wagerMinus);
                }
            }
        }
        calcJuiceToWin()}, [priceDropValue, wagered, toWin])

    const handleWagerChange = (e) => {                  
        setWagered(e.target.value); 
    }

    const handleToWinChange = (e) => {
        setToWin(e.target.value);
    }
    const changeDate = (event) => {
        setDateBet(event.toDate()) 
    }

    const getDate = () => {
        let currentDate = new Date().toLocaleString();
        setDateSubmit(currentDate);
    }

    useEffect(() => {
        getDate();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const betObject = {
            sport: sportDropValue,
            betType: firstDropValue,
            spread: spreadDropValue,
            overUnder: overUnder,
            total: totalDropValue,
            price: priceDropValue,
            team: team,
            win: toWin,
            wager: wagered,
            rotation: rotationNum,
            result: resultValue,
            betDate: dateBet,
            notes: notes,
            submitDate: dateSubmit,
        }
        console.log(betObject);
    }
return (
<div className="div-container">
    <form onSubmit={handleSubmit}>
        <label> Sport
        <select 
            value={sportDropValue} 
            onChange={(e) => setSportDropValue(e.target.value)}>
            <option value='NFL'>NFL</option>
            <option value='NBA'>NBA</option>
            <option value='NCAAB'>NCAAB</option>
            <option value='MLB'>MLB</option>
            <option value='NCAAF'>NCAAF</option>
        </select>
        </label>
        <label> Bet Type:
        <select 
            value={firstDropValue} 
            onChange={(e) => setFirstDropValue(e.target.value)}>
            <option value='Spread'>Spread</option>
            <option value='Total'>Total</option>
            <option value='Moneyline'>Moneyline</option>
        </select>
        </label>
        <div> 
            {(() => { 
            if (firstDropValue === 'Spread') {
                return (
                <div>
                    <label> Spread:
                    <select 
                        value={spreadDropValue} 
                        onChange={(e) => setSpreadDropValue(e.target.value)}>
                        {spreadArr.map((num => {
                        return <option key={num} value={num}>{num}</option> 
                        }))}  
                    </select>
                    </label>
                    <label> Price:
                    <select 
                        value={priceDropValue} 
                        onChange={(e) => setPriceDropValue(e.target.value)}>
                        {juiceArr.map((num => {
                        return <option key={num} value={num}>{num}</option>
                        }))}
                    </select>
                    </label>
                   
                </div> )
            }   else if (firstDropValue === 'Total') {
                return (
                <div>
                    <label> Over/Under:
                    <select 
                        value={overUnder} 
                        onChange={setOverUnder}>
                        <option value='Over'>Over</option>
                        <option value='Under'>Under</option>
                    </select>
                    </label>
                    <label> Select Total:
                    <select 
                        value={totalDropValue} 
                        onChange={(e) => setTotalDropValue(e.target.value)}>
                        {totalArr.map((num => {
                            return <option key={num}>{num}</option>
                        }))}
                    </select>
                    </label>
                    <label>Price:
                    <select 
                        value={priceDropValue} 
                        onChange={(e) => setPriceDropValue(e.target.value)}>
                        {juiceArr.map((num => {
                            return <option key={num}>{num}</option>
                        }))}
                    </select>
                    </label>
                </div> )
            }   else if (firstDropValue === 'Moneyline') {
                return ( 
                    <label>Price:
                    <select 
                        value={priceDropValue} 
                        onChange={(e) => setPriceDropValue(e.target.value)}>
                        {mlArr.map((num => {
                            return <option value={num}>{num}</option>
                        }))}
                    </select>
                    </label>  )
            }
            })()}
        </div>
        <label> Amount to Win
        <input value={toWin} onChange={handleToWinChange}/>
        </label>
        <label> Amount Wagered
        <input value={wagered} onChange={handleWagerChange} />
        </label>
        <label>Win/Lose/Push
        <select 
            value={resultValue} 
            onChange={(e) => setResultValue(e.target.value)}>
            <option value="Win">Win</option>
            <option value="Lose">Lose</option>
            <option value="Push">Push</option>
        </select>
        </label>
        <label className='bet-date'>Date of Bet:
        <Datetime 
            id="datepicker"
            className='bet-datetime'
            dateFormat="MM-DD-YY"
            timeFormat={false}
            value={dateBet}
            onChange={changeDate}
        />
        </label>
        <label> Team:
        {(() => { 
            if (sportDropValue === 'NFL') {
                return (
                <select 
                    value={team} 
                    onChange={(e) => setTeam(e.target.value)}>
                {nflArr.map((team => {
                    return <option key={team.name}>{team.code}</option>
                }))}
                </select> )
            }
            else if (sportDropValue === 'NBA') {
                return (
                <select 
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}>
                {nbaArr.map((team => {
                    return <option key={team.teamId}>{team.abbreviation}</option>
                }))}
                </select> )
            }
            })()}
        </label>
        <label> Rotation Number:
        <input 
            value={rotationNum} 
            onChange={(e) => setRotationNum(e.target.value)}/>
        </label>
        <label> Game/Bet Notes
        <input 
            className='notes-input' 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} />
        </label>
        <button type='submit'>Submit Bet</button>
    </form>
</div>
    )
}
