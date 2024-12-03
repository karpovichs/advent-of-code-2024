const fs = require('fs');

function multiply(data) {
    const multiplyRegexp = /mul\(\d{1,3},\d{1,3}\)/gi;
    const dataArr = data.match(multiplyRegexp);
    const multiplyArr = [];
    let  result = 0;

    if(dataArr === null) {
        return 0;
    }

    dataArr.forEach((item) => {
        multiplyArr.push(item.substr(4, item.length - 5).split(',').map(Number));
    })

    multiplyArr.forEach((item) => {
        result += item[0] * item[1];
    })

    return result;
}

function findInstructions(data) {
    const dataDo = data.split('do()');
    let result = 0

    dataDo.forEach((item) => {
        result += item.indexOf("don't()") === -1 ? multiply(item) : multiply(item.substring(0, item.indexOf("don't()")));
    })

    return result;
}

fs.readFile('3.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log(findInstructions(data));
})
