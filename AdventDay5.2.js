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
    for (let x = 0; x < aSquares.length; x++) {
        for (let y = 0; y < aSquares[x].length; y++) {
            if (aSquares[x][y] > 1) {
                counter++;
            }
        }
    }
    return counter;
}

function aggregateSquares(squares) {
    const arrayMax = getMax(squares);
    const counts = createArray(arrayMax, arrayMax);
    squares.forEach((el) => {
        let x = el[0] - 1,
            y = el[1] - 1;
        try {
            counts[x][y] = (!!counts[x][y] ? (counts[x][y] += 1) : 1);
        } catch (e) {
            console.log(e);
        }
    });
    return counts;
}

function getCoveredSquares(x1, y1, x2, y2) {
    let squares = [];
    if (y1 === y2) {
        squares.push(getHorizontalLines(x1, x2, y1))
    } else if (x1 === x2) {
        squares.push(getVerticalLines(x1, y1, y2))
    } else if (Math.abs(getSlope(x1, y1, x2, y2)) === 1) {
        squares.push(getDiagonalLines(x1, y1, x2, y2))
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

function getSlope(x1, y1, x2, y2) {
    let xDelta = x1 - x2;
    let yDelta = y1 - y2;
    return yDelta / xDelta;
}

function getDiagonalLines(x1, y1, x2, y2) {
    let squares = [],
        x1greater = x1 > x2,
        y1greater = y1 > y2;

    while (
        ((x1greater && x1 >= x2) || (!x1greater && x1 <= x2)) &&
        ((y1greater && y1 >= y2) || (!y1greater && y1 <= y2))
    ) {
        squares.push([x1, y1]);

        if (x1greater) {
            x1--;
        } else {
            x1++;
        }
        if (y1greater) {
            y1--;
        } else {
            y1++;
        }
    }
    return squares;
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function getMax(a) {
    return a.reduce(function(max, arr) {
        return Math.max(max, arr[0]);
    }, -Infinity);
}

reviewPaths();