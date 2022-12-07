fs = require("fs");
fs.readFile("input.txt", "utf8", (err, inputData) => {
    if (!!err) {
        console.error(err);
    }

    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let totalScore = 0;

    inputData.split("\n").forEach(row => {
        let midpoint = row.length / 2;
        let str1 = row.substring(0, midpoint);
        let str2 = row.substring(midpoint);
        console.log(str1, str2);
        let common = "";

        for (var i = 0; i < str1.length; i++) {
            if (str2.indexOf(str1[i]) > -1) {
                common = str1[i];
                break;
            }
        }

        let score = alphabet.indexOf(common) + 1;
        console.log(common, score);
        totalScore += score;
    });

    console.log(totalScore);
});