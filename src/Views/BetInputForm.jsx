import React, {useState} from 'react'
import { mlArr, spreadArr, totalArr } from '../HelperStuff';


export default function BetInputForm() {
    const [firstDropValue, setFirstDropValue] = useState('Spread');
    const [sportDropValue, setSportDropValue] = useState('Football')
    const [spreadDropValue, setSpreadDropValue] = useState(0)
    const [totalDropValue, setTotalDropVlaue ] = useState(0);
    const [mlDropValue, setMlDropValue] = useState(100);
    console.log(spreadArr);
    console.log(firstDropValue);
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
                                <select onChange={(e) => setSpreadDropValue(e.target.value)}>
                                    {spreadArr.map((num => {
                                        console.log(num);
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
                             
                                   <label> Select Total:<select onChange={(e) => setTotalDropVlaue(e.target.value)}>
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
                    <input />
                </label>
                <label> Amount to Win
                    <input />
                </label>
                <label> Rotation Number:
                    <input />
                </label>
            </form>
        </div>
    )
}
