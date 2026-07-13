const fs = require('fs').promises;

//const filePath = './day1sample.txt';
const filePath = './day1input.txt';

async function main() {
    const dataStr = await fs.readFile(filePath, 'utf8');

    const start = 50;

    let rotArray = dataStr.split('\n').filter(line => line.trim() !== '');

    let current = start;
    let zeroCount = 0;

    for (let j = 0; j < rotArray.length; j++) {
        const rot = rotArray[j];
        let dir = rot[0];
        let numberOfTicks = parseInt(rot.substring(1));
        
        let startPos = current;
        let endPos;
        
        if (dir === "L") {
            endPos = current - numberOfTicks;
        } else {
            endPos = current + numberOfTicks;
        }
        
        // Count how many multiples of 100 we pass through during this rotation
        // We pass through 0 when the position is exactly a multiple of 100
        // We need to count multiples of 100 in the range (startPos, endPos] if going right
        // or [endPos, startPos) if going left
        
        if (dir === "L") {
            // Going left: positions decrease from startPos to endPos
            // Count multiples of 100 in [endPos, startPos), excluding startPos
            // This counts passing through 0 during rotation, including if we end at 0
            let minPos = endPos;
            let maxPos = startPos;
            
            // Find the smallest multiple of 100 >= minPos
            let minMultiple = Math.ceil(minPos / 100) * 100;
            // Find the largest multiple of 100 < maxPos (exclude starting position)
            let maxMultiple = Math.floor((maxPos - 1) / 100) * 100;
            
            if (minMultiple <= maxMultiple) {
                let count = (maxMultiple - minMultiple) / 100 + 1;
                zeroCount += count;
            }
        } else {
            // Going right: positions increase from startPos to endPos
            // Count multiples of 100 in (startPos, endPos]
            // This counts passing through 0 during rotation, including if we end at 0
            let minPos = startPos;
            let maxPos = endPos;
            
            // Find the smallest multiple of 100 > minPos (exclude starting position)
            let minMultiple = Math.floor(minPos / 100) * 100 + 100;
            // Find the largest multiple of 100 <= maxPos
            let maxMultiple = Math.floor(maxPos / 100) * 100;
            
            if (minMultiple <= maxMultiple) {
                let count = (maxMultiple - minMultiple) / 100 + 1;
                zeroCount += count;
            }
        }
        
        current = endPos;
        
        // Normalize current to [0, 99]
        current = ((current % 100) + 100) % 100;
    }

    console.log(zeroCount);
}

main().catch(console.error);