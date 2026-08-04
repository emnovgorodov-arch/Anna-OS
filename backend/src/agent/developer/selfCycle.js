// ==========================================
// Anna OS Self Cycle v0.1.6.1
// Error Analyzer Integration
// ==========================================


const { checkProject } = require("./checkProject");
const { autoRepair } = require("./autoRepair");
const { saveMemory } = require("../../memory/memory");
const { generateReport } = require("./report");
const { analyzeError } = require("./errorAnalyzer");


const MAX_ATTEMPTS = 5;



async function selfCycle() {


    console.log("================================");
    console.log("🧠 SELF CYCLE START");
    console.log("================================");


    let problems = [];

    let fixes = [];

    let errorAnalysis = [];



    for (
        let i = 1;
        i <= MAX_ATTEMPTS;
        i++
    ) {


        console.log(
            `🔍 Проверка №${i}`
        );


        problems =
            await checkProject();



        // ==============================
        // ERROR ANALYSIS
        // ==============================


        if (
            problems.length > 0
        ) {


            errorAnalysis =
                problems.map(
                    error =>
                        analyzeError(error)
                );


            console.log(
                "🧠 ERROR ANALYSIS:"
            );


            console.log(
                JSON.stringify(
                    errorAnalysis,
                    null,
                    2
                )
            );


        }



        if (
            problems.length === 0
        ) {


            console.log(
                "✅ Ошибок нет"
            );


            break;

        }



        console.log(
            `⚠ Найдено ${problems.length} ошибок`
        );



        const repaired =
            await autoRepair(
                problems
            );


        fixes.push(
            ...repaired
        );


    }



    console.log(
        "📄 Формирую отчёт..."
    );



    const report =
        generateReport({

            analysis: {

                status:
                    problems.length === 0
                    ? "ok"
                    : "warning",


                message:
                    problems.length === 0

                    ?

                    "Проект успешно проверен."

                    :

                    `Осталось ошибок: ${problems.length}`

            },


            fixes

        });



    // ==============================
    // MEMORY SAVE
    // ==============================


    saveMemory({

        event: {

            type:
                "self_developer_cycle",


            status:
                report.analysis.status,


            fixes:
                fixes.length,


            errors:
                errorAnalysis.length

        },


        time:
            new Date()
            .toISOString()

    });



    return {

        analysis:
            report.analysis,


        fixes,


        errorAnalysis,


        report

    };


}



module.exports = {

    selfCycle

};