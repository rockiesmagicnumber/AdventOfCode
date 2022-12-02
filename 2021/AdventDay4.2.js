const data = require('./AdventDay4.data.min.js');
const inputCalls = data.calls;
const inputBoards = data.boards;

function playBingo(calls, boards) {

    for (let c = 0; c < calls.length; c++) {

        let call = calls[c];

        for (let b of boards) {

            // if this board already has bingo, it doesn't need to be marked or checked anymore
            if (b.bingo)
                continue;

            let board = b.board;

            // mark the square if the number was called
            markSquare(board, call);

            // if we're on draw 4 or earlier, skip the bingo check because nobody can HAVE bingo
            if (c < board.length - 2)
                continue;

            // check for bingo and mark bingo:true accordingly
            if (hasBingo(board)) {
                b.bingo = true;
            }

            // if the board that was just marked bingo: true was the last board,
            //  calculate final score
            if (!boards.some(x => !x.bingo)) {
                let winningCall = calls[c];
                let unmarkedTotal = getUnmarkedTotal(board);
                let finalScore = unmarkedTotal * winningCall;
                console.log(finalScore);
                return;
            }
        }
    }
}

function markSquare(board, call) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === call) {
                // "mark" a square by setting its value = -1
                board[i][j] = -1;
                return;
            }
        }
    }
}

function hasBingo(board) {
    for (let i = 0; i < board.length; i++) {

        // check current row for bingo (if all values are -1)
        if ((board[i]).reduce((a, b) => a + b) === -1 * board.length) {
            return true;
        }
    }

    // check columns for bingo (if all values are -1)
    for (let col = 0; col < board[0].length; col++) {
        for (let row = 0; row < board.length; row++) {
            if (board[row][col] > -1) {
                break;
            }

            // if we're at the last row and we haven't broken yet (ie, all previous values in this column === -1)
            //  well then we must have bingo
            if (row == board.length - 1) {
                return true;
            }
        }
    }

    // this board does NOT have bingo. Yet.
    return false;
}

function getUnmarkedTotal(board) {
    let totalUnmarked = 0;
    for (let row of board) {
        for (let col of row) {
            if (col > -1) {
                totalUnmarked += col;
            }
        }
    }
    return totalUnmarked;
}

// playyyyyyyy Bingo!
playBingo(inputCalls, inputBoards);