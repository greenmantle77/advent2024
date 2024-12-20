import { readFileToArray } from "./utils/read-file-to-array.js";

function parseFileArrays(fileArray){
    return fileArray.reduce((tot, curr) => {
        if(curr.length === 0){
            return tot;
        }
        const {firstArray, secondArray} = tot;
        const tmpArray = curr.split(" ");
        const arrayLength = tmpArray.length;

        const firstNumber = parseInt(tmpArray[0]);
        firstArray.push(firstNumber);

        const secondNumber = parseInt(tmpArray[arrayLength-1]);
        secondArray.push(secondNumber);

        return { firstArray, secondArray };
    }, { firstArray: [], secondArray: [] });
}

function distance(valueOne, valueTwo){
    if(valueOne > valueTwo){
        return valueOne - valueTwo;
    }
    if(valueTwo > valueOne){
        return valueTwo - valueOne;
    }

    return 0;
}

export function one() {
    const fileArray = readFileToArray("./data/01.txt");
    const {firstArray, secondArray} = parseFileArrays(fileArray);

    const sortedFirst = [...firstArray].sort();
    const sortedSecond = [...secondArray].sort();
    const sortedPairsArray = sortedFirst.map((first, index) => {
        return [first, sortedSecond[index]];
    });
    const answerOne = sortedPairsArray.reduce((tot, curr) => {
        return tot + distance(curr[0], curr[1]);
    }, 0);

    console.log("One - answer one: ", answerOne);
    const secondArrayMap = secondArray.reduce((tot, curr) => {
        if(!tot[curr]){
            tot[curr] = 1;
            return tot;
        }
        const counter = tot[curr];
        tot[curr] = counter + 1;
        return tot;
    }, {});

    const answerTwo = firstArray.reduce((tot, curr) => {
        return tot + curr * (secondArrayMap[curr] ?? 0);
    }, 0);

    console.log("One - answer two: ", answerTwo);
}