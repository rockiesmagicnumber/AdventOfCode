const startingFish = require('./AdventDay6.data.min.js');

const days = 256;

let startingFishArray = [...startingFish];

let fishDayArray = new Array(9);

for (let fishDay = 0; fishDay < fishDayArray.length; fishDay++) {
    fishDayArray[fishDay] = startingFishArray.filter(x => x === fishDay).length;
}

for (let day = 0; day < days; day++) {
    let spawningFish = fishDayArray.shift();
    fishDayArray[6] += spawningFish;
    fishDayArray[8] = spawningFish;
}

const countTheFish = (fish1, fish2) => fish1 + fish2;

console.log(fishDayArray.reduce(countTheFish));