fs = require('fs');
fs.readFile("input.txt", "utf8", (err, inputData) => {
    if (!!err) {
        console.error(err);
    }

    const totalDiskSize = 70000000;
    const requiredFreeSpace = 30000000;
    let data = inputData.split('\n');
    let path = [];
    let dirStruct = [];
    let dirAggregates = [];
    let handleCommand = (command) => {
        //console.log(path.join("/"), command);
        if (command[1] === "cd") {
            let whichDir = command[2];
            if (whichDir === "..") {
                path.splice(-1, 1);
            } else if (whichDir === "/") {
                path = [""];
            } else {
                path.push(whichDir);
            }
        }
        // we don't care about any other commands
    };

    let handleDirectory = (command) => {
        let dirEntry = { dir: path.join("/"), child: `${command[1]}` };
        //console.log(path.join("/"), command);
        dirStruct.push(dirEntry);
    };

    let handleFile = (command) => {
        let fileEntry = { dir: path.join("/"), child: `${command[1]}`, fileSize: Number.parseFloat(command[0]) };
        //console.log(fileEntry.fileSize, isNaN(fileEntry.fileSize));
        dirStruct.push(fileEntry);
    };

    let getDirectoryAggregate = (directory) => {
        let allFiles = dirStruct.filter(x => x.dir.startsWith(directory) && !!x.fileSize);
        let sumChildren = allFiles.map(x => x.fileSize).reduce((a, b) => a + b, 0);
        return { directory, sumChildren };
    };

    for (let i = 0; i < data.length; i++) {
        let cmdArr = data[i].split(" ");

        if (cmdArr[0] === "$") {
            handleCommand(cmdArr);
        } else if (cmdArr[0] === "dir") {
            handleDirectory(cmdArr);
        } else if (!isNaN(cmdArr[0])) {
            handleFile(cmdArr);
        }
    }

    // this just makes it look a little more readable
    dirStruct = dirStruct.map(x => {
        if (x.dir === '') {
            x.dir = "/";
        }
        return x;
    });

    let distinctDirectories = Array.from(new Set(dirStruct.map(x => x.dir)));

    for (let d = 0; d < distinctDirectories.length; d++) {
        dirAggregates.push(getDirectoryAggregate(distinctDirectories[d]));
    }

    let smallDirs = dirAggregates.filter(x => x.sumChildren <= 100000);
    //let totalSize = smallDirs.map(x => x.sumChildren).reduce((a, b) => a + b, 0);

    let maxDirSize = dirAggregates.map(x => x.sumChildren).reduce((a, b) => a > b ? a : b, 0);
    let unusedSpace = totalDiskSize - maxDirSize;

    let deleteCandidates = dirAggregates.filter(x => x.sumChildren + unusedSpace > requiredFreeSpace);
    let smallestCandidate = deleteCandidates.sort((a, b) => a.sumChildren - b.sumChildren).slice(0, 1);
    console.log(smallestCandidate);
});