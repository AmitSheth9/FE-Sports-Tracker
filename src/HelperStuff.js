//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
//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
//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
//third one works
//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
//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
//regenerated terminal token below
//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
const spreadArr = []
for( let i= -45; i < 46;i++) {
    spreadArr.push(i)
    spreadArr.push(i+.5);
}

const totalArr = [];
for (let i= 30; i < 91; i++) {
    totalArr.push(i);
    totalArr.push(i+.5);
}

const mlArr = [];
for (let i=-500; i<501; i++) {
    if(i>99 || i<-99)
    mlArr.push(i);
}

const juiceArr = [];
for (let i=-150; i<151; i++) {
    if(i> 99 || i<-99) {
    juiceArr.push(i);
}
}



export { spreadArr, totalArr, mlArr, juiceArr };