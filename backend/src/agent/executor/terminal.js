const { exec } = require("child_process");

function run(command) {

    return new Promise((resolve) => {

        exec(command, { timeout: 600000 }, (error, stdout, stderr) => {

            resolve({

                success: !error,

                stdout,

                stderr,

                error: error ? error.message : null

            });

        });

    });

}

module.exports = {
    run
};