const fs = require("fs");
const path = require("path");

// ==========================================
// Anna OS Backup Validator v0.1.28
// Backup Integrity Check System
// ==========================================


const projectRoot =
    path.join(__dirname, "../../../..");


const backupRoot =
    path.join(projectRoot, "backup");



// ==========================================
// REQUIRED FILES / FOLDERS
// ==========================================

const REQUIRED_ITEMS = [

    "backend",

    "frontend",

    "package.json",

    "backupMetadata.json"

];



// ==========================================
// VALIDATE BACKUP
// ==========================================

function validateBackup(
    backupName
) {


    const backupPath =
        path.join(
            backupRoot,
            backupName
        );


    if (
        !fs.existsSync(backupPath)
    ) {

        return {

            backup:
                backupName,

            status:
                "failed",

            reason:
                "Backup does not exist"

        };

    }



    const missing = [];



    for (
        const item of REQUIRED_ITEMS
    ) {


        const target =
            path.join(
                backupPath,
                item
            );


        if (
            !fs.existsSync(target)
        ) {

            missing.push(
                item
            );

        }

    }



    return {

        backup:
            backupName,

        status:
            missing.length === 0
                ? "passed"
                : "failed",

        missing

    };


}



// ==========================================
// VALIDATE ALL BACKUPS
// ==========================================

function validateAllBackups(){

    if (
        !fs.existsSync(backupRoot)
    ){

        return [];

    }


    return fs.readdirSync(
        backupRoot
    )
    .filter(name =>
        name.startsWith("backup-")
    )
    .map(
        name =>
            validateBackup(name)
    );


}



// ==========================================
// EXPORT
// ==========================================

module.exports = {

    validateBackup,

    validateAllBackups

};
