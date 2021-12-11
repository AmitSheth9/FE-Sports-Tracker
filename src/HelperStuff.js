const spreadArr = []
for( let i= -45; i < 45;i++) {
    spreadArr.push(i)
    spreadArr.push(i+.5);
}



const totalArr = [];
for (let i= 30; i < 90; i++) {
    totalArr.push(i);
    totalArr.push(i+.5);
}

const mlArr = [];
for (let i=-500; i<501; i++) {
    mlArr.push(i);
}
export { spreadArr, totalArr, mlArr };