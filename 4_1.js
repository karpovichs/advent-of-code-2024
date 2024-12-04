const fs = require('fs');

function findXMAS(data) {
    const xmas = /XMAS/gi;

    return data.match(xmas) ? data.match(xmas).length : 0
}

function findReversedXMAS(data) {
    const xmas = /SAMX/gi;

    return data.match(xmas) ? data.match(xmas).length : 0
}

function makeHorizontal(data) {
    return data.split('\n');
}


function find(data) {
    const horizontalArr = makeHorizontal(data);

    let score = {
        horizontal: 0,
        vertical: 0,
        asc: 0,
        desc: 0,
    };

    horizontalArr.forEach((item, i) => {
        score.horizontal += findXMAS(item)
        score.horizontal += findReversedXMAS(item)

        item.split('').forEach((letter, j) => {
            if (i < horizontalArr.length - 3) {
                const verticalWord = letter + horizontalArr[i+1][j] + horizontalArr[i+2][j] + horizontalArr[i+3][j]
               
                if (verticalWord === 'XMAS' || verticalWord === 'SAMX') {
                    score.vertical++
                }
            }

            if (i < horizontalArr.length - 3 && j < item.length - 3) {
                const diagonalDesc = letter + horizontalArr[i+1][j+1] + horizontalArr[i+2][j+2] + horizontalArr[i+3][j+3]
               
                if (diagonalDesc === 'XMAS' || diagonalDesc === 'SAMX') {
                    score.desc++
                }
            }

            if (i < horizontalArr.length - 3 && j >= 3) {
                const diagonalAcs = letter + horizontalArr[i+1][j-1] + horizontalArr[i+2][j-2] + horizontalArr[i+3][j-3]
                if (diagonalAcs === 'XMAS' || diagonalAcs === 'SAMX') {
                    score.asc++
                }
            }
        })
    })

    return score.horizontal + score.vertical + score.asc + score.desc;
}

fs.readFile('4.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log(find(data));
})
