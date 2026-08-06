const fs = require("fs");
const path = require("path");

// ==========================================
// Anna OS Backup Rotation Manager v0.1.26
// Safe Backup Rotation Layer
// Keeps only the latest N numbered backups
// ==========================================

const projectRoot =
    path.join(__dirname, "../../../..");

const backupRoot =
    path.join(projectRoot, "backup");

const MAX_BACKUPS = 5;


// ==========================================
// LIST BACKUPS
// ==========================================

function listBackups() {

    if (!fs.existsSync(backupRoot)) {
        return [];
    }

    return fs.readdirSync(
        backupRoot,
        { withFileTypes: true }
    )
        .filter(entry =>
            entry.isDirectory()
        )
        .map(entry =>
            entry.name
        )
        .filter(name =>
            /^backup-\d+$/.test(name)
        )
        .sort((a, b) => {

            const numberA =
                parseInt(
                    a.replace("backup-", ""),
                    10
                );

            const numberB =
                parseInt(
                    b.replace("backup-", ""),
                    10
                );

            return numberA - numberB;

        });

}


// ==========================================
// ROTATE BACKUPS
// ==========================================

function rotateBackups(
    maxBackups = MAX_BACKUPS
) {

    if (
        !Number.isInteger(maxBackups) ||
        maxBackups < 1
    ) {

        throw new Error(
            "maxBackups must be a positive integer"
        );

    }


    const backups =
        listBackups();


    const excess =
        backups.length - maxBackups;


    if (excess <= 0) {

        return {

            removed: [],

            remaining: backups

        };

    }


    const toRemove =
        backups.slice(
            0,
            excess
        );


    const removed = [];


    for (
        const backup of toRemove
    ) {

        const target =
            path.join(
                backupRoot,
                backup
            );


        try {

            fs.rmSync(
                target,
                {
                    recursive: true,
                    force: true
                }
            );


            removed.push(
                backup
            );

        }
        catch (error) {

            console.log(
                "Не удалось удалить backup:",
                backup,
                error.message
            );

        }

    }


    return {

        removed,

        remaining:
            listBackups()

    };

}


// ==========================================
// STATUS
// ==========================================

function getBackupRotationStatus(
    maxBackups = MAX_BACKUPS
) {

    const backups =
        listBackups();


    return {

        manager:
            "Anna OS Backup Rotation Manager",

        version:
            "0.1.26",

        maxBackups,

        totalBackups:
            backups.length,

        backups

    };

}


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    listBackups,

    rotateBackups,

    getBackupRotationStatus

};
