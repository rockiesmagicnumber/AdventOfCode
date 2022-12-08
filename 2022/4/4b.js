fs = require('fs');
fs.readFile("input.txt", "utf8", (err, inputData) => {
    if (!!err) {
        console.error(err);
    }

    let data = inputData.split('\n').map(x => x.split(','));

    let fullyContained = 0;

    for (let i = 0; i < data.length; i++) {
        let pair = data[i],
            sec1 = pair[0],
            sec1start = parseInt(sec1.split('-')[0]),
            sec1end = parseInt(sec1.split('-')[1]),
            sec2 = pair[1],
            sec2start = parseInt(sec2.split('-')[0]),
            sec2end = parseInt(sec2.split('-')[1]),
            arr1 = [],
            arr2 = [];

        if (sec1 === sec2) {
            fullyContained++;
            continue;
        }

        for (let j1 = sec1start; j1 <= sec1end; j1++) {
            arr1.push(j1);
        }

        for (let j2 = sec2start; j2 <= sec2end; j2++) {
            arr2.push(j2);
        }

        if (arr1.some(a => arr2.includes(a))) {
            fullyContained++;
        }

    }

    console.log(fullyContained);
});