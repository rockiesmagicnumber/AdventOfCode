function parseInstructions(instruction) {
    let moves = instruction.split(' ');
    let details = {
        numMoved: parseInt(moves[1]),
        fromStack: parseInt(moves[3]),
        toStack: parseInt(moves[5])
    };
    return details;
}

// in retrospect, the solution was either "reverse the for loop" or "reverse the substring" and it seems I solved them both
function processInstruction(stacks, instruction) {
    let fromStackStr = stacks[instruction.fromStack - 1],
        toStackStr = stacks[instruction.toStack - 1];

    let moveStr = fromStackStr.substring(fromStackStr.length - instruction.numMoved, fromStackStr.length);
    toStackStr += moveStr;
    fromStackStr = fromStackStr.substring(0, fromStackStr.length - instruction.numMoved);

    stacks[instruction.fromStack - 1] = fromStackStr;
    stacks[instruction.toStack - 1] = toStackStr;
}

function getResult(stacks) {
    let result = "";
    for (let s = 0; s < stacks.length; s++) {
        result += stacks[s][stacks[s].length - 1];
    }
    return result;
}

fs = require('fs');
fs.readFile("input.txt", "utf8", (err, inputData) => {
    if (!!err) {
        console.error(err);
    }

    let data = inputData.split('\n');

    let stacks = [];
    let rawInstructions = [];
    let instructions = [];

    let isStacks = true;
    let isInstructions = false;

    for (let d = 0; d < data.length; d++) {
        if (data[d].toString().trim() === "") {
            isStacks = false;
            isInstructions = true;
            continue;
        }
        if (isStacks) {
            stacks.push(data[d]);
        } else if (isInstructions) {
            rawInstructions.push(data[d]);
        }
    }

    instructions = rawInstructions.map(parseInstructions);

    console.log(getResult(stacks));

    for (let i = 0; i < instructions.length; i++) {
        let instruction = instructions[i];
        processInstruction(stacks, instruction);
    }

    console.log(getResult(stacks));
});