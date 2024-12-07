const fs = require('fs');

function calcPositions(map) {
	const grid = map.split("\n").map(line => line.split(""));

	const guardPosV = grid.findIndex(line => line.join("").includes("^"));
	const guardPosH = grid[guardPosV].indexOf("^");
	const guardPos = { 
        v: guardPosV,
        h: guardPosH 
    };
	grid[guardPos.v][guardPos.h] = "X";

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

	while (true) {
	    if (!grid[guardPos.v + dir.v] || !grid[guardPos.v + dir.v][guardPos.h + dir.h]) break;

	    if (grid[guardPos.v + dir.v][guardPos.h + dir.h] === "#") {
	        const nextDirection = (directions.findIndex(d => d.v === dir.v && d.h === dir.h) + 1) % directions.length;
	        dir.v = directions[nextDirection].v;
	        dir.h = directions[nextDirection].h;
	        dir.count ++;
	    }

	    guardPos.v += dir.v;
	    guardPos.h += dir.h;
	    grid[guardPos.v][guardPos.h] = "X";
	}
    
	console.log(grid.map(line => line.join("")).join("\n"));
	console.log(grid.map(line => line.join("")).join("\n").split("").filter(c => c === "X").length);
}

fs.readFile('6_test.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    calcPositions(data)
})
