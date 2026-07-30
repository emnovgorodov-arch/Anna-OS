const fs = require("fs");
const path = require("path");


const file = path.join(
    __dirname,
    "memory.json"
);


function loadMemory(){

    return JSON.parse(
        fs.readFileSync(
            file,
            "utf8"
        )
    );

}



function saveMemory(data){

    fs.writeFileSync(
        file,
        JSON.stringify(
            data,
            null,
            4
        )
    );

}



function remember(event){

    const memory = loadMemory();


    memory.history.push({

        event,

        time:
        new Date()
        .toISOString()

    });


    saveMemory(memory);


    return memory;

}



module.exports = {

    loadMemory,

    saveMemory,

    remember

};