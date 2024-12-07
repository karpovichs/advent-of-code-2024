const fs = require('fs');

function calcMap(map) {
	const grid = JSON.parse(JSON.stringify(map));

	const guardPosV = grid.findIndex(line => line.join("").includes("^"));
	const guardPosH = grid[guardPosV].indexOf("^");
	const guardPos = { 
        v: guardPosV,
        h: guardPosH 
    };

	// grid[guardPos.v][guardPos.h] = "X";

	const dir = { 
        v: -1, 
        h: 0 , 
        count: 0
    };

    const directions = [
        { v: 0, h: 1 },  // from up to right
        { v: 1, h: 0 },  // from right to down
        { v: 0, h: -1 }, // from down to left
        { v: -1, h: 0 }  // from left to up
    ];

    const steps = [];

    let isLoop = false;

	while (true) {
	    if (!grid[guardPos.v + dir.v] || !grid[guardPos.v + dir.v][guardPos.h + dir.h]) break;

	    if (grid[guardPos.v + dir.v][guardPos.h + dir.h] === "#") {
	        const nextDirection = (directions.findIndex(d => d.v === dir.v && d.h === dir.h) + 1) % directions.length;
	        dir.v = directions[nextDirection].v;
	        dir.h = directions[nextDirection].h;
	        dir.count ++;
	    } else {
            guardPos.v += dir.v;
            guardPos.h += dir.h;
            grid[guardPos.v][guardPos.h] = "X";
        }

	    

        if (steps.join('.').indexOf([guardPos.v, guardPos.h, dir.v, dir.h]) > -1) {
            isLoop = true;

            break;
        } else {
            steps.push([guardPos.v, guardPos.h, dir.v, dir.h])
        }
	}

    return {grid, isLoop}
}

function calcLoops(map) {
    const basicMap = calcMap(map).grid

    let possibleMaps = []
    let score = 0

   
    map.forEach((row , i) => {
        row.forEach((point, j) => {
            if (basicMap[i][j] === 'X') {
                if (point !== '^' && point !== '#') {
                    const possible = JSON.parse(JSON.stringify(map))
                    possible[i][j] = '#'
                    possibleMaps.push(possible)
                }
            }
        })
    })

    possibleMaps.forEach((map, i) => {
        if (i % 10 === 0) {
            console.log(i)
        }
        score += calcMap(map).isLoop
    })

    return score
}


fs.readFile('6.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }

    console.log('total possibilities: ', calcLoops(data.split('\n').map((item) => item.split(''))))
})
