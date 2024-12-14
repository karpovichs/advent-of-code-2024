const fs = require('fs');

function getResult(data) {
    const garden = data.split('\n').map((i) => i.split(''));
    const cells = {}
    let score = 0;
    let counter = 1;
    let areaCounter = 0
    let cornerCounter = 0

    function findArea(pos) {
        if (cells[`${pos[0]}.${pos[1]}`]) {
            return;
        }

        const cellType = garden[pos[0]][pos[1]]
        const top = garden[pos[0] - 1] ? garden[pos[0] - 1][pos[1]] : undefined
        const right = garden[pos[0]][pos[1] + 1]
        const bottom = garden[pos[0] + 1] ? garden[pos[0] + 1][pos[1]] : undefined
        const left = garden[pos[0]][pos[1] - 1]

        const topLeft = garden[pos[0] - 1] ? garden[pos[0] - 1][pos[1] - 1] : undefined
        const topRight = garden[pos[0] - 1] ? garden[pos[0] - 1][pos[1] + 1] : undefined
        const bottomRight = garden[pos[0] + 1] ? garden[pos[0] + 1][pos[1] + 1] : undefined
        const bottomLeft = garden[pos[0] + 1] ? garden[pos[0] + 1][pos[1] - 1] : undefined
        
        cells[`${pos[0]}.${pos[1]}`] = counter

        if ((left === cellType && top === cellType && topLeft !== cellType) || (left !== cellType && top !== cellType)) {
            cornerCounter++
        }

        if ((top === cellType && right === cellType && topRight !== cellType) || (top !== cellType && right !== cellType)) {
            cornerCounter++
        }

        if ((right === cellType && bottom === cellType && bottomRight !== cellType) || (right !== cellType && bottom !== cellType)) {
            cornerCounter++
        }

        if ((bottom === cellType && left === cellType && bottomLeft !== cellType) || (bottom !== cellType && left !== cellType)) {
            cornerCounter++
        }

        if (top && top === cellType) {
            findArea([pos[0] - 1, pos[1]])
        } 
        if (right && right === cellType) {
            findArea([pos[0], pos[1] + 1])
        } 
        if (bottom && bottom === cellType) {
            findArea([pos[0] + 1, pos[1]])        
        } 
        if (left && left === cellType) {
            findArea([pos[0], pos[1] - 1])
        }

        areaCounter++
    }

    garden.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (!cells[`${i}.${j}`]) {
                findArea([i, j])
                score += areaCounter * cornerCounter
                areaCounter = 0
                cornerCounter = 0
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
