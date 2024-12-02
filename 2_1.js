const fs = require('fs');

function calcSafe(data) {
    let score = 0;

    const arr = []
    data.split('\n').forEach(i => {
        arr.push(i.split(' ').map(Number));
    })

    arr.forEach((levels) => {
        let isAscStart = levels[0] < levels[1];
        let safe = 1
        let reason = ''

        for(i = 0; i < levels.length; i++) {
            if (levels[i+1]) {
                if (levels[i + 1] - levels[i] === 0) {
                    reason = 'duplicates'
                    safe = 0;
                    break;
                } else if (isAscStart !== levels[i] < levels[i + 1]) {
                    reason = 'order changed'
                    safe = 0;
                    break;
                } else if (isAscStart && levels[i + 1] - levels[i] > 3) {
                    reason = 'too big difference'
                    safe = 0;
                    break;
                } else if (!isAscStart && levels[i] - levels[i + 1] > 3) {
                    reason = 'too big difference'
                    safe = 0;
                    break;
                } else {
                    safe = 1
                }
            }
        }

        score += safe
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
