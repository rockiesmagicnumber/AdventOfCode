fs = require("fs");
fs.readFile("input.txt", "utf8", (err, inputData) => {
    if (!!err) {
        console.error(err);
    }

    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let totalScore = 0;

    var data = inputData.split("\n");
    for (let d = 0; d < data.length; d += 3) {
        let elf1 = data[d];
        let elf2 = data[d + 1];
        let elf3 = data[d + 2];
        let common = "";

        for (var i = 0; i < elf1.length; i++) {
            if (elf2.indexOf(elf1[i]) > -1 && elf3.indexOf(elf1[i]) > -1) {
                common = elf1[i];
                break;
            }
        }

        let score = alphabet.indexOf(common) + 1;
        totalScore += score;
    };

    console.log(totalScore);
});