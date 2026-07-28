const fs = require("fs");
const path = require("path");

async function replaceInFile(filePath, searchValue, replaceValue) {

    try {

        const full = path.resolve(filePath);

        const content = fs.readFileSync(full, "utf8");

        const updated = content.replace(searchValue, replaceValue);

        fs.writeFileSync(full, updated, "utf8");

        return {
            success: true,
            file: full
        };

    } catch (err) {

        return {
            success: false,
            message: err.message
        };

    }

}

module.exports = {
    replaceInFile
};