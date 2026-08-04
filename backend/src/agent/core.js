// ==========================================
// Anna OS Core v0.1.4
// Core + Brain + Memory Integration
// ==========================================


const { askAI } = require("./ai");
const { runBrain } = require("./brain/brain");
const { selfDeveloper } = require("./developer/selfDeveloper");

const { remember } = require("../memory/memory");



// ==========================================
// RUN ANNA
// ==========================================


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
    // SELF DEVELOPER MODE
    // =====================================


    if (

        text.includes("selfcheck") ||
        text.includes("проверь себя") ||
        text.includes("диагностируй") ||
        text.includes("самодиагностика")

    ) {


        console.log("🛠 SELF DEVELOPER MODE");


        const result = await selfDeveloper();



        remember({

            task,

            mode: "self_developer",

            result: result.analysis.status

        });



        return {


            status: "developer",


            answer:
`
🧠 Самодиагностика Anna OS завершена

Статус:
${result.analysis.status}

${result.analysis.message}

Исправлено файлов:
${result.fixes.length}
`,


            report: result

        };

    }




    // =====================================
    // BRAIN BLOCK
    // =====================================


    console.log("🧠 BRAIN START");


    const brainResult = await runBrain({

        task

    });



    console.log("🧠 BRAIN RESULT");




    // =====================================
    // AI GENERATION
    // =====================================


    console.log("🤖 AI GENERATION");


    const answer = await askAI(

        brainResult.prompt

    );




    // =====================================
    // MEMORY WRITE
    // =====================================


    remember({

        task,

        answer,

        mode:
        brainResult.route.mode

    });



    console.log("💾 MEMORY SAVED");





    // =====================================
    // RESULT
    // =====================================


    return {


        status: "completed",


        answer,


        brain: brainResult


    };

}




module.exports = {


    runAnna


};