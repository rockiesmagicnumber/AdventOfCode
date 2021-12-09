const coords = require("./AdventDay5.data.min.js");

function reviewPaths() {
    let squares = [];
    for (let coord of coords) {
        let cs = getCoveredSquares(...coord);
        !!cs[0] && squares.push(...cs[0]);
    }
    let countedSquares = aggregateSquares(squares);
    let multipleSquares = countedSquares.filter(x => countedSquares[x] > 1);
    console.log(multipleSquares.length);
}

function aggregateSquares(squares) {
    REWORK THIS
    // let grouping = [];//squares.map(x => { return { "x": x[0], "y": x[1] }; });
    // for (square of squares) {
    //     let name = square[0] + "-" + square[1];
    //     if (!grouping[name]) {
    //         grouping.push({ name, 1});
    //     } else {
    //         grouping[name]++;
    //     }
    // }
    // return grouping;
}

function getCoveredSquares(x1, y1, x2, y2) {
    let squares = [];
    y1 === y2 && squares.push(getHorizontalLines(x1, x2, y1));
    x1 === x2 && squares.push(getVerticalLines(x1, y1, y2));
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