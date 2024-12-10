const fs = require('fs');

function getResult(data) {
    let count = 0;
    let score = 0;
    const map = data.split('\n').map((i) => i.split('').map(Number))

    let points = [];

    function findPath(h, v) {
        let currPoint = map[h][v]
        
        if (currPoint === 9) {
            points.push(`${h},${v}`)
            return
        }

        if (h > 0 && map[h - 1][v] === currPoint + 1) {
            findPath(h - 1, v)
        }

        if (v > 0 && map[h][v - 1] === currPoint + 1) {
            findPath(h, v - 1)
        }

        if (v < map[h].length - 1 && map[h][v + 1] === currPoint + 1) {
            findPath(h, v + 1)
        }

        if (h < map.length - 1 && map[h + 1][v] === currPoint + 1) {
            findPath(h + 1, v)
        }
    }

    map.forEach((row, i) => {
        row.forEach((point, j) => {
            if (point === 0) {
                count++
                findPath(i, j)

                score += points.length
                
                points = []
            }
        })
    })

    return score;
}

fs.readFile('10.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('final result:', getResult(data));
})
