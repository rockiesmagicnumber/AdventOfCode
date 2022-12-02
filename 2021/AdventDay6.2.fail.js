const startingFish = require('./AdventDay6.data.min.js');

const days = 256;

const maxSchoolSize = 40000;

let fish = performStudy();
let totalFishCount = 0;
for (let school of fish) {
    totalFishCount += school.length;
}
console.log(totalFishCount);

function performStudy() {
    let fish = [];

    let startingFishArray = [...startingFish];

    // create initial school
    fish.push(startingFishArray);

    // start the study
    for (let day = 0; day < days; day++) {
        let startDate = new Date();
        // prepare the new fish array
        let newFish = [];
        // iterate through each school
        for (let s = 0; s < fish.length; s++) {
            let school = fish[s];
            // age the fish by a day
            for (let i = 0; i < school.length; i++) {
                school[i] = school[i] - 1;
            }
            // check the post-aging status of each fish
            for (let f = 0; f < school.length; f++) {
                // if the fish has reached maturation
                if (school[f] < 0) {
                    // reset fish age
                    school[f] = 6;
                    // pump a new fish into the new fish array
                    newFish.push(8);
                }
            }
        }
        // add new fish to the school array
        addNewFish(fish, newFish);
        let endDate = new Date();
        console.log("Day " + day + " concluded;", "Total Fishies: " + fish.flat().length + ";",
            newFish.length + " fishies added;", fish.length + " total schools;",
            //"StartDate: " + startDate.toISOString(), "EndDate: " + endDate.toISOString(),
            "Elapsed: " + (endDate.getTime() - startDate.getTime()) + "ms");
    }

    return fish;
}

function addNewFish(fish, newFish) {
    // target the last array
    let currentSchool = fish[fish.length - 1];
    // if we can add all of the new fish to the array without going over the max school size
    if (currentSchool.length + newFish.length < maxSchoolSize) {
        // add them all
        currentSchool.push(...newFish);
    } else {
        // find how much room left in this school
        let schoolRoom = maxSchoolSize - currentSchool.length
        // add each fish up to the max
        for (let n = 0; n < schoolRoom; n++) {
            currentSchool.push(newFish[n]);
        }

        while (schoolRoom + maxSchoolSize < newFish.length) {
            // prep the new school
            let batchNewSchool = [];

            // grab the next [maxSchoolSize] new fishies and add them to their own school
            for (let n = schoolRoom; n < schoolRoom + maxSchoolSize; n++) {
                batchNewSchool.push(newFish[n]);
            }

            // add the new school to the bigger cloud of fish
            fish.push(batchNewSchool);

            // increment the schoolRoom
            schoolRoom += maxSchoolSize;
        }

        // prep the new school
        let newSchool = [];
        // add the REST of the fish to the new school
        for (let n = schoolRoom; n < newFish.length; n++) {
            newSchool.push(newFish[n]);
        }
        // add the new school to the bigger cloud of fish
        fish.push(newSchool);
    }
}