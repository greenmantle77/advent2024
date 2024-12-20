import * as fs from "fs";

export function readFileToArray(path){
    const fileContent = fs.readFileSync(path, {encoding: "utf8"});
    const fileArray = fileContent.split("\n");
    
    return fileArray;
}
