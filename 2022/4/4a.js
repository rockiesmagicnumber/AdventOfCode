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
            numStr1 = '',
            numStr2 = '';

        if ((sec1 === sec2) ||
            (sec1start <= sec2start && sec1end >= sec2end) ||
            (sec2start <= sec1start && sec2end >= sec1end)) {
            fullyContained++;
        }
    }

    console.log(fullyContained);
});