const fs = require('fs');

function findStartPosition(map) {
    for (let i = 0; i < map.length; i++) {
        if (map[i].indexOf('^') > 0) {
            return([i, map[i].indexOf('^')])
        }
    }
}

function checkIfInBounds(map, position) {
    return position[0] - 1 >= 0 && position[1] - 1 >= 0 && position[0] + 1 < map[0].length && position[1] + 1 <= map.length
}

function calcLoop(map) {
    let currP = findStartPosition(map);
    let currD = map[currP[0]][currP[1]];
    let isLoop = false

    while(checkIfInBounds(map, currP)) {
        // console.log(map)
        if (currD === '^') {
            if (map[currP[0] - 1][currP[1]] === 't') {
                isLoop = true
                break;
            }

            if (map[currP[0] - 1][currP[1]] === '#') {
                currD = '>'
            } else {
                map[currP[0]][currP[1]] = 't'
                currP = [currP[0] - 1, currP[1]]
                map[currP[0]][currP[1]] = '^'
            }
        }

        if (currD === '>') {
            if (map[currP[0]][currP[1] + 1] === 'r') {
                isLoop = true
                break;
            }
            

            if (map[currP[0]][currP[1] + 1] === '#') {
                currD = 'v'
            } else {
                map[currP[0]][currP[1]] = 'r'
                currP = [currP[0], currP[1] + 1]
                map[currP[0]][currP[1]] = '>'
            }
        }

        if (currD === 'v') {
            if (map[currP[0] + 1][currP[1]] === 'b') {
                isLoop = true
                break;
            }

            if (map[currP[0] + 1][currP[1]] === '#') {
                currD = '<'
            } else {
                map[currP[0]][currP[1]] = 'b'
                currP = [currP[0] + 1, currP[1]]
                map[currP[0]][currP[1]] = 'v'
   
            }
        }

        if (currD === '<') {
            if (map[currP[0]][currP[1] - 1] === 'l') {
                isLoop = true
                break;
            }

            if (map[currP[0]][currP[1] - 1] === '#') {
                currD = '^'
            } else {
                map[currP[0]][currP[1]] = 'l'
                currP = [currP[0], currP[1] - 1]
                map[currP[0]][currP[1]] = '<'
            }
        }
    }
    
    return isLoop
}

function countPossibilities(map) {
    const possibleMaps = []
    let startPosition = findStartPosition(map);
    let score = 0

    map.forEach((row , i) => {
        row.forEach((point, j) => {
            if (i >= startPosition[0] && point !== '^' && point !== '#') {
                const possible = JSON.parse(JSON.stringify(map))
                possible[i][j] = '#'
                possibleMaps.push(possible)
            }
        })
    })

    possibleMaps.forEach((map, i) => {
        score += calcLoop(map)
        
    })

    return score
}


fs.readFile('6_test.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log('total possibilities: ', countPossibilities(data.split('\n').map((item) => item.split(''))));
})
