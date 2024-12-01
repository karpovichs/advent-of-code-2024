const fs = require('fs');

function calcDistance(data) {
    const arr = [];
    const leftArr = [];
    const rightArr = [];
    let distance = 0;

    data.split('\n').forEach(i => {
        arr.push(i.split('   '));
    })

    for (let i = 0; i < arr.length; i++) {
        leftArr.push(arr[i][0]);
        rightArr.push(arr[i][1]);
    }

    leftArr.sort();
    rightArr.sort();

    for (let i = 0; i < arr.length; i++) {
        const itemDistance = rightArr[i] > leftArr[i] ? rightArr[i] - leftArr[i] : leftArr[i] - rightArr[i];
        distance += itemDistance;
    }

    return distance;
}

fs.readFile('1.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log(calcDistance(data));
})
