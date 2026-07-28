// ==========================================
// Anna OS Executor Core v0.1
// Выполнительный модуль
// ==========================================

const filesystem = require("./executor/filesystem");
const terminal = require("./executor/terminal");
const git = require("./executor/git");


async function execute(action, payload = {}) {

    console.log("⚙ EXECUTE:", action);


    switch(action) {


        case "readFile":

            return filesystem.readFile(
                payload.path
            );


        case "writeFile":

            return filesystem.writeFile(
                payload.path,
                payload.content
            );


        case "listFiles":

            return filesystem.listFiles(
                payload.path
            );


        case "runCommand":

            return terminal.run(
                payload.command
            );


        case "gitStatus":

            return git.status();


        default:

            return {

                success:false,

                message:
                "Неизвестное действие: " + action

            };

    }

}


module.exports = {
    execute
};