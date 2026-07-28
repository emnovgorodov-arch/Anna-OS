const fs = require("fs");
const path = require("path");

function readFile(filePath) {

    try {

        const full = path.resolve(filePath);

        const content = fs.readFileSync(full, "utf8");

        return {
            success: true,
            path: full,
            content
        };

    } catch (err) {

        return {
            success: false,
            message: err.message
        };

    }

}

function writeFile(filePath, content) {

    try {

        const full = path.resolve(filePath);

        fs.writeFileSync(full, content, "utf8");

        return {
            success: true,
            path: full
        };

    } catch (err) {

        return {
            success: false,
            message: err.message
        };

    }

}

function listFiles(folder) {

    try {

        const full = path.resolve(folder);

        return {
            success: true,
            files: fs.readdirSync(full)
        };

    } catch (err) {

        return {
            success: false,
            message: err.message
        };

    }

}

module.exports = {
    readFile,
    writeFile,
    listFiles
};