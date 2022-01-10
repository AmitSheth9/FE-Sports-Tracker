import React, {useState, useEffect} from 'react'
import { mlArr, spreadArr, totalArr, juiceArr } from '../../HelperStuff';
import Datetime from 'react-datetime';
import { nflArr, nbaArr } from '../../SportTeams';
import "react-datetime/css/react-datetime.css";
import './betinputform.css';
import { Link } from 'react-router-dom';

export default function BetInputForm() {
    const [firstDropValue, setFirstDropValue] = useState('Spread');
    const [sportDropValue, setSportDropValue] = useState('NFL')
    const [spreadDropValue, setSpreadDropValue] = useState(-3)
    const [totalDropValue, setTotalDropValue ] = useState('');
    const [team, setTeam] = useState('');
    const [wagered, setWagered] = useState(105);
    const [toWin, setToWin] = useState(100);
    const [rotationNum, setRotationNum] = useState('');
    const [priceDropValue, setPriceDropValue] = useState(-105);
    const [resultValue, setResultValue] = useState('Win');
    const [notes, setNotes] = useState('');
    const [dateBet, setDateBet] = useState();
    const [dateSubmit, setDateSubmit] = useState();
    const [overUnder, setOverUnder] = useState('');
    const [gamePart, setGamePart] =useState('Game');

    //console.log('firstdropvalue', firstDropValue);
    //console.log('sportDropValue', sportDropValue)
    //console.log('spreadDropValue', spreadDropValue);
    //console.log('totalDropVal', totalDropValue)
    //console.log('priceDropValue', priceDropValue);
    //console.log('date submit', dateSubmit)
    console.log('wagered', wagered)
    console.log('win', toWin)

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
/*
    const handleWagerChange = (e) => {                  
        setWagered(e.target.value); 
    }

    const handleToWinChange = (e) => {
        setToWin(e.target.value);
    }
*/
    const handleWinWager = (e) => {
        console.log('etargetname', e.target.name);
        if (e.target.name === 'win') {
            setToWin(e.target.value);
            setWagered(calcWager(e));
        }
        else if (e.target.name === 'wager') {
            setWagered(e.target.value);
            setToWin(calcWin(e));
        }
    }
    function calcWager (e) {
            if(priceDropValue>0) {
            let wagerPlus = (e.target.value/(priceDropValue/100));
            return wagerPlus;
            }
            else if (priceDropValue<0) {
            let wagerMinus = (e.target.value * ((priceDropValue/100)*-1));
            return wagerMinus;
            }
    }
    function calcWin (e) {
        if (priceDropValue<0) {
            let winMinus = ((e.target.value)/((priceDropValue/100)*-1));
            return winMinus;
        
        }
        else if(priceDropValue>0) {
            let winPlus =((e.target.value)*(priceDropValue/100));
            return winPlus;
        }
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
            gamePart: gamePart,
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
<div >
    <form className="form-container" onSubmit={handleSubmit}>
        <label className='sport'> Sport
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
        <div className='row-two'>
        <label className='bet-type'> Bet Type:
        <select 
            value={firstDropValue} 
            onChange={(e) => setFirstDropValue(e.target.value)}>
            <option value='Spread'>Spread</option>
            <option value='Total'>Total</option>
            <option value='Moneyline'>Moneyline</option>
        </select>
        </label>
        <label className='game-part'>
            <select
                value={gamePart}
                onChange={(e) => setGamePart(e.target.value)}>
                <option value='Game'>GM</option>   
                <option value='1H'>1H</option>
                <option value='2H'>2H</option>
                </select>
        </label>
        </div>
        <div className='div-conditional-container'> 
            {(() => { 
            if (firstDropValue === 'Spread') {
                return (
                <div className='div-spread'>
                    <label className='label-spread'> Spread:
                    <select 
                        value={spreadDropValue} 
                        onChange={(e) => setSpreadDropValue(e.target.value)}>
                        {spreadArr.map((num => {
                        return <option key={num} value={num}>{num}</option> 
                        }))}  
                    </select>
                    </label>
                    <label className='label-spread-price'> Price:
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
                <div className='div-total'>
                    <label className='label-total'> Over/Under:
                    <select 
                        value={overUnder} 
                        onChange={setOverUnder}>
                        <option value='Over'>Over</option>
                        <option value='Under'>Under</option>
                    </select>
                    </label>
                    <label className='label-total-amount'> Select Total:
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
                    <label className='label-mlprice'>Price:
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
        <label className='win-wagered'> Amount Wagered
        <input name='wager' value={wagered} onChange={handleWinWager} />
        </label>
        <label className='win-wagered'> Amount to Win
        <input name='win' value={toWin} onChange={handleWinWager}/>
        </label>
        <br/>
        <label className='result'>Win/Lose/Push
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
            inputProps={{className:'datetime'}}
            id="datepicker"
            className='bet-datetime'
            dateFormat="MM-DD-YY"
            timeFormat={false}
            value={dateBet}
            onChange={changeDate}
        />
        </label>
        <label className='label-teams'> Team:
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
        <label className='rotation'> Rotation Number:
        <input 
            value={rotationNum} 
            onChange={(e) => setRotationNum(e.target.value)}/>
        </label>
        <label className='notes'>Bet Notes
        <input 
            className='notes-input' 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} />
        </label>
        <button type='submit'>Submit Bet</button>
    </form>
    <div>
        <Link to='/signup'>Signup</Link><br/>
        <Link to='/login'>Login</Link>
    </div>
</div>
    )
}
