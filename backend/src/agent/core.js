const { askAI } = require("./ai");

// Подключаем Self Developer напрямую
const { selfDeveloper } = require("./developer/selfDeveloper");

async function runAnna(task) {

    console.log("================================");
    console.log("ORIGINAL:", task);
    console.log("TYPE:", typeof task);

    const text = String(task)
        .toLowerCase()
        .trim();

    console.log("NORMALIZED:", text);
    console.log("================================");

    // =====================================
    // SELF DEVELOPER
    // =====================================

    if (
        text.includes("проверь себя") ||
        text.includes("диагностируй") ||
        text.includes("исправь ошибки") ||
        text.includes("самодиагностика") ||
        text.includes("selfcheck")
    ) {

        console.log("🧠 SELF DEVELOPER");

        const result = await selfDeveloper();

        return {
            status: "developer",
            answer:
`🧠 Самодиагностика завершена

Статус: ${result.analysis.status}

${result.analysis.message}

Исправлено файлов: ${result.fixes.length}
`,
            report: result
        };

    }

    // =====================================
    // OLLAMA
    // =====================================

    console.log("➡ OLLAMA");

    const answer = await askAI(task);

    return {
        status: "completed",
        answer
    };

}

module.exports = {
    runAnna
};