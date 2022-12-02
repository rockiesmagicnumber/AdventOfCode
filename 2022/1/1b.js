fs = require('fs');
fs.readFile("input.txt", "utf8", (err, inputData) => {
    if (!!err) {
        console.error(err);
    }

    var data = inputData.split('\n').map(x => parseInt(x));

    var elves = [];
    var elfWeights = [];
    let currentElf = 0;

    for (let i = 0; i < data.length; i++) {
        if (!!data[i]) {
            if (!elves[currentElf]) {
                elves[currentElf] = [];
            }
            elves[currentElf].push(data[i]);
        } else {
            currentElf++;
        }
    }

    for (let j = 0; j < elves.length; j++) {
        let elf = elves[j];
        let totalElfWeight = elf.reduce((a, b) => a + b);

        elfWeights.push(totalElfWeight);
    }

    let topWeights = [...elfWeights].sort((a, b) => b - a).slice(0, 3);
    let totalTopWeights = topWeights.reduce((a, b) => a + b);
    console.log(totalTopWeights);
});