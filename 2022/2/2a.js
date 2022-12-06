fs = require('fs');
fs.readFile("input.txt", "utf8", (err, inputData) => {
    if (!!err) {
        console.error(err);
    }

    var codes = [];
    codes["A"] = "Rock";
    codes["B"] = "Paper";
    codes["C"] = "Scissors";
    codes["X"] = "Rock";
    codes["Y"] = "Paper";
    codes["Z"] = "Scissors";

    var getRound = (input) => {
        var rps = input.split(' ');
        var round = {};
        round.opponent = rps[0];
        round.recommended = rps[1];
        round = getRoundResult(round);
        round = getRoundScore(round);
        return round;
    };

    var getRoundResult = (round) => {
        if (codes[round.opponent] === codes[round.recommended]) {
            round.result = "Tie";
        } else if ((round.opponent === "A" && round.recommended === "Z") || (round.opponent === "B" && round.recommended === "X") || (round.opponent === "C" && round.recommended === "Y")) {
            round.result = "Loss"
        } else {
            round.result = "Win"
        }

        return round;
    }

    var getRoundScore = (round) => {
        if (round.result === "Win") {
            round.score = 6;
        } else if (round.result === "Tie") {
            round.score = 3;
        } else {
            round.score = 0;
        }

        switch (round.recommended) {
            case "X":
                round.score += 1;
                break;
            case "Y":
                round.score += 2;
                break;
            case "Z":
                round.score += 3;
                break
            default:
                break;
        }

        return round;
    }

    var data = inputData.split('\n').map(x => getRound(x));
    var totalScore = data.map(x => x.score).reduce((p, c) => p + c);
    console.log(totalScore);
});