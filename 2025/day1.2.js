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

    let current = start;
    console.log(current);
    let prevCurrent;
    let zeroCount = 0;

    for (let j = 0; j < rotArray.length; j++) {
        const rot = rotArray[j];
        let dir = rot[0];
        let numberOfTicks = parseInt(rot.substring(1));
        prevCurrent = current;
        if (dir == "L") {
            current -= numberOfTicks;
        }
        else {
            current += numberOfTicks;
        }

        let logged = false;
        if (current == 0 || current % 100 == 0 || prevCurrent * current < 0) {
            // add 1 zero for the passing of 0 or landing on 0
            zeroCount++;
            logged = true;
        }

        // also add any full-laps
        zeroCount += (numberOfTicks - (numberOfTicks % 100)) / 100;
        current %= 100;
        if (current == -0) {
            current = 0;
        }

        console.log("previous:", prevCurrent, "move:", rot + ":", "current:", current, logged ? "Zero logged" : "");
    }

    console.log("zeroes:", zeroCount);
}

main().catch(console.error);