fs = require('fs');
fs.readFile("input.txt", "utf8", (err, inputData) => {
    if (!!err) {
        console.error(err);
    }

    let data = inputData;
    console.log(data);

    for (let i = 14; i < data.length; i++) {
        let bloc = data.slice(i - 14, i);
        let blocDistinct = Array.from(new Set(bloc));
        console.log(blocDistinct);
        if (bloc.length === blocDistinct.length) {
            console.log("Set found after character number " + i, bloc);
            break;
        }
    }
});