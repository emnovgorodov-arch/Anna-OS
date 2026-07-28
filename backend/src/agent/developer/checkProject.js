const fs = require("fs");
const path = require("path");

function walk(dir, files = []) {
    for (const item of fs.readdirSync(dir)) {
        const full = path.join(dir, item);

        if (fs.statSync(full).isDirectory()) {
            walk(full, files);
        } else {
            files.push(full);
        }
    }

    return files;
}

async function checkProject() {

    const root = path.resolve(__dirname, "../../../");

    const allFiles = walk(root);

    const problems = [];

    for (const file of allFiles) {

        const stat = fs.statSync(file);

        if (stat.size === 0) {
            problems.push({
                type: "empty_file",
                file
            });
        }

        if (file.endsWith(".js")) {

            const code = fs.readFileSync(file, "utf8");

            const regex = /require\(["'](.+?)["']\)/g;

            let m;

            while ((m = regex.exec(code)) !== null) {

                const req = m[1];

                if (!req.startsWith(".")) continue;

                let target = path.resolve(path.dirname(file), req);

                if (!target.endsWith(".js"))
                    target += ".js";

                if (!fs.existsSync(target)) {

                    problems.push({
                        type: "missing_module",
                        file,
                        module: req,
                        target
                    });

                }

            }

        }

    }

    return problems;

}

module.exports = {
    checkProject
};