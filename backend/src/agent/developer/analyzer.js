// ==========================================
// Anna OS Developer Analyzer v0.2
// Анализатор проекта
// ==========================================

const { execute } = require("../executor");
const config = require("./config");

async function analyzeProject() {

    console.log("================================");
    console.log("🔍 Анализ проекта...");
    console.log("================================");

    // Проверяем Frontend
    const frontend = await execute("runCommand", {
        command: config.frontendBuild
    });

    // Проверяем Backend
    const backend = await execute("runCommand", {
        command: config.backendStart
    });

    const errors = [];

    if (!frontend.success) {

        errors.push({
            module: "frontend",
            stdout: frontend.stdout,
            stderr: frontend.stderr
        });

    }

    if (!backend.success) {

        errors.push({
            module: "backend",
            stdout: backend.stdout,
            stderr: backend.stderr
        });

    }

    if (errors.length === 0) {

        console.log("✅ Ошибок не найдено");

        return {

            status: "ok",

            message: "Проект успешно прошёл проверку.",

            frontend,

            backend,

            errors: []

        };

    }

    console.log("⚠ Обнаружены ошибки");

    return {

        status: "error",

        message: "Найдены ошибки.",

        frontend,

        backend,

        errors

    };

}

module.exports = {
    analyzeProject
};