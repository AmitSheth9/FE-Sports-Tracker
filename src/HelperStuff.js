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