const data = require('./AdventDay8.data.min.js');
const signals = data.signals;
const digitCombos = data.digitCombos;

let processData = (inputSignals) => {
    let processedData = [];
    for (let signal of inputSignals) {
        let processedSignal = processSignal(signal);
        processedData.push(processedSignal);
    }
    return processedData;
}

let processSignal = signal => {
    let inputs = signal.input.trim().split(' '),
        outputs = signal.output.trim().split(' ');
    for (let cmd of inputs) {
        if (!signal.inputTranslated) {
            signal.inputTranslated = [];
        }
        signal.inputTranslated.push(getNumberByLength(cmd));
    }
    for (let out of outputs) {
        if (!signal.outputTranslated) {
            signal.outputTranslated = [];
        }
        signal.outputTranslated.push(getNumberByLength(out));
    }
    return signal;
}

let getNumberByLength = cmd => {
    var cmdLength = cmd.length;
    if (isRepeatedLengthCombo(cmd)) {
        return -1;
    }
    for (let c = 0; c < digitCombos.length; c++) {
        if (getComboLength(digitCombos[c]) === cmdLength) {
            return c;
        }
    }
}

let isRepeatedLengthCombo = input => {
    return nonUniqueComboLengths.includes(input.length);
}

let getComboLength = combo => {
    return combo.filter(x => x === 1).length;
}

let getComboFromInput = input => {
    let alpha = 'abcdefg';
    let combo = [];
    for (let letter = 0; letter < alpha.length; letter++) {
        if (input.includes(alpha[letter])) {
            combo[letter] = 1;
        } else {
            combo[letter] = 0;
        }
    }
    return combo;
}

let getInputFromCombo = combo => {
    const alpha = "abcdefg";
    let input = "";
    for (let c = 0; c < combo.length; c++) {
        if (combo[c] === 1) {
            input += alpha[c];
        }
    }
    return input;
}

let getRepeatedComboLengths = () => {
    let lengths = [];
    let ret = [];
    for (let d of digitCombos) {
        let dLen = getComboLength(d);
        if (!lengths.includes(dLen)) {
            lengths.push(dLen);
        } else if (!ret.includes(dLen)) {
            ret.push(dLen);
        }
    }
    return ret;
}

let run = inputSignals => {
    let pData = processData(inputSignals);
    let uniqueCount = 0;
    let uniques = [];
    for (let p of pData) {
        let unique = p.outputTranslated.filter(x => x > -1).length;
        uniqueCount += unique;
        p.outputUniqueCount = unique;
        //console.log(p);
        for (let pp = 0; pp < p.outputTranslated.length; pp++) {
            if (!uniques.includes(p.outputTranslated[pp])) {
                uniques.push(p.outputTranslated[pp]);
            }
        }
    }
    console.log(uniques);
    return uniqueCount;
}

const nonUniqueComboLengths = getRepeatedComboLengths();

console.log(run(signals));

//console.log(run(data.testSignals));