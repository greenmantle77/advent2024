import { readFileToArray } from "./utils/read-file-to-array.js";

function parseRow(row, theExpression){
    const matches = [...row.matchAll(theExpression)];
    const digitsExpression = /\d+,\d+/g;
    return matches.map((currMatch) => {
        const currStr = currMatch[0];
        const numberStrPair = currStr.match(digitsExpression)[0].split(",");
        const numbPair = [parseInt(numberStrPair[0]), parseInt(numberStrPair[1])];
        return numbPair;
    });
}

export function three(){
    const fileArray = readFileToArray("./data/03.txt");

    const myExpression = /mul\(\d+,\d+\)/g;
    const pairMatrix = fileArray.map((row) => {
        return parseRow(row, myExpression);
    });

    const answerOne = pairMatrix.reduce((tot, currRow) => {
        const rowValue = currRow.reduce((rowTot, currPair) => {
            return rowTot + currPair[0] * currPair[1];
        }, 0);
        return tot + rowValue;
    }, 0);

    console.log("answerOne", answerOne);
}