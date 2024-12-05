const fs = require('fs');

function findRules(rules, order) {
    return rules.filter((e) => order.indexOf(e[0]) >= 0 && order.indexOf(e[1]) >= 0)
}

function checkRule(rule, order) {
    return order.indexOf(rule[0]) > order.indexOf(rule[1]) ? 1 : 0
}

function checkAllRules(rules, order) {
    let count = 0;

    rules.forEach(rule => {
        count += checkRule(rule, order)
    })

    return count;
}

function findWrongOrders(data) {
    const rules = data.split('\n\n')[0].split('\n').map((item) => item.split('|').map(Number))
    const orders = data.split('\n\n')[1].split('\n').map((item) => item.split(',').map(Number))
    let wrongOrders = []


    orders.forEach((order) => {
        const rulesForOrder = findRules(rules, order)
        let errorCount = checkAllRules(rulesForOrder, order)

        if (errorCount !== 0) {
            wrongOrders.push({
                'list': order,
                'rules': [...rulesForOrder]
            })
        }
    })

    return wrongOrders;
}

function reorder(order, rules) {
    const newOrder = order
 
    while(checkAllRules(rules, newOrder) > 0) {
        rules.forEach(rule => {
            if (checkRule(rule, newOrder)) {
                const temp = newOrder[newOrder.indexOf(rule[0])]
                newOrder[newOrder.indexOf(rule[0])] = newOrder[newOrder.indexOf(rule[1])]
                newOrder[newOrder.indexOf(rule[1])] = temp
            }
        })
    }

    return newOrder
}

function calcRightOrders(data) {
    const wrongOrders = findWrongOrders(data);
    const rightOrders = [];
    let score = 0;

    wrongOrders.forEach((order) => {
        rightOrders.push(reorder(order['list'], order['rules']))
    })

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
