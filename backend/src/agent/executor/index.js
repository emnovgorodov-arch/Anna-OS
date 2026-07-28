const filesystem = require("./filesystem");
const terminal = require("./terminal");
const git = require("./git");

async function execute(action, payload = {}) {

    switch (action) {

        case "readFile":
            return filesystem.readFile(payload.path);

        case "writeFile":
            return filesystem.writeFile(payload.path, payload.content);

        case "listFiles":
            return filesystem.listFiles(payload.path);

        case "runCommand":
            return terminal.run(payload.command);

        case "gitStatus":
            return git.status();

        default:
            return {
                success: false,
                message: "Неизвестное действие: " + action
            };
    }

}

module.exports = {
    execute
};