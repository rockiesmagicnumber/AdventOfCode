const heights = require('./AdventDay9.data.min.js');
//const heights = require('./AdventDay9.data.test.js');
let allHeights = [];

let getLowPoints = function(heights) {
    let lp = [];
    for (let i = 0; i < heights.length; i++) {
        for (let j = 0; j < heights[i].length; j++) {
            allHeights.push({ "visited": false, "x": i, "y": j });
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
            lp.push({ "visited": false, "x": i, "y": j });
        }
    }
    return lp;
}

let getNeighbors = function(node, allHeights) {
    return Array.from(allHeights).filter(n =>
        (node.x === n.x && Math.abs(node.y - n.y) === 1) ||
        (node.y === n.y && Math.abs(node.x - n.x) === 1)
    );
}

let findBasin = function(lowPoint, allHeights) {
    let basin = [];
    let queue = [];
    queue.push(lowPoint);
    basin.push(lowPoint);
    lowPoint.visited = true;
    while (queue.length > 0) {
        let node = queue.shift();
        getNeighbors(node, allHeights).forEach(n => {
            if (!n.visited && heights[n.x][n.y] != 9) {
                n.visited = true;
                queue.push(n);
            }
        });
    }
    return basin;
}

let getBasins = function(lowPoints, allHeights) {
    let basins = []
    lowPoints.forEach(l => {
        basins.push(findBasin(l, allHeights));
    });
    return basins;
}


let lowPoints = getLowPoints(heights);
let basins = getBasins(lowPoints, allHeights);

console.log(basins)