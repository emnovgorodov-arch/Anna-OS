const fs = require("fs");
const path = require("path");


// ==========================================
// Anna OS Backup Intelligence v0.1.30
// Backup State Analysis Layer
// ==========================================


const projectRoot =
    path.join(__dirname, "../../../..");


const backupRoot =
    path.join(projectRoot, "backup");


// ==========================================
// GET BACKUPS
// ==========================================

function getBackups() {

    if (!fs.existsSync(backupRoot)) {
        return [];
    }


    return fs.readdirSync(
        backupRoot
    )
    .filter(name =>
        /^backup-\d+$/.test(name)
    )
    .sort();

}



// ==========================================
// ANALYZE BACKUP STATE
// ==========================================

function analyzeBackupState() {


    const backups =
        getBackups();


    const latest =
        backups.length > 0
            ? backups[backups.length - 1]
            : null;



    return {

        system:
            "Anna OS Backup Intelligence",


        version:
            "0.1.30",


        totalBackups:
            backups.length,


        latestBackup:
            latest,


        backupRoot,


        health:
            backups.length > 0
                ? "stable"
                : "empty"

    };


}



// ==========================================
// EXPORT
// ==========================================

module.exports = {

    getBackups,

    analyzeBackupState

};

