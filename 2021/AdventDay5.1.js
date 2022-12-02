const coords = require("./AdventDay5.data.min.js");

function reviewPaths() {
    let squares = [];
    for (let coord of coords) {
        let cs = getCoveredSquares(...coord);
        !!cs[0] && squares.push(...cs[0]);
    }
    let countedSquares = aggregateSquares(squares);
    let multipleSquaresCount = getMultipleSquaresCount(countedSquares);
    console.log(multipleSquaresCount);
}

function getMultipleSquaresCount(aSquares) {
    let counter = 0;
    Object.keys(aSquares).forEach(k => {
        if (aSquares[k] > 1) {
            counter++;
        }
    });
    return counter;
}

function aggregateSquares(squares) {
    const counts = {};
    squares.forEach((el) => {
        counts[el] = counts[el] ? (counts[el] += 1) : 1;
    });
    return counts;
}

function getCoveredSquares(x1, y1, x2, y2) {
    let squares = [];
    if (y1 === y2) {
        squares.push(getHorizontalLines(x1, x2, y1))
    }
    else if (x1 === x2) {
        squares.push(getVerticalLines(x1, y1, y2))
    }
    return squares;
}

function getHorizontalLines(x1, x2, y) {
    let squares = [];
    for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        squares.push([i, y]);
    }
    return squares;
}

function getVerticalLines(x, y1, y2) {
    let squares = [];
    for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        squares.push([x, i]);
    }
    return squares;
}

reviewPaths();