// ==========================================
// Anna OS Brain — Context
// version: "0.1.3"
// ==========================================

const { loadMemory } = require("../../memory/memory");

async function loadContext() {
    try {
        const memory = await loadMemory();

        return {
            system: "Anna OS",
            version: "0.1.3",
            agent: "Anna",
            memory
        };

    } catch (error) {

        console.error("❌ Context error:", error.message);

        return {
            system: "Anna OS",
            version: "0.1.3",
            agent: "Anna",
            memory: {}
        };
    }
}

module.exports = {
    loadContext
};