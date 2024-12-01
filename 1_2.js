const fs = require('fs');

function calcSimilarity(data) {
    const arr = []
    data.split('\n').forEach(i => {
        arr.push(i.split('   '));
    })

    const leftArr = [];
    const rightArr = [];
    const appear = [];
    let score = 0;

    for (let i = 0; i < arr.length; i++) {
        leftArr.push(arr[i][0]);
        rightArr.push(arr[i][1]);
    }

    leftArr.sort();
    rightArr.sort();

    for (let i = 0; i < leftArr.length; i++) {
        appear.push(rightArr.filter((e) => e === leftArr[i]).length);
    }

    for (let i = 0; i < arr.length; i++) {
        score += leftArr[i] * appear[i];
    }

    return score;
}

fs.readFile('1.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log(calcSimilarity(data));
})
