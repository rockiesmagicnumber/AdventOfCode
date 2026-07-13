const fs = require('fs').promises;

//const filePath = './day2/day2sample.txt';
const filePath = './day2/day2input.txt';

async function main() {
    const dataStr = await fs.readFile(filePath, 'utf8');
    const pairs = dataStr.split(',');
    const ranges = pairs.map(pair => {
        var minmax = pair.split('-').map(x => parseInt(x));
        return minmax;
    });

    const invalidIds = [];
    for (let r = 0; r < ranges.length; r++) {
        const range = ranges[r];
        for (var i = range[0]; i <= range[1]; i++) {
            var numlen = i.toString().length;
            if (numlen % 2 > 0) {
                continue;
            }
            const firsthalf = i.toString().substring(0, numlen / 2);
            const secondhalf = i.toString().substring(numlen / 2);
            if (firsthalf === secondhalf) {
                invalidIds.push(i);
                console.log(i);
            }
        }
    }

    var totalSumIds = invalidIds.reduce((total, current) => parseInt(total) + parseInt(current));
    console.log(totalSumIds);
}

main().catch(console.error);