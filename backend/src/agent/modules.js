// ==========================================
// Anna OS Agent Modules v0.1
// Модули анализа задач
// ==========================================

function analyzeTask(task) {

    return {

        status: "received",

        task: task,

        message:
            "Задача получена. Анна готовит анализ."

    };

}

function getAgentInfo() {

    return {

        name: "Анна Agent",

        version: "0.1.8",

        mode: "development"

    };

}

module.exports = {

    analyzeTask,

    getAgentInfo

};