const { checkProject } = require("./checkProject");
const { autoRepair } = require("./autoRepair");
const { saveMemory } = require("../memory");
const { generateReport } = require("./report");

const MAX_ATTEMPTS = 5;

async function selfCycle() {

    console.log("================================");
    console.log("🧠 SELF CYCLE START");
    console.log("================================");

    let problems = [];
    let fixes = [];

    for (let i = 1; i <= MAX_ATTEMPTS; i++) {

        console.log(`🔍 Проверка №${i}`);

        problems = await checkProject();

        if (problems.length === 0) {

            console.log("✅ Ошибок нет");

            break;

        }

        console.log(`⚠ Найдено ${problems.length} ошибок`);

        const repaired = await autoRepair(problems);

        fixes.push(...repaired);

    }

    const report = generateReport({
        analysis: {
            status: problems.length === 0 ? "ok" : "warning",
            message:
                problems.length === 0
                    ? "Проект успешно проверен."
                    : `Осталось ошибок: ${problems.length}`
        },
        fixes
    });

    saveMemory({
        date: new Date().toISOString(),
        status: report.analysis.status,
        fixes: fixes.length,
        summary: report.analysis.message
    });

    return {
        analysis: report.analysis,
        fixes,
        report
    };

}

module.exports = {
    selfCycle
};