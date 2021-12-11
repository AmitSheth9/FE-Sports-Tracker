import React, {useState} from 'react'
import { mlArr, spreadArr, totalArr } from '../HelperStuff';
import './betinputform.css';

export default function BetInputForm() {
    const [firstDropValue, setFirstDropValue] = useState('Spread');
    const [sportDropValue, setSportDropValue] = useState('Football')
    const [spreadDropValue, setSpreadDropValue] = useState(0)
    const [totalDropValue, setTotalDropVlaue ] = useState(0);
    const [mlDropValue, setMlDropValue] = useState(100);
    const [wagered, setWagered] = useState(0);
    const [toWin, setToWin] = useState(0);
    const [rotationNum, setRotationNum] = useState('');
    
    console.log('firstdropvalue', firstDropValue);
    console.log('sportDropValue', sportDropValue)
    console.log('spreadDropValue', spreadDropValue);
    console.log('totalDropVal', totalDropValue)
    console.log('mlDropValue', mlDropValue);
    return (
        <div>
            <form>
                <label> Sport
                    <select value={sportDropValue} onChange={(e) => setSportDropValue(e.target.value)}>
                        <option value='NFL'>NFL</option>
                        <option value='NBA'>NBA</option>
                        <option value='NCAAB'>NCAAB</option>
                    </select>
                </label>
                <label> 
                    <select value={firstDropValue} onChange={(e) => setFirstDropValue(e.target.value)}>
                        <option value='Spread'>
                            Spread
                        </option>
                        <option value='Total'>
                            Total
                        </option>
                        <option value='Moneyline'>
                            Moneyline
                        </option>
                    </select>
                </label>
                   <div> 
                    {(() => {
                        if (firstDropValue === 'Spread') {
                        return (
                            <div>
                            <label> Select Spread:
                                <select value={spreadDropValue} onChange={(e) => setSpreadDropValue(e.target.value)}>
                                    {spreadArr.map((num => {
                                        return <option key={num} value={num}>{num}</option>
                                    }))}
                                    </select>
                                
                            </label>
                            
                            <label> Team Name
                                <input />
                            </label>
                            </div>
                           
                    
                         ) }
                         else if (firstDropValue === 'Total') {
                             return (<div>
                                 <label> Over/Under:
                                     <select>
                                        <option value='Over'>Over</option>
                                        <option value='Under'>Under</option>
                                        </select>
                                        </label>
                             
                                   <label> Select Total:<select value={totalDropValue} onChange={(e) => setTotalDropVlaue(e.target.value)}>
                                {totalArr.map((num => {
                                   return ( <option key={num}>{num}</option>
                                   )
                                }))}
                                </select>
                                </label>
                                </div>
                                )
                                }
                                else if (firstDropValue === 'Moneyline') {
                                  return ( <label>
                                      <select value={mlDropValue} onChange={(e) => setMlDropValue(e.target.value)}>
                                          {mlArr.map((num => {
                                              return (<option value={num}>{num}</option>)
                                          }))}
                                      </select>
                                  </label>  
                                  )}
                            })()}
                    
                    </div>
                <label> Amount Wagered
                    <input value={wagered} onChange={(e) => setWagered(e.target.value)} />
                </label>
                <label> Amount to Win
                    <input value={toWin} onChange={(e) => setToWin(e.target.value)}/>
                </label>
                <label> Rotation Number:
                    <input value={rotationNum} onChange={(e) => setRotationNum(e.target.value)}/>
                </label>
            </form>
        </div>
    )
}
