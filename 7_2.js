const fs = require('fs');

function getResult(data) {
    let score = 0;
    const equations = {}

    data.split('\n').forEach((item) => {
        equations[item.split(': ')[0]] = item.split(': ')[1].split(' ').map(Number)
    })

    const calculatable = new Set

    function check(result, left, right, list) {
        let mulRes = left * right
        let sumRes = left + right
        let concRes = Number(`${left}${right}`)

        if ((mulRes === result || sumRes === result || concRes === result) && list.length === 0) {
            calculatable.add(result);
            return;
        }

        if (list.length === 0) {
            return;
        }

        right = list.shift();

        check(result, mulRes, right, list.slice());
        check(result, sumRes, right, list.slice());
        check(result, concRes, right, list.slice())
    }

    
    Object.keys(equations).forEach((key, i) => {
        const equation = equations[key]
        const left = equation.shift();
        const right = equation.shift();
        check(Number(key), left, right, equation)
    })

    calculatable.forEach((item) => {
        score += Number(item)
    })
 
    return score;
}

fs.readFile('7.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log('final result:', getResult(data));
})