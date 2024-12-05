const fs = require('fs');

function findRightOrders(data) {
    const rules = data.split('\n\n')[0].split('\n').map((item) => item.split('|').map(Number))
    const orders = data.split('\n\n')[1].split('\n').map((item) => item.split(',').map(Number))
    let rightOrders = []
    let wrongOrders = []


    orders.forEach((order) => {
        const rulesForOrder = rules.filter((e) => order.indexOf(e[0]) >= 0 && order.indexOf(e[1]) >= 0)
        let errorCount = 0

        rulesForOrder.forEach(rule => {
            if (order.indexOf(rule[0]) > order.indexOf(rule[1])) {
                errorCount++
            }
        })

        errorCount === 0 ? rightOrders.push(order) : wrongOrders.push(order)
    })

    return rightOrders;
}

function calcRightOrders(data) {
    const rightOrders = findRightOrders(data);
    let score = 0;

    rightOrders.forEach((order) => {
        score += order[Math.floor(order.length / 2)]
    })

    return score;
}

fs.readFile('5.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log(calcRightOrders(data));
})
