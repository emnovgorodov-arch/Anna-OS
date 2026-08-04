// ==========================================
// Anna OS Developer Diagnostics v0.1.5
// ==========================================


const fs = require("fs");
const path = require("path");


function exists(file) {

    return fs.existsSync(file);

}



async function runDiagnostics() {


    const backend =
        path.join(__dirname, "../../..");


    const report = {


        system: "Anna OS",


        version: "0.1.5",


        checks: {


            core:
                exists(
                    path.join(
                        backend,
                        "src/agent/core.js"
                    )
                ),


            ai:
                exists(
                    path.join(
                        backend,
                        "src/agent/ai.js"
                    )
                ),


            brain:
                exists(
                    path.join(
                        backend,
                        "src/agent/brain"
                    )
                ),


            memory:
                exists(
                    path.join(
                        backend,
                        "src/memory/memory.json"
                    )
                )


        },


        status: "completed"


    };


    return report;


}



module.exports = {

    runDiagnostics

};