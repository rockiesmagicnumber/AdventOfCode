fs = require('fs');
fs.readFile("test-input.txt", "utf8", (err, inputData) => {
    if (!!err) {
        console.error(err);
    }

    let data = inputData.split("\n");

    let isVisible = (x, y) => {
        if (i === 0 || i === data.length - 1 || j === 0 || j === data[i].length - 1) {
            return true;
        } else {
            // this is the height of this current tree
            let h = data[i][j];

            let nVis = true,
                sVis = true,
                wVis = true,
                eVis = true,
                anyVis => (!!nVis || !!sVis || !!eVis || !!wVis);

            // now we get to look in the 4 cardinals to see if there's a taller tree between this tree and the edge
            for (let n = i; n > -1; n--) {
                if (data[n][j] > h) {

                }
            }
        }
    };

    let visibleTrees = [];
    // i is row, j is column
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            console.log(i, j, data[i][j]);
            // this grabs all of the border trees
            if (isVisible(i, j)) {
                visibleTrees.push({ i: i, j: j, h: data[i][j] });
            }
        }
    }
});