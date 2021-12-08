const coords = require("./AdventDay5.data.min.js");

function reviewPaths() {
    for (let coord of coords) {
        let squares = getCoveredSquares(coord);
        //let countedSquares = squares.reduce()	
    }
}

function getCoveredSquares(x1, y1, x2, y2) {
    let squares = [];
    squares.push(getHorizontalLines(x1, x2, y1));
    squares.push(getVerticalLines(x1, y1, y2));
    return squares;
}

function getHorizontalLines(x1, x2, y) {
    let squares = [];
    for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        squares.push({ x: i, y: y });
    }
    return squares;
}

function getVerticalLines(x, y1, y2) {
    let squares = [];
    for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        squares.push({ x: x, y: i });
    }
    return squares;
}

getCoveredSquares(coords[0]);