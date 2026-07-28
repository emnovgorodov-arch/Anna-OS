const { exec } = require("child_process");

function status() {

    return new Promise((resolve) => {

        exec("git status", (err, stdout, stderr) => {

            resolve({

                success: !err,

                stdout,

                stderr

            });

        });

    });

}

module.exports = {
    status
};