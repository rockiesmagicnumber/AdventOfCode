fs = require('fs');
fs.readFile("input.txt", "utf8", (err, inputData) => {
    if (!!err) {
        console.error(err);
    }

    var codes = [];
    codes["A"] = "Rock";
    codes["B"] = "Paper";
    codes["C"] = "Scissors";
    codes["X"] = "Loss";
    codes["Y"] = "Tie";
    codes["Z"] = "Win";

    var getRound = (input) => {
        var rps = input.split(' ');
        var round = {};
        round.opponent = rps[0];
        round.result = rps[1];
        round = getRoundRecommendation(round);
        round = getRoundScore(round);
        return round;
    };

    var getRoundRecommendation = (round) => {
        if (codes[round.result] === "Tie") {
            round.recommended = codes[round.opponent];
        } else if (codes[round.result] === "Loss") {
            if (codes[round.opponent] === "Rock") {
                round.recommended = "Scissors";
            } else if (codes[round.opponent] === "Paper") {
                round.recommended = "Rock";
            } else {
                round.recommended = "Paper";
            }
        } else {
            if (codes[round.opponent] === "Rock") {
                round.recommended = "Paper";
            } else if (codes[round.opponent] === "Paper") {
                round.recommended = "Scissors";
            } else {
                round.recommended = "Rock";
            }
        }

        return round;
    }

    var getRoundScore = (round) => {
        if (round.recommended === "Rock") {
            round.score = 1;
        } else if (round.recommended === "Paper") {
            round.score = 2;
        } else {
            round.score = 3;
        }

        switch (round.result) {
            case "X":
                round.score += 0;
                break;
            case "Y":
                round.score += 3;
                break;
            case "Z":
                round.score += 6;
                break
            default:
                break;
        }

        return round;
    }

    var data = inputData.split('\n').map(x => getRound(x));
    var totalScore = data.map(x => x.score).reduce((p, c) => p + c);
    console.log(data);
    console.log(totalScore);
});