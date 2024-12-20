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

    const { safe } = differenceArray.reduce((tot, curr) => {
        if(!tot.safe){
            return tot;
        }

        if(!tot.direction){
            if(curr === 0){
                return {safe: false};
            }
            tot.direction = curr;
        }

        if(tot.direction < 0 && curr >= 0 ||
            tot.direction > 0 && curr <= 0 ||
            curr < -3 || 
            curr > 3) {
                return {safe: false};
            }
        
        return tot;
    }, {safe: true});

    // console.log(`row ${index} ${JSON.stringify(row)} - ${JSON.stringify(differenceArray)} - ${safe}`);
    
    return safe;
}

export function two(){
    const fileArray = readFileToArray("./data/02.txt");
    const rowArray = parseFileArray(fileArray);
    const statusArray = rowArray.map((row, index) => {
        return isRowSafe(row, index);
    });

    const answerOne = statusArray.reduce((tot, curr) => {
        if(!curr){
            return tot;
        }
        return tot + 1;
    }, 0);  

    console.log("Day two, answer one: ", answerOne);
}