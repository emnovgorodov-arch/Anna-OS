const fs = require("fs");
const path = require("path");


// ==========================================
// Anna OS Recovery Manager v0.1.31
// Safe Recovery Planning Layer
// ==========================================


const projectRoot =
    path.join(__dirname, "../../../..");


const backupRoot =
    path.join(projectRoot, "backup");



const {
    validateBackup
} =
require("./backupValidator");



// ==========================================
// AVAILABLE RECOVERY POINTS
// ==========================================

function getAvailableRecoveryPoints() {


    if (
        !fs.existsSync(backupRoot)
    ) {

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
// VALIDATE RECOVERY POINT
// ==========================================

function validateRecoveryPoint(
    backupName
) {


    return validateBackup(
        backupName
    );


}



// ==========================================
// CREATE RESTORE PLAN
// ==========================================

function createRestorePlan(
    backupName
) {


    const validation =
        validateRecoveryPoint(
            backupName
        );


    return {

        manager:
            "Anna OS Recovery Manager",


        version:
            "0.1.31",


        backup:
            backupName,


        validation,


        mode:
            "safe-plan-only",


        execute:
            false

    };


}



// ==========================================
// RECOVERY STATUS
// ==========================================

function getRecoveryStatus() {


    const backups =
        getAvailableRecoveryPoints();


    return {

        manager:
            "Anna OS Recovery Manager",


        version:
            "0.1.31",


        recoveryPoints:
            backups.length,


        backups,


        mode:
            "safe"


    };


}



// ==========================================
// EXPORT
// ==========================================

module.exports = {


    getAvailableRecoveryPoints,


    validateRecoveryPoint,


    createRestorePlan,


    getRecoveryStatus


};
