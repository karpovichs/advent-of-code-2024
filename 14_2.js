const fs = require('fs');
const { writeFile } = require('node:fs/promises');

async function getResult(data) {
    const w = 101;
    const h = 103;
    const s = 7603;
    const robots = data.split('\n').map(e => {
        return {
            p: e.split(' ')[0].replace('p=', '').split(',').map(Number),
            v: e.split(' ')[1].replace('v=', '').split(',').map(Number),
        }
    })

    let score = {
        tl: 0,
        tr: 0,
        bl: 0,
        br: 0,
    };

    let ticks = []
    let presentTick = []

    for(let i = 0; i < h; i++) {
        let row = []
        for(let j = 0; j < w; j++) {
            row.push('.')
        }
        presentTick.push(row)
    }

    for (let i = 1; i <= s; i++) {
        let tick = []
        robots.forEach((robot) => {
            let newPW = 0
            let newPH = 0

            if (robot.p[0] + robot.v[0] >= w) {
                newPW = (robot.p[0] + robot.v[0]) % w
            } else if (robot.p[0] + robot.v[0] < 0) {
                newPW = w + (robot.p[0] + robot.v[0]) % w 
            } else {
                newPW = robot.p[0] + robot.v[0]
            }

            if (robot.p[1] + robot.v[1] >= h) {
                newPH = (robot.p[1] + robot.v[1]) % h
            } else if (robot.p[1] + robot.v[1] < 0) {
                newPH = h + (robot.p[1] + robot.v[1]) % h
            } else {
                newPH = robot.p[1] + robot.v[1]
            }

            robot.p = [newPW, newPH]

            tick.push(robot.p)
        })

        ticks.push(tick)
    }

    // run only if you need to create ton of txt to find Easter Egg!
    // for(let i = 0; i < ticks.length; i++) {
    //     const tick = ticks[i]
    //     let present = JSON.parse(JSON.stringify(presentTick))
    //     tick.forEach((coord) => {
    //         present[coord[1]][coord[0]] = '#'
    //     })
    //     const string = present.map(e => e.join('')).join('\n')

    //     try {
    //         const data = new Uint8Array(Buffer.from(string));
    //         const promise = writeFile(`tick-${i + 1}.txt`, data);
          
    //         await promise;
    //     } catch (err) {
    //         console.error(err);
    //     } 
    // }


    robots.forEach((robot) => {
        if (robot.p[0] === Math.floor(w / 2) || robot.p[1] === Math.floor(h / 2)) {
            return
        }

        if (robot.p[0] < Math.floor(w / 2) && robot.p[1] < Math.floor(h / 2)) {
            score.tl++
        } 

        if (robot.p[0] > Math.floor(w / 2) && robot.p[1] < Math.floor(h / 2)) {
            score.tr++
        }

        if (robot.p[0] < Math.floor(w / 2) && robot.p[1] > Math.floor(h / 2)) {
            score.bl++
        } 

        if (robot.p[0] > Math.floor(w / 2) && robot.p[1] > Math.floor(h / 2)) {
            score.br++
        }
    })

    return score.tl * score.tr * score.bl * score.br
}

fs.readFile('14.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('final result:', getResult(data));
})