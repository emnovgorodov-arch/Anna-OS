// ==========================================
// Anna OS Core v0.1.2
// ==========================================

const { askAI } = require("./ai");
const { runBrain } = require("./brain/brain");
const { selfDeveloper } = require("./developer/selfDeveloper");


async function runAnna(task) {

    console.log("================================");
    console.log("🧠 ANNA CORE");
    console.log("TASK:", task);
    console.log("TYPE:", typeof task);
    console.log("================================");


    const text = String(task)
        .toLowerCase()
        .trim();



    // =====================================
    // SELF DEVELOPER
    // =====================================

    if (
        text.includes("проверь себя") ||
        text.includes("диагностируй") ||
        text.includes("самодиагностика") ||
        text.includes("selfcheck")
    ) {

        console.log("🛠 SELF DEVELOPER MODE");


        const result = await selfDeveloper();


        return {

            status: "developer",

            answer:
`
🧠 Самодиагностика Anna OS завершена

Статус:
${result.analysis.status}

${result.analysis.message}

Исправлено:
${result.fixes.length} файлов
`,

            report: result

        };

    }



    // =====================================
    // BRAIN BLOCK
    // =====================================


    console.log("🧠 BRAIN START");


    const brainResult = await runBrain(task);



    console.log("🧠 BRAIN RESULT:");
    console.log(brainResult);



    // =====================================
    // OLLAMA
    // =====================================


    console.log("🤖 AI GENERATION");


    const answer = await askAI(
        brainResult.prompt
    );



    return {

        status: "completed",

        answer,

        brain: brainResult

    };

}



module.exports = {

    runAnna

};