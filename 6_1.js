const fs = require('fs');

function findStartPosition(map) {
    for (let i = 0; i < map.length; i++) {
        if (map[i].indexOf('^') > 0) {
            return([i, map[i].indexOf('^')])
        }
    }
}

function checkIfInBounds(map, position) {
    return position[0] - 1 >= 0 && position[1] - 1 >= 0 && position[0] + 1 < map[0].length && position[1] + 1 < map.length
}


function calcPositions(map) {
    let currP = findStartPosition(map);
    let currD = map[currP[0]][currP[1]]

    while(checkIfInBounds(map, currP)) {
        if (currD === '^') {
            console.log('to top')

            if (map[currP[0] - 1][currP[1]] === '#') {
                'turn to >'
                currD = '>'
            } else {
                map[currP[0]][currP[1]] = 'X'
                currP = [currP[0] - 1, currP[1]]
                map[currP[0]][currP[1]] = '^'
            }
        }

        if (currD === '>') {
            console.log('to right')

            if (map[currP[0]][currP[1] + 1] === '#') {
                'turn to '
                currD = 'v'
            } else {
                map[currP[0]][currP[1]] = 'X'
                currP = [currP[0], currP[1] + 1]
                map[currP[0]][currP[1]] = '>'
            }
        }

        if (currD === 'v') {
            console.log('to bottom')

            if (map[currP[0] + 1][currP[1]] === '#') {
                'turn to left'
                currD = '<'
            } else {
                map[currP[0]][currP[1]] = 'X'
                currP = [currP[0] + 1, currP[1]]
                map[currP[0]][currP[1]] = 'v'
            }
        }

        if (currD === '<') {
            console.log('to left')

            if (map[currP[0]][currP[1] - 1] === '#') {
                'turn to top'
                currD = '^'
            } else {
                map[currP[0]][currP[1]] = 'X'
                currP = [currP[0], currP[1] - 1]
                map[currP[0]][currP[1]] = 'v'
            }
        }
    }

    return map.map((i) => i.join('')).join('').match(/X/g).length + 1;
}

fs.readFile('6.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log('total positions: ', calcPositions(data.split('\n').map((item) => item.split(''))));
})
