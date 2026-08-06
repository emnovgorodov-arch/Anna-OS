const fs = require("fs");
const path = require("path");

// ==========================================
// Anna OS Backup Manager v0.1.26
// Safe Full Project Snapshot + Rotation
// ==========================================

const projectRoot =
    path.join(__dirname, "../../../..");

const backupRoot =
    path.join(projectRoot, "backup");

const MAX_BACKUPS = 5;

const EXCLUDED = new Set([
    "backup",
    "node_modules",
    ".git",
    "logs",
    "temp"
]);


// ==========================================
// ENSURE BACKUP DIRECTORY
// ==========================================

function ensureBackupFolder() {

    if (!fs.existsSync(backupRoot)) {

        fs.mkdirSync(
            backupRoot,
            { recursive: true }
        );

    }

}


// ==========================================
// LIST BACKUPS
// ==========================================

function listBackups() {

    if (!fs.existsSync(backupRoot)) {
        return [];
    }

    return fs.readdirSync(backupRoot)
        .filter(name => name.startsWith("backup-"))
        .filter(name => {

            const fullPath =
                path.join(
                    backupRoot,
                    name
                );

            try {

                return fs.statSync(
                    fullPath
                ).isDirectory();

            } catch {

                return false;

            }

        })
        .sort();

}


// ==========================================
// GENERATE NEXT BACKUP NUMBER
// ==========================================

function generateBackupName() {

    const backups =
        listBackups();

    let maxNumber = 0;

    for (const backup of backups) {

        const match =
            backup.match(/^backup-(\d+)$/);

        if (match) {

            const number =
                parseInt(
                    match[1],
                    10
                );

            if (number > maxNumber) {
                maxNumber = number;
            }

        }

    }

    return (
        "backup-" +
        String(maxNumber + 1)
            .padStart(3, "0")
    );

}


// ==========================================
// COPY DIRECTORY
// ==========================================

function copyFolder(
    source,
    destination
) {

    if (!fs.existsSync(destination)) {

        fs.mkdirSync(
            destination,
            { recursive: true }
        );

    }

    const entries =
        fs.readdirSync(
            source,
            { withFileTypes: true }
        );

    for (const entry of entries) {

        const name =
            entry.name;

        if (EXCLUDED.has(name)) {
            continue;
        }

        const src =
            path.join(
                source,
                name
            );

        const dest =
            path.join(
                destination,
                name
            );

        if (entry.isDirectory()) {

            copyFolder(
                src,
                dest
            );

        } else {

            fs.copyFileSync(
                src,
                dest
            );

        }

    }

}


// ==========================================
// ROTATE BACKUPS
// ==========================================

function rotateBackups(
    maxBackups = MAX_BACKUPS
) {

    const backups =
        listBackups();

    const excess =
        backups.length -
        maxBackups;

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

    for (const backup of toRemove) {

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

        } catch (error) {

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
// CREATE BACKUP
// ==========================================

function createBackup(
    maxBackups = MAX_BACKUPS
) {

    ensureBackupFolder();

    const backupName =
        generateBackupName();

    const destination =
        path.join(
            backupRoot,
            backupName
        );

    copyFolder(
        projectRoot,
        destination
    );

    const metadata = {

        system:
            "Anna OS Backup Manager",

        version:
            "0.1.26",

        created:
            new Date()
                .toISOString(),

        backup:
            backupName,

        source:
            projectRoot,

        excluded:
            Array.from(EXCLUDED),

        rotation:
            {
                maxBackups
            }

    };


    fs.writeFileSync(

        path.join(
            destination,
            "backupMetadata.json"
        ),

        JSON.stringify(
            metadata,
            null,
            4
        )

    );


    const rotation =
        rotateBackups(
            maxBackups
        );


    return {

        status:
            "completed",

        metadata,

        rotation

    };

}


// ==========================================
// STATUS
// ==========================================

function getBackupStatus() {

    const backups =
        listBackups();

    return {

        manager:
            "Anna OS Backup Manager",

        version:
            "0.1.26",

        maxBackups:
            MAX_BACKUPS,

        totalBackups:
            backups.length,

        backups

    };

}


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    createBackup,

    listBackups,

    rotateBackups,

    getBackupStatus

};
