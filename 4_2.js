const fs = require('fs');

const crosses = ['MSAMS', 'MMASS', 'SMASM', 'SSAMM']

function makeHorizontal(data) {
    return data.split('\n');
}


function find(data) {
    const horizontalArr = makeHorizontal(data);

    let score = 0;

    horizontalArr.forEach((item, i) => {
        if (i > 0 && i < horizontalArr.length - 1) {
            item.split('').forEach((letter, j) => {
                if (j > 0 && j < item.length - 1) {
                    if (letter === 'A') {
                        const word = horizontalArr[i-1][j-1] + horizontalArr[i-1][j+1] + letter + horizontalArr[i+1][j-1] + horizontalArr[i+1][j+1]
                        if (crosses.indexOf(word) > -1) {
                            score++
                        }
                    }
                }
            })
        }
    })

    return score;
}

fs.readFile('4.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log(find(data));
})
