const fs = require('fs');

function getResult(data) {
    const map = data.split('\n\n')[0].split('\n').map((e) => e.split(''));
    const moves = data.split('\n\n')[1].replaceAll(/\n/g, '').split('');
    let pos = [0, 0];
    let counter = 0;
    let score = 0;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '@') {
                pos = [i, j];
            }
        }
    }

    let dir = {
        '^': {
            x: -1,
            y: 0,
        },
        'v': {
            x: 1,
            y: 0,
        },
        '>': {
            x: 0,
            y: 1,
        },
        '<': {
            x: 0,
            y: -1,
        },
    }

    function findBoxesToMove(d, p) {
        if (map[p[0]][p[1]] === 'O') {
            counter++;
            findBoxesToMove(d, [p[0] + d[0], p[1] + d[1]]);
        }

        return
    }

    function checkFreeSpace(p) {
        return map[p[0]][p[1]] === '.';
    }

    moves.forEach((move) => {
        const moveX = pos[0] + dir[move]['x']
        const moveY = pos[1] + dir[move]['y']
        if (map[moveX][moveY] === '#') {
            // stop
        } else if (map[moveX][moveY] === 'O') {
            findBoxesToMove([dir[move]['x'], dir[move]['y']], [moveX, moveY])
            if (checkFreeSpace([moveX + dir[move]['x'] * counter, moveY + dir[move]['y'] * counter])) {
                for(let i = 1; i <= counter; i++) {
                    map[moveX + dir[move]['x'] * i][moveY + dir[move]['y'] * i] = 'O';
                }

                map[pos[0]][pos[1]] = '.';
                map[moveX][moveY] = '@';
                pos = [moveX, moveY];
            }
            counter = 0
        } else {
            map[pos[0]][pos[1]] = '.';
            map[moveX][moveY] = '@';
            pos = [moveX, moveY];
        }
    })

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 'O') {
                score += 100 * i + j;
            }
        }
    }

    return score
}

fs.readFile('15.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('final result:', getResult(data));
})