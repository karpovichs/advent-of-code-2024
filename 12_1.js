const fs = require('fs');

function getResult(data) {
    const garden = data.split('\n').map((i) => i.split(''));
    const cells = {}
    const ids = {}
    let score = 0;
    let counter = 1;

    let fenceCounter = 0
    let areaCounter = 0

    function findArea(pos) {
        if (cells[`${pos[0]}.${pos[1]}`]) {
            return;
        }

        const cellType = garden[pos[0]][pos[1]]
        const top = garden[pos[0] - 1] ? garden[pos[0] - 1][pos[1]] : undefined
        const right = garden[pos[0]][pos[1] + 1]
        const bottom = garden[pos[0] + 1] ? garden[pos[0] + 1][pos[1]] : undefined
        const left = garden[pos[0]][pos[1] - 1]

        let fence = 4
 
        cells[`${pos[0]}.${pos[1]}`] = counter
        // console.log(pos)

        if (top && top === cellType) {
            findArea([pos[0] - 1, pos[1]])
            fence--
        } 
        if (right && right === cellType) {
            findArea([pos[0], pos[1] + 1])
            fence--
        } 
        if (bottom && bottom === cellType) {
            findArea([pos[0] + 1, pos[1]])
            fence--
        } 
        if (left && left === cellType) {
            findArea([pos[0], pos[1] - 1])
            fence--
        }

        fenceCounter += fence
        areaCounter++
    }

    garden.forEach((row, i) => {
        row.forEach((cell, j) => {
            console.log([i, j])
            if (!cells[`${i}.${j}`]) {
                findArea([i, j])
                score += areaCounter * fenceCounter
                areaCounter = 0
                fenceCounter = 0
                counter++
            }
        })
    })

    const areas = {}

    for (const [cell, areaName] of Object.entries(cells)) {
        if (areas[areaName]) {
            areas[areaName].push(cell)
        } else {
            areas[areaName] = [cell]
        }
    }

    return score;
}

fs.readFile('12.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('final result:', getResult(data));
})
