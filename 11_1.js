const fs = require('fs');

function getResult(data) {
    const start = data.split(' ').map(Number);
    const blinks = []
    blinks.push(start)

    let score = 0;

    function blink(num, currDepth, depth) {
        if(currDepth === depth) {
            score++;
            return;
        }

        if (num === 0) {
            blink(1, currDepth + 1, depth)
        } else if (num.toString().length % 2 === 0) {
            const split = num.toString().length / 2
            blink(Number(num.toString().substr(0, split )), currDepth + 1, depth)
            blink(Number(num.toString().substr(split)), currDepth + 1, depth)
        } else {
            blink(num * 2024, currDepth + 1, depth)
        }
    }

    start.forEach((num) => {
        blink(num, 0, 25)
    })


    return score;
}

fs.readFile('11.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('final result:', getResult(data));
})
