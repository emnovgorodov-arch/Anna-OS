// ==========================================
// Anna OS Learning Report Generator v0.1.16
// ==========================================


const {
    getDecisionStats
} = require("./decisionStats");



// ==========================================
// GENERATE LEARNING REPORT
// ==========================================


function generateLearningReport() {


    const stats =
        getDecisionStats();



    const insights = [];



    if (
        stats.totalDecisions === 0
    ) {


        insights.push(
            "Недостаточно данных для анализа."
        );


    }
    else {


        if (
            stats.approvalRate >= "80%"
        ) {

            insights.push(
                "Decision Engine работает стабильно."
            );

        }


        if (
            stats.averageConfidence >= 0.8
        ) {

            insights.push(
                "Уровень уверенности решений высокий."
            );

        }


        if (
            stats.risks.low === stats.totalDecisions
        ) {

            insights.push(
                "Все решения имеют низкий уровень риска."
            );

        }


    }





    const recommendations = [

        "Продолжать накопление истории решений.",

        "Увеличивать покрытие автоматических тестов.",

        "Анализировать повторяющиеся ошибки."

    ];





    return {


        system:
            "Anna OS",



        version:
            "0.1.16",



        generated:
            new Date()
            .toISOString(),



        performance: {


            decisions:
                stats.totalDecisions,


            autoApprove:
                stats.autoApprove,


            waitApproval:
                stats.waitApproval,


            approvalRate:
                stats.approvalRate,


            confidence:
                stats.averageConfidence


        },



        risks:
            stats.risks,



        insights,



        recommendations


    };


}




module.exports = {

    generateLearningReport

};