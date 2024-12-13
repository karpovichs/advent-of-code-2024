const fs = require('fs');

function getResult(data) {
    let cache

    function calc(spent, cost, cur, prize) {
        // console.log(spent)
        const a = cost.a
        const b = cost.b

        console.log(cur)

        if (cur[0] > prize[0] || cur[1] > prize[1]) {
            return;
        }

        if (cur[0] === prize[0] && cur[1] === prize[1]) {
            if (!cache || cache > spent) {
                cache = spent
            }
            return
        }

        
      
        const nextA = [cur[0] + a[0], cur[1] + a[1]]
        const nextB =  [cur[0] + b[0], cur[1] + b[1]]

        calc(spent + 3, cost, nextA, prize)
        calc(spent + 1, cost, nextB, prize)
    }

    calc(0, test, [0, 0], test.prize)

    console.log(cache)

    // cache.forEach((el) => {

    // })
}

fs.readFile('12_test.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('final result:', getResult(data));
})