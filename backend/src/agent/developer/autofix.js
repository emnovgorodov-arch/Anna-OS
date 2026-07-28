// ==========================================
// Anna OS AutoFix v0.1
// Самостоятельное исправление проекта
// ==========================================

const { askAI } = require("../ai");
const { replaceInFile } = require("./fixer");
const { analyzeProject } = require("./analyzer");

async function autoFix(filePath, originalCode, errorText) {

    console.log("================================");
    console.log("🤖 AutoFix запущен");
    console.log("================================");

    const prompt = `
Ты — разработчик Anna OS.

Исправь код.

Ошибка:

${errorText}

Код:

${originalCode}

Верни только полностью исправленный код.
Без пояснений.
`;

    const fixedCode = await askAI(prompt);

    const saveResult = await replaceInFile(
        filePath,
        originalCode,
        fixedCode
    );

    if (!saveResult.success) {

        return {
            success: false,
            message: saveResult.message
        };

    }

    console.log("✅ Код обновлён");

    const test = await analyzeProject();

    return {

        success: test.status === "ok",

        test

    };

}

module.exports = {
    autoFix
};