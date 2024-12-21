import { readFileToArray } from "./utils/read-file-to-array.js";

function parseFileArray(fileArray){
    return fileArray.map((row) => {
        return row.split(" ").map((numnStr) => parseInt(numnStr));
    });
}

function isRowSafe(row, index){
    const { differenceArray } = row.reduce((tot, curr) => {
        if(tot.prev){
            const diff = curr - tot.prev;
            tot.differenceArray.push(diff);
            return { ...tot, prev: curr };
        }
        return { ...tot, prev: curr};
    }, {differenceArray: []});

    const { safe, rowIndex } = differenceArray.reduce((tot, curr, rowIndex) => {
        // console.log(rowIndex);
        if(!tot.safe){
            return tot;
        }

        if(!tot.direction){
            if(curr === 0){
                const totObj = {safe: false, rowIndex};
                return totObj;
            }
            tot.direction = curr;
        }

        if(tot.direction < 0 && curr >= 0 ||
            tot.direction > 0 && curr <= 0 ||
            curr < -3 || 
            curr > 3) {
                const totObj = {safe: false, rowIndex};
                return totObj;
            }
        
        return tot;
    }, {safe: true});

    // console.log(`row ${index} ${JSON.stringify(row)} - ${JSON.stringify(differenceArray)} - ${safe} - rowIndex ${rowIndex}`);
    
    return {safe, rowIndex};
}

function isRowSafeWithErrors(row, index){
    let { safe, rowIndex } = isRowSafe(row, index);

    if(safe){
        return safe;
    }

    const badElemeIndex = rowIndex + 1;

    const adjustedRow = [...row.slice(0, badElemeIndex), ... row.slice(badElemeIndex+1)];
    // console.log("adjustedRow", adjustedRow);
    ({safe} = isRowSafe(adjustedRow, index));
    return safe;
}

function bruteForceIsSafeWithErrors(row, index){
    // console.log("bruteForceIsSafeWithErrors ", JSON.stringify(row));
    let { safe } = isRowSafe(row, index);
    if(safe){
        // console.log("bruteForceIsSafeWithErrors ", safe);
        return safe;
    }

    let currIndex = 0;
    while(currIndex < row.length && !safe){
        const currRow = [...row.slice(0, currIndex), ...row.slice(currIndex+1, row.length)];
        // console.log("bruting index", currIndex, "row", JSON.stringify(row), " - currRow ", JSON.stringify(currRow));
        ({safe} = isRowSafe(currRow, index));
        currIndex += 1;
    }
    return safe;
}

export function two(){
    const fileArray = readFileToArray("./data/02.txt");
    const rowArray = parseFileArray(fileArray);
    // const statusArray = rowArray.map((row, index) => {
    //     const result =  isRowSafe(row, index);
    //     return result.safe;
    // });

    // const answerOne = statusArray.reduce((tot, curr) => {
    //     if(!curr){
    //         return tot;
    //     }
    //     return tot + 1;
    // }, 0);  
    // console.log("Day two, answer one: ", answerOne);

    const statusArrayAllowError = rowArray.map((row, index) => {
        const safe = isRowSafeWithErrors(row, index);
        const bruteSafe = bruteForceIsSafeWithErrors(row, index);
        console.log(`${index} - row ${JSON.stringify(row)} safe = ${safe} - bruteSafe = ${bruteSafe} ${safe == bruteSafe ? "EQUAL" : "UNEQUAL"}`);
        return bruteSafe;
    });

    const anwswerTwo = statusArrayAllowError.reduce((tot, curr) => {
        if(!curr){
            return tot;
        }
        return tot + 1;
    }, 0);  
    console.log("Day two, answer two: ", anwswerTwo);
}