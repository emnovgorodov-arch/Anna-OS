// ==========================================
// Anna OS Patch Proposal Engine v0.1.12
// Confidence Layer
// ==========================================

const fs = require("fs");
const path = require("path");


const historyFile = path.join(
    __dirname,
    "patchHistory.json"
);



// ==========================================
// LOAD HISTORY
// ==========================================

function loadPatchHistory() {


    if (!fs.existsSync(historyFile)) {

        return [];

    }


    return JSON.parse(
        fs.readFileSync(
            historyFile,
            "utf8"
        )
    );

}



// ==========================================
// SAVE HISTORY
// ==========================================

function savePatchHistory(data) {


    fs.writeFileSync(
        historyFile,
        JSON.stringify(
            data,
            null,
            4
        )
    );

}



// ==========================================
// CREATE PATCH PROPOSAL
// ==========================================

function createPatchProposal(errorAnalysis) {


    const proposal = {


        id:
            "patch-" + Date.now(),



        created:
            new Date()
            .toISOString(),



        status:
            "proposal",



        error:
            errorAnalysis.error || "unknown",



        component:
            errorAnalysis.component || "unknown",



        reason:
            errorAnalysis.reason || "unknown",



        recommendation:
            errorAnalysis.recommendation || "none",



        // новое поле
        confidence:
            errorAnalysis.confidence ?? 0,



        risk:
            errorAnalysis.risk || "low",



        approved:
            false


    };



    const history =
        loadPatchHistory();



    history.push(
        proposal
    );



    savePatchHistory(
        history
    );



    return proposal;

}



module.exports = {


    createPatchProposal,

    loadPatchHistory

};