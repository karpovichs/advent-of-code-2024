const fs = require('fs');

function between(x, min, max) {
    return x >= min && x < max
}

function getAntinodes(data) {
    let map = data.split('\n').map(i => i.split(''))
    const mapWidth = map[0].length;
    const mapHeight = map.length;

    let frequencies = {}
    let allFrequenciesPairs = {}
    let antinodes = new Set()

    map.forEach((row, i) => {
        row.forEach((cell, j) => {
            
            if (cell !== '.') {
                if (!frequencies[cell]) {
                    frequencies[cell] = []
                }

                frequencies[cell].push([i, j])
            }
        })
    })

    for (const [frequency, antennas] of Object.entries(frequencies)) {
        allFrequenciesPairs[frequency] = []

        for (let i = 0; i < antennas.length; i++) {
            for (let j = 0; j < antennas.length; j++) {
                if (i !== j && i > j) {
                    const pair = [antennas[i], antennas[j]]
                    allFrequenciesPairs[frequency].push(pair)
                }
            }
        }
    }

    for (const [frequency, pairs] of Object.entries(allFrequenciesPairs)) {
        pairs.forEach((pair) => {
            const diff = [pair[0][0] - pair[1][0], pair[0][1] - pair[1][1]]
            let coord1 = [pair[0][0] + diff[0], pair[0][1] + diff[1]];
            let coord2 = [pair[1][0] - diff[0], pair[1][1] - diff[1]];

            if (between(coord1[0], 0, mapHeight) && between(coord1[1], 0, mapWidth)) {
                antinodes.add(coord1.toString())
            }

            while (between(coord1[0] + diff[0], 0, mapHeight) && between(coord1[1] + diff[1], 0, mapWidth)) {
                coord1 = [coord1[0] + diff[0], coord1[1] + diff[1]]
                antinodes.add(coord1.toString())
                
            }

            if (between(coord2[0], 0, mapHeight) && between(coord2[1], 0, mapWidth)) {
                antinodes.add(coord2.toString())
            }

            while (between(coord2[0] - diff[0], 0, mapHeight) && between(coord2[1] - diff[1], 0, mapWidth)) {
                coord2 = [coord2[0] - diff[0], coord2[1] - diff[1]]
                antinodes.add(coord2.toString())
            }
        })
    }

    antinodes.forEach((antinode) => {
        const coord = antinode.split(',').map(Number)
        if (map[coord[0]][coord[1]] === '.') {
            map[coord[0]][coord[1]] = '#'
        }
    })

    return map.join().replace(/,|\./g, '').length
}

fs.readFile('8.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('final result:', getAntinodes(data));
})
