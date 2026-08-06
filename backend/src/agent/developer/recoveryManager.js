const fs = require("fs");
const path = require("path");


// ==========================================
// Anna OS Recovery Intelligence v0.1.33
// Safe Recovery Planning + Intelligence Layer
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
            "0.1.33",

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
            "0.1.33",

        recoveryPoints:
            backups.length,

        backups,

        mode:
            "safe"

    };

}


// ==========================================
// RECOVERY INTELLIGENCE
// ==========================================

function getRecoveryIntelligence() {

    const backups =
        getAvailableRecoveryPoints();


    const latestBackup =
        backups.length > 0
            ? backups[backups.length - 1]
            : null;


    let health =
        "stable";


    let restoreReady =
        false;


    if (
        latestBackup
    ) {

        const validation =
            validateBackup(
                latestBackup
            );


        restoreReady =
            validation.status === "passed";


        if (
            !restoreReady
        ) {

            health =
                "warning";

        }

    }
    else {

        health =
            "no-backups";

    }


    return {

        system:
            "Anna OS Recovery Intelligence",

        version:
            "0.1.33",

        recoveryPoints:
            backups.length,

        latestBackup,

        health,

        restoreReady,

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

    getRecoveryStatus,

    getRecoveryIntelligence

};
