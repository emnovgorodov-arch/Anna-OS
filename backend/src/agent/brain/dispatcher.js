// ==========================================
// Anna OS Brain — Dispatcher
// v0.1.2
// ==========================================

async function dispatchTask({ task, context }) {

    const text = String(task || "")
        .toLowerCase()
        .trim();

    // --------------------------------------
    // SYSTEM / SELF DEVELOPER
    // --------------------------------------

    if (
        text.includes("проверь себя") ||
        text.includes("диагностируй") ||
        text.includes("самодиагностика") ||
        text.includes("selfcheck") ||
        text.includes("исправь ошибки")
    ) {
        return {
            mode: "self_developer",
            priority: "high"
        };
    }

    // --------------------------------------
    // GREETING
    // --------------------------------------

    if (
        text === "привет" ||
        text === "здравствуй" ||
        text === "добрый день" ||
        text === "доброе утро" ||
        text === "добрый вечер"
    ) {
        return {
            mode: "conversation",
            priority: "normal"
        };
    }

    // --------------------------------------
    // DEFAULT
    // --------------------------------------

    return {
        mode: "general",
        priority: "normal"
    };
}

module.exports = {
    dispatchTask
};