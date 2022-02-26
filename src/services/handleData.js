
 export function betDistributionAnalysis(betData, setSpreadWinPct, setTotalWinPct, setMlWinPct ){
     let spreadWin = 0;
     let spreadLoss = 0;
     let spreadPush = 0;
     let totalWin = 0;
     let totalLoss = 0;
     let totalPush = 0;
     let mlWin = 0;
     let mlLoss = 0;
     let mlPush = 0;
     for ( let i=0; i<betData.length; i++) {
        if(betData[i].betType === 'Spread' && betData[i].result === 'Win' )
        {
            spreadWin++;
        }
        if(betData[i].betType === 'Spread' && betData[i].result === 'Lose'){
            spreadLoss++;
        }
        if(betData[i].betType === 'Spread' && betData[i].result === 'Push') {
            // eslint-disable-next-line no-unused-vars
            spreadPush++;
        }
        if(betData[i].betType === 'Total' && betData[i].result === 'Win' )
        {
            totalWin++;
        }
        if(betData[i].betType === 'Total' && betData[i].result === 'Lose'){
            totalLoss=totalLoss+1;
        }
        if(betData[i].betType === 'Total' && betData[i].result === 'Push') {
            // eslint-disable-next-line no-unused-vars
            totalPush++;
        }
        if(betData[i].betType === 'Moneyline' && betData[i].result === 'Win' )
        {
            mlWin++;
        }
        if(betData[i].betType === 'Moneyline' && betData[i].result === 'Lose'){
            mlLoss++;
        }
        if(betData[i].betType === 'Moneyline' && betData[i].result === 'Push') {
            // eslint-disable-next-line no-unused-vars
            mlPush++;
        }
     }
     function notNum (x) {
        if(isNaN(x)){
            x = 0;
        }
        return x;
    }
     let spreadWinPct = notNum(Number((spreadWin/(spreadWin+spreadLoss)).toFixed(2)));
     let totalWinPct = notNum(Number((totalWin/(totalWin+totalLoss)).toFixed(2)));
     let mlWinPct = notNum(Number((mlWin/(mlWin+mlLoss)).toFixed(2)))
     
     
    //  totalWinPct = notNum(totalWinPct);
    //  spreadWinPct = notNum(spreadWinPct);
    //  mlWinPct = notNum(mlWinPct);
     console.log('spread,total,ml pct', spreadWinPct, totalWinPct, mlWinPct);
     setSpreadWinPct(spreadWinPct*100);
     setTotalWinPct(totalWinPct*100);
     setMlWinPct(mlWinPct*100);
     
 }

 export function sumWageredandWin (betData, setWagerSum, setWinSum, setAvgWager) {
   let wageredSum = betData.map(bet => bet.wager).reduce((prev, next) => prev + next, 0);
   let winSum = betData.map(bet=> bet.win).reduce((prev,next)=> prev+next, 0);
   console.log(wageredSum, winSum);
   function notNum (x) {
    if(isNaN(x)){
        x = 0;
    }
    return x;
}
    setWagerSum(Number(wageredSum.toFixed(2)));
    setWinSum(Number(winSum.toFixed(2)));
    setAvgWager(notNum(wageredSum/betData.length))
    console.log('avgwager', wageredSum/betData.length)
 }

 export function getWinLoss (betData, setWins, setLosses, setPushes, setWinPercentage, setMlPct, setTotalsPct, setSpreadPct, setNetResult) {
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
function notNum (x) {
    if(isNaN(x)){
        x = 0;
    }
    return x;
}
console.log(win,lose, push);
setWins(win);
setLosses(lose);
setPushes(push);
let winPerct = notNum(Number(((win/(win+lose))*100).toFixed(2)));
setWinPercentage(winPerct);
setSpreadPct(notNum(Number(((spreadBets/betData.length) *100).toFixed(2))))
setTotalsPct(notNum(Number(((totalBets/betData.length)*100).toFixed(2))))
setMlPct(notNum(Number(((mlBets/betData.length)*100).toFixed(2))))
console.log(sum);
setNetResult(sum);
return sum;
 }



 //average wager amount
 //past 30days, 60 days, year ---backend
 //by sport ===backend
//move sport back to center of form
//