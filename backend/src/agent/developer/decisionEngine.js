// ==========================================
// Anna OS Decision Engine v0.1.9
// ==========================================
//
// Назначение:
// Анализирует Patch Proposal и принимает решение:
// - AUTO_APPROVE  -> безопасное изменение
// - WAIT_APPROVAL -> требуется подтверждение владельца
//
// Контроль остаётся у Evgeny
// ==========================================


function decidePatch(proposal = {}) {


    console.log("================================");
    console.log("⚖️ ANNA DECISION ENGINE");
    console.log("================================");


    const risk =
        proposal.risk || "unknown";


    const confidence =
        proposal.confidence || 0;



    const decision = {


        id:
            proposal.id ||
            "unknown",


        time:
            new Date()
            .toISOString(),


        patch:
            proposal,


        risk,


        confidence,


        decision:
            "WAIT_APPROVAL",


        reason:
            ""

    };



    // ======================================
    // SAFE DECISION RULES
    // ======================================


    if (

        risk === "low" &&

        confidence >= 0.8

    ) {


        decision.decision =
            "AUTO_APPROVE";


        decision.reason =
            "Low risk and high confidence";


    }


    else if (

        risk === "medium" &&

        confidence >= 0.9

    ) {


        decision.decision =
            "WAIT_APPROVAL";


        decision.reason =
            "Medium risk requires owner review";


    }


    else {


        decision.decision =
            "WAIT_APPROVAL";


        decision.reason =
            "Risk level requires approval";


    }



    console.log(
        "Decision:",
        decision.decision
    );


    return decision;

}



module.exports = {

    decidePatch

};