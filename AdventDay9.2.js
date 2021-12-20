const heights = require('./AdventDay9.data.min.js');
//const heights = require('./AdventDay9.data.test.js');

let lowPoints = [];

for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < heights[i].length; j++) {
        let thisHeight = heights[i][j];
        if (i > 0) {
            if (heights[i - 1][j] <= thisHeight) {
                continue;
            }
        }
        if (j > 0) {
            if (heights[i][j - 1] <= thisHeight) {
                continue;
            }
        }
        if (i < heights.length - 1) {
            if (heights[i + 1][j] <= thisHeight) {
                continue;
            }
        }
        if (j < heights[i].length - 1) {
            if (heights[i][j + 1] <= thisHeight) {
                continue;
            }
        }
        lowPoints.push([i, j]);
    }
}

let basins = [];

for (let l of lowPoints) {
    let basin = [];
    basin.push(l);

    // check heights directly above
    if (l[0] > 0) {
        for (let i = l[0] - 1; i > 0; i--) {
            if (heights[i][l[1]] === 9) {
                break;
            }
            basin.push([i, l[1]]);
        }

        basins.push(basin);
    }
}