// ==========================================
// Anna OS Decision Statistics Layer v0.1.14
// ==========================================

const {
    loadDecisionHistory
} = require("./decisionMemory");


// ==========================================
// ANALYZE DECISIONS
// ==========================================

function getDecisionStats() {

    const history =
        loadDecisionHistory();



    const total =
        history.length;



    const autoApprove =
        history.filter(
            item =>
                item.decision === "AUTO_APPROVE"
        ).length;



    const waitApproval =
        history.filter(
            item =>
                item.decision === "WAIT_APPROVAL"
        ).length;



    const averageConfidence =
        total === 0
            ? 0
            :
            (
                history.reduce(
                    (sum, item) =>
                        sum + (item.confidence || 0),
                    0
                )
                /
                total
            ).toFixed(2);



    const risks = {

        low:
            history.filter(
                x => x.risk === "low"
            ).length,


        medium:
            history.filter(
                x => x.risk === "medium"
            ).length,


        high:
            history.filter(
                x => x.risk === "high"
            ).length

    };



    return {

        totalDecisions:
            total,


        autoApprove,


        waitApproval,


        approvalRate:
            total === 0
                ? "0%"
                :
                (
                    autoApprove / total * 100
                ).toFixed(0) + "%",


        averageConfidence,


        risks

    };

}



module.exports = {

    getDecisionStats

};