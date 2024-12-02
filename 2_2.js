const fs = require('fs');

function checkLevelsSafety(arr) {
    let isAscStart = arr[0] < arr[1];
    let safe = 1

    for(i = 0; i < arr.length; i++) {
        if (arr[i+1]) {
            if ((arr[i + 1] - arr[i] === 0) || (isAscStart !== arr[i] < arr[i + 1]) || (isAscStart && arr[i + 1] - arr[i] > 3) || (!isAscStart && arr[i] - arr[i + 1] > 3)) {
                safe = 0
                break;
            } 
        }
    }

    return safe
}

function checkPressedLevels(levels) {
    const allArrs = []
    let safe = checkLevelsSafety(levels)

    if (safe === 1) {
        return 1
    }

    levels.forEach((item, i) => {
        const newArr = levels.slice()
        newArr.splice(i, 1)
        allArrs.push(newArr)
    })

    allArrs.forEach(arr => {
        safe += checkLevelsSafety(arr)
    })

    return safe >= 1 ? 1 : 0
}


function calcSafe(data) {
    let score = 0;

    const arr = []
    data.split('\n').forEach(i => {
        arr.push(i.split(' ').map(Number));
    })

    arr.forEach((levels) => {
        score += checkPressedLevels(levels)
    })

    return score;
}

fs.readFile('2.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log('total safe levels:', calcSafe(data));
})
