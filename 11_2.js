const fs = require('fs');

function getResult(data) {
    const stones = data.split(' ').map(s => parseInt(s));
    let cache = {};
    let score = 0;

    function blink(stone, counter, target) {
        const line = ''.concat(stone, ':', counter)

        if (Object.hasOwn(cache, line)) {
            return cache[line]
        }

        if (counter === target) {
            return 1;
        }

        counter++;

        let value = 0;

        if (stone === 0) {
            value = blink(1, counter, target)
        } else if (stone.toString().length % 2 === 0) {
            const mid = stone.toString().length / 2
            const first = parseInt(stone.toString().slice(0, mid))
            const second = parseInt(stone.toString().slice(mid))
            value += blink(first, counter, target)
            value += blink(second, counter, target)
        } else {
            value = blink(stone * 2024, counter, target)
        }

        cache[line] = value

        return value
    }
    
    stones.forEach((stone) => {
        score += blink(stone, 0, 75)
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
