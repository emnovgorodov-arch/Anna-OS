// ==========================================
// Anna OS Self Developer Controller v0.1.6
// ==========================================


const { selfDeveloper } = require("./selfDeveloper");
const { remember } = require("../../memory/memory");


// ==========================================
// RUN DEVELOPMENT CYCLE
// ==========================================

async function runDeveloperCycle(trigger = "manual") {


    console.log("================================");
    console.log("🛠 ANNA DEVELOPER CONTROLLER");
    console.log("TRIGGER:", trigger);
    console.log("================================");


    const result = await selfDeveloper();



    remember({

        type: "developer_cycle",

        trigger,

        status:
            result.analysis.status,

        fixes:
            result.fixes.length

    });



    return {


        controller:

            "Anna OS Developer Controller",


        trigger,


        result


    };


}



module.exports = {

    runDeveloperCycle

};