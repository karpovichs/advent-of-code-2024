const fs = require('fs');

function multiply(data) {
    const multiplyRegexp = /mul\(\d{1,3},\d{1,3}\)/gi;
    const dataArr = data.match(multiplyRegexp);
    const multiplyArr = [];
    let  result = 0;

    dataArr.forEach((item) => {
        multiplyArr.push(item.substr(4, item.length - 5).split(',').map(Number));
    })

    multiplyArr.forEach((item) => {
        result += item[0] * item[1];
    })

    return result;
}

fs.readFile('3.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log(multiply(data));
})
