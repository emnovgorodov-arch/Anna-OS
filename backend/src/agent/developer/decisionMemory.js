// ==========================================
// Anna OS Decision Memory Layer v0.1.13.1
// Safe JSON Reader
// ==========================================

const fs = require("fs");
const path = require("path");


const file = path.join(
    __dirname,
    "decisionHistory.json"
);



// ==========================================
// LOAD
// ==========================================

function loadDecisionHistory() {


    if (!fs.existsSync(file)) {

        return [];

    }


    try {


        const content =
            fs.readFileSync(
                file,
                "utf8"
            )
            .replace(/^\uFEFF/, "")
            .trim();



        if (!content) {

            return [];

        }



        return JSON.parse(content);



    } catch (error) {


        console.log(
            "⚠️ Decision history corrupted. Reset."
        );


        return [];

    }


}



// ==========================================
// SAVE
// ==========================================

function saveDecisionHistory(data) {


    fs.writeFileSync(
        file,
        JSON.stringify(
            data,
            null,
            4
        ),
        "utf8"
    );

}



// ==========================================
// REMEMBER
// ==========================================

function rememberDecision(decision) {


    const history =
        loadDecisionHistory();



    const record = {


        patch:
            decision.id || "unknown",


        decision:
            decision.decision || "unknown",


        confidence:
            decision.confidence ?? 0,


        risk:
            decision.risk || "unknown",


        reason:
            decision.reason || "none",


        time:
            new Date()
            .toISOString()


    };



    history.push(record);



    saveDecisionHistory(
        history
    );



    return record;

}



// ==========================================
// STATS
// ==========================================

function getDecisionStats() {


    const history =
        loadDecisionHistory();



    return {


        total:
            history.length,


        autoApprove:
            history.filter(
                x =>
                x.decision === "AUTO_APPROVE"
            ).length,


        waitApproval:
            history.filter(
                x =>
                x.decision === "WAIT_APPROVAL"
            ).length


    };

}



module.exports = {

    loadDecisionHistory,

    rememberDecision,

    getDecisionStats

};