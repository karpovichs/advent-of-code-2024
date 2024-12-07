const fs = require('fs');

function findStartPosition(map) {
    // console.log(map)
    for (let i = 0; i < map.length; i++) {
        if (map[i].indexOf('^') > 0) {
            return([i, map[i].indexOf('^')])
        }
    }
}

function checkIfInBounds(map, position) {
    return position[0] - 1 >= 0 && position[1] - 1 >= 0 && position[0] + 1 < map[0].length && position[1] + 1 <= map.length
}

function makeBasicMap(map) {
    let currP = findStartPosition(map);
    let currD = map[currP[0]][currP[1]]

    while(checkIfInBounds(map, currP)) {
        if (currD === '^') {
            if (map[currP[0] - 1][currP[1]] === '#') {
                currD = '>'
            } else {
                map[currP[0]][currP[1]] = 'X'
                currP = [currP[0] - 1, currP[1]]
                map[currP[0]][currP[1]] = '^'
            }
        }

        if (currD === '>') {
            if (map[currP[0]][currP[1] + 1] === '#') {
                currD = 'v'
            } else {
                map[currP[0]][currP[1]] = 'X'
                currP = [currP[0], currP[1] + 1]
                map[currP[0]][currP[1]] = '>'
            }
        }

        if (currD === 'v') {
            if (map[currP[0] + 1][currP[1]] === '#') {
                currD = '<'
            } else {
                map[currP[0]][currP[1]] = 'X'
                currP = [currP[0] + 1, currP[1]]
                map[currP[0]][currP[1]] = 'v'
            }
        }

        if (currD === '<') {
            if (map[currP[0]][currP[1] - 1] === '#') {
                currD = '^'
            } else {
                map[currP[0]][currP[1]] = 'X'
                currP = [currP[0], currP[1] - 1]
                map[currP[0]][currP[1]] = 'v'
            }
        }
    }

    map[currP[0]][currP[1]] = 'X'

    return map;
}

function calcLoop(map) {
    let currP = findStartPosition(map);
    let currD = map[currP[0]][currP[1]];
    let isLoop = false
    let steps = []
    let count = 0;

    while(checkIfInBounds(map, currP)) {
        // if (count > 50) {
        //     break;
        // }
        // count++
        if (currD === '^') {
            if (map[currP[0] - 1][currP[1]] === '#') {
                currD = '>'
            } else {
                // map[currP[0]][currP[1]] = 't'
                currP = [currP[0] - 1, currP[1]]
                map[currP[0]][currP[1]] = '^'
            }

            
        }

        if (currD === '>') {
            if (map[currP[0]][currP[1] + 1] === '#') {
                currD = 'v'
            } else {
                // map[currP[0]][currP[1]] = 'r'
                currP = [currP[0], currP[1] + 1]
                map[currP[0]][currP[1]] = '>'
            }
        }

        if (currD === 'v') {
            if (map[currP[0] + 1][currP[1]] === '#') {
                currD = '<'
            } else {
                // map[currP[0]][currP[1]] = 'v'
                currP = [currP[0] + 1, currP[1]]
                map[currP[0]][currP[1]] = 'v'
   
            }
        }

        if (currD === '<') {
            if (map[currP[0]][currP[1] - 1] === '#') {
                currD = '^'
            } else {
                // map[currP[0]][currP[1]] = '<'
                currP = [currP[0], currP[1] - 1]
                map[currP[0]][currP[1]] = '<'
            }
        }

        const currStep = [currP[0], currP[1], currD]
        // console.log(currStep)
        // console.log(steps)
        // console.log()

        if (steps.join('.').indexOf(currStep) > -1) {
            isLoop = true
            break;
        } else {
            steps.push(currStep)
        }
    }
    
    return isLoop
}

function countPossibilities(map) {
    const possibleMaps = []
    const basicMap = makeBasicMap(JSON.parse(JSON.stringify(map)));
    let startPosition = findStartPosition(JSON.parse(JSON.stringify(map)));
    
    console.log('steps in basic map', basicMap.map((i) => i.join('')).join('').match(/X/g).length)
    let score = 0

    map.forEach((row , i) => {
        row.forEach((point, j) => {
            if (i >= startPosition[0] && point !== '^' && point !== '#' && basicMap[i][j] === 'X') {
                const possible = JSON.parse(JSON.stringify(map))
                possible[i][j] = '#'
                possibleMaps.push(possible)
            }
        })
    })

    console.log('count of possible maps:', possibleMaps.length)

    possibleMaps.forEach((map, i) => {
        if (i % 10 === 0) {
            console.log(i)
        }
        
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
