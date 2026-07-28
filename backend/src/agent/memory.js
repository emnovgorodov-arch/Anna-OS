const fs = require("fs");
const path = require("path");

const memoryFile = path.join(__dirname, "../../data/self-memory.json");

function saveMemory(entry) {
    let memory = [];

    if (fs.existsSync(memoryFile)) {
        memory = JSON.parse(fs.readFileSync(memoryFile, "utf8"));
    }

    memory.push(entry);

    fs.writeFileSync(memoryFile, JSON.stringify(memory, null, 2));
}

module.exports = {
    saveMemory
};