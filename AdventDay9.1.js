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
        lowPoints.push(heights[i][j]);
    }
}

console.log(lowPoints.map(x => x + 1).reduce((a, b) => a + b));