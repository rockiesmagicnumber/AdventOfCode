const heights = require('./AdventDay9.data.min.js');
//const heights = require('./AdventDay9.data.test.js');
let allHeights = [];

let getLowPoints = function(heights) {
    let lp = [];
    for (let i = 0; i < heights.length; i++) {
        for (let j = 0; j < heights[i].length; j++) {
            let thisHeight = heights[i][j];
            allHeights.push({ "visited": false, "row": i, "col": j, "val": thisHeight });
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
            lp.push({ "visited": false, "row": i, "col": j, "val": thisHeight });
        }
    }
    return lp;
}

let getNeighbors = function(node, allHeights) {
    return Array.from(allHeights).filter(n =>
        (node.row === n.row && Math.abs(node.col - n.col) === 1) ||
        (node.col === n.col && Math.abs(node.row - n.row) === 1)
    );
}

let findBasin = function(lowPoint, allHeights) {
    let basin = [];
    let queue = [];
    queue.push(lowPoint);
    while (queue.length > 0) {
        let node = queue.shift();
        allHeights.find(h => h.row === node.row && h.col === node.col).visited = true;
        basin.push(node);
        let neighbors = getNeighbors(node, allHeights);
        neighbors.forEach(n => {
            if (!n.visited && n.val != 9) {
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

console.log(basins.sort((a, b) => b.length - a.length).slice(0, 3).map(x => x.length).reduce((a, b) => a * b));