const fs = require('fs');

function getResult(data) {
    const garden = data.split('\n').map((i) => i.split(''));
    const numOfCells = garden.length * garden[0].length;
    const cells = {}
    const ids = {}
    let score = 0;
    let counter = 1;
    let pos = [0, 0];


    // while (counter < data.length) {
    //     const cellType = garden[pos[0]][pos[1]]
        
    //     console.log(cellType)
    //     counter++
    // }

    function findArea(pos) {
        const cellType = garden[pos[0]][pos[1]]
        const top = garden[pos[0] - 1] ? garden[pos[0] - 1][pos[1]] : undefined
        const right = garden[pos[0]][pos[1] + 1]
        const bottom = garden[pos[0] + 1] ? garden[pos[0] + 1][pos[1]] : undefined
        const left = garden[pos[0]][pos[1] - 1]

        if (top && top === cellType) {
            findArea([pos[0] - 1, pos[1]])
        } else if (right && right === cellType) {
            findArea([pos[0], pos[1] + 1])
        } else if (bottom && bottom === cellType) {
            findArea([pos[0] + 1, pos[1]])
        } else if (left && left === cellType) {
            findArea([pos[0], pos[1] - 1])
        } else {
            return;
        }

        cells[`${pos[0]}.${pos[1]}`] = counter
        return
    }

    garden.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (!cells[`${i}.${j}`]) {
                findArea([i, j])
                counter++
            }
        })
    })

    // for (const [areaName, cells] of Object.entries(areas)) {
    //     let perimeter = 0;
    //     let area = cells.length
    //     let count = 0;

    //     cells.forEach((cell, i) => {
    //         let fence = 4;
    //         const h = Number(cell[0])
    //         const v = Number(cell[2])

    //         if (cells.indexOf(`${h - 1}.${v}`) > -1) {
    //             fence--;
    //             count++
    //         }

    //         if (cells.indexOf(`${h}.${v + 1}`) > -1) {
    //             fence--;
    //             count++
    //         }

    //         if (cells.indexOf(`${h + 1}.${v}`) > -1) {
    //             fence--;
    //             count++
    //         }

    //         if (cells.indexOf(`${h}.${v - 1}`) > -1) {
    //             fence--;
    //             count++
    //         }

    //         // console.log(cell, fence)

    //         perimeter += fence
    //     })

    //     // console.log('area name: ', areaName)
    //     // console.log('area: ', area)
    //     // console.log('perimeter: ', perimeter)
    //     // console.log('count: ', count)
    //     // console.log('test ', area * 4 - count === perimeter)

    //     if (count === area * 4 - perimeter) {
    //         console.log('several areas!')
    //     }


    //     // const quantity;
    //     // console.log(area, perimeter)

    //     score += perimeter * area
    // }

    return score;
}

fs.readFile('12_test.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('final result:', getResult(data));
})
