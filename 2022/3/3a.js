fs = require('fs');
fs.readFile("input.txt", "utf8", (err, inputData) => {
    if (!!err) {
        console.error(err);
    }
});