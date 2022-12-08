const linesStr = require('./AdventDay10.data.test.js');

const lines = linesStr.split('\n');
const pairs = [
    { o: '(', c: ')', score: 3 },
    { o: '{', c: '}', score: 1197 },
    { o: '[', c: ']', score: 57 },
    { o: '<', c: '>', score: 25137 },
];

let errors = [];
let chunks = [];

let processLine = function(line) {
    for (let l = 0; l < line.length; l++) {
        if (isCloserChar(line[l])) {
            let openerIndex = getOpenerIndexByCloserIndex(line, l);
            if (openerIndex === -1) {
                let expectedOpenerIndex = getExpectedOpenerIndexByCloserIndex(line, l);
                errors.push({ o: line[expectedOpenerIndex], c: line[l] });
                continue;
            }

            chunks.push({ o: openerIndex, c: l, l: line });
        }
    }
}

let getOpenerIndexByCloserIndex = function(line, closeIndex) {
    let pair = pairs.find(p => p.c === line[closeIndex]);
    for (let l = closeIndex - 1; l > -1; l--) {
        if (!!chunks.find(c => c.line === line && c.o === l)) {
            continue;
        }
        if (line[l] === pair.o) {
            return l;
        }
    }
    return -1;
}

let getExpectedOpenerIndexByCloserIndex = function(line, closerIndex) {
    let numClosers = 0;
    for (let l = closerIndex - 1; l > -1; l++) {
        numClosers += isCloserChar(line[l]) ? 1 : 0;
    }

    let numCharactersBehind = ((numClosers * 2) + 1);
    return closerIndex - numCharactersBehind;

}

let isCloserChar = function(c) {
    return !!pairs.find(p => p.c === c);
}

let getTotalErrorScore = function() {
    let score = 0;
    errors.forEach(e => { score += getErrorScore(e); });
    return score;
}
let getErrorScore = function(error) {
    let pair = pairs.find(p => p.o === error.o);
    console.log("Expected " + pair.c + ", received " + error.c);
    return pair.score;
}

let score = 0;
for (let line of lines) {
    processLine(line);
    score += getTotalErrorScore();
}
console.log(score);