/**
 * ==========================================
 * Anna OS Recovery Decision Engine v0.1.34
 * Recovery Planning + Decision Intelligence
 * ==========================================
 */

const {
    getRecoveryStatus,
    getAvailableRecoveryPoints,
    validateRecoveryPoint
} = require("./recoveryManager");


// ==========================================
// FIND LATEST BACKUP
// ==========================================

function getLatestRecoveryPoint() {

    const backups =
        getAvailableRecoveryPoints();

    if (
        backups.length === 0
    ) {

        return null;

    }

    return backups[
        backups.length - 1
    ];

}


// ==========================================
// ANALYZE RECOVERY STATE
// ==========================================

function analyzeRecoveryState() {

    const status =
        getRecoveryStatus();


    const latestBackup =
        getLatestRecoveryPoint();


    let validation = null;


    if (latestBackup) {

        validation =
            validateRecoveryPoint(
                latestBackup
            );

    }


    return {

        system:
            "Anna OS Recovery Decision Engine",

        version:
            "0.1.34",

        recoveryPoints:
            status.recoveryPoints,

        latestBackup,

        validation,

        health:
            validation &&
            validation.status === "passed"
                ? "stable"
                : "warning"

    };

}


// ==========================================
// CREATE RECOVERY DECISION
// ==========================================

function createRecoveryDecision() {

    const state =
        analyzeRecoveryState();


    return {

        system:
            "Anna OS Recovery Decision Engine",

        version:
            "0.1.34",

        decision:
            state.health === "stable"
                ? "recovery-ready"
                : "review-required",

        restorePoint:
            state.latestBackup,

        mode:
            "safe-plan-only",

        execute:
            false,

        state

    };

}


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    getLatestRecoveryPoint,

    analyzeRecoveryState,

    createRecoveryDecision

};
