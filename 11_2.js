const fs = require('fs');

function getResult(data) {
    const stones = data.trim().split(' ').map(s => parseInt(s.trim()));
    let count = 0;
    let cache = new Map();

    function blink(stone, depth, target) {
        const key = `${stone}.${depth}`
        const cached = cache.get[key]

        if (cached !== undefined) {
            return cached
        }

        let result = 0;
        const nextDepth = depth + 1;
        const stoneStr = stone.toString();

        if (depth === target) {
            return result = 1;
        } else if (stone === 0) {
            result = blink(1, nextDepth, target)
        } else if (stoneStr.length % 2 === 0) {
            result = blink( parseInt(stoneStr.slice(0, stoneStr.length / 2)), nextDepth, target) + blink(parseInt(stoneStr.slice(stoneStr.length / 2)), nextDepth, target);
        } else {
            result = blink(stone * 2024, nextDepth, target)
        }
        
        cache.set(key, result);
        return result;
    }

    for (const stone of stones) {
        console.log(stone)
        count += blink(stone, 0, 75)
    }

    return count;
}

fs.readFile('11.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('final result:', getResult(data));
})
