const fs = require('fs').promises;

//const filePath = './day1sample.txt';
const filePath = './day1input.txt';

async function main() {
    const dataStr = await fs.readFile(filePath, 'utf8');

    const start = 50;

    let dialArray = [];
    for (let i = 0; i <= 99; i++) {
        dialArray.push(i);
    }

    let rotArray = dataStr.split('\n');
    console.log(rotArray[0], rotArray[rotArray.length - 1]);

    let current = start;
    let zeroCount = 0;

    for (let j = 0; j < rotArray.length; j++) {
        const rot = rotArray[j];
        let dir = rot[0];
        let num = parseInt(rot.substring(1));
        let dirMult = dir === "L" ? -1 : 1;
        let dirNum = num * dirMult;
        current += dirNum;
        if (current % 100 == 0) {
            zeroCount++;
        }

        //console.log(rot + ":", current);
    }

    console.log("zeroes:", zeroCount);
}

main().catch(console.error);