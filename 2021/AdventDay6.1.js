const startingFish = require('./AdventDay6.data.min.js');

const days = 80;

let fish = [...startingFish];

for (let day = 0; day < days; day++) {
    fish = fish.map(x => x - 1);
    let newFish = [];
    for (let f = 0; f < fish.length; f++) {
        if (fish[f] < 0) {
            fish[f] = 6;
            newFish.push(8);
        }
    }
    fish.push(...newFish);
}

console.log(fish.length);