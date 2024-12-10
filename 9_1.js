const fs = require('fs');

function getResult(data) {
    let dataMap = []
    let currVal = 0

    data.split('').forEach((val, i) => {
        let value 

        if (i % 2 === 0) {
            value = currVal
            currVal++
        } else {
            value = '.'
        }

        for (let j=0; j < Number(val); j++) {
            dataMap.push(value)
        }
    })

    console.log('complete computing')

    let i = 0;
    let j = dataMap.length - 1;
    let k = 0;
    let count = 0;

    
    while (i < j) {
        while (dataMap[i] !== '.') {
            i++
        }

        while (dataMap[j] === '.') {
            j--
        }

        if (i < j) {
            dataMap[i] = dataMap[j]
            dataMap[j] = '.'
        }

        j--;
        i++;
    }

    console.log(dataMap)

    // console.log('complete filtering')
    // console.log(dataMap[i], dataMap[j])

    while(dataMap[k] !== '.') {
        // console.log(count)
        count += k * dataMap[k]
        k++
    }
    
 
    return count;
}

fs.readFile('9.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('final result:', getResult(data));
})
