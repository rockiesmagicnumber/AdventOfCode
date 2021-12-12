const crabs = require("./AdventDay7.data.min.js");

function getMinCrabMovement(vCrabs) {
    let crabMovement = [];

    // iterate over starting positions
    let minCrab = Math.min(...vCrabs);
    let maxCrab = Math.max(...vCrabs);
    for (let i = minCrab; i <= maxCrab; i++) {
        let totalMove = 0;
        // check each crab location for movement
        for (let c = 0; c < vCrabs.length; c++) {
            let crab = vCrabs[c];
            totalMove += getCrabFuelExpenditure(crab, i);
        }
        // log movement per position
        crabMovement.push({ x: i, move: totalMove });
    }

    const minMove = crabMovement.reduce((prev, curr) => {
        return (prev.move > curr.move) ? curr : prev
    });
    return minMove.move;
}

function getCrabFuelExpenditure(crab, dest) {
    let fuel = 0,
        counter = 1;
    for (let i = Math.min(crab, dest); i < Math.max(crab, dest); i++) {
        fuel += counter;
        counter++;
    }
    return fuel;
}

console.log("actualCrabs", getMinCrabMovement(crabs));

console.log("testCrabs", getMinCrabMovement([16, 1, 2, 0, 4, 2, 7, 1, 2, 14]));