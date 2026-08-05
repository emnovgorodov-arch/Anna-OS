// ==========================================
// Anna OS Backup Manager v0.1.22
// Safe Incremental Snapshot System
// ==========================================
//
// Features:
// - Full project snapshot
// - Exclude heavy folders
// - Prevent recursive backup
// - Keep last 5 backups
// - Metadata tracking
// - Lock protection
// ==========================================


const fs = require("fs");
const path = require("path");



// ==========================================
// PATHS
// ==========================================

const projectRoot =
    path.join(
        __dirname,
        "../../../.."
    );


const backupRoot =
    path.join(
        projectRoot,
        "backup"
    );


const lockFile =
    path.join(
        backupRoot,
        "backup.lock"
    );



// ==========================================
// SETTINGS
// ==========================================

const MAX_BACKUPS = 5;


const EXCLUDED = [

    "backup",
    "node_modules",
    ".git",
    "logs",
    "temp"

];



// ==========================================
// ENSURE BACKUP FOLDER
// ==========================================

function ensureBackupFolder(){


    if(
        !fs.existsSync(
            backupRoot
        )
    ){

        fs.mkdirSync(
            backupRoot,
            {
                recursive:true
            }
        );

    }

}



// ==========================================
// LOCK
// ==========================================

function createLock(){


    if(
        fs.existsSync(lockFile)
    ){

        throw new Error(
            "Backup already running"
        );

    }


    fs.writeFileSync(
        lockFile,
        new Date()
        .toISOString()
    );


}



function removeLock(){


    if(
        fs.existsSync(lockFile)
    ){

        fs.unlinkSync(
            lockFile
        );

    }


}



// ==========================================
// VERSION
// ==========================================

function generateVersion(){


    const backups =
        fs.existsSync(backupRoot)
        ?
        fs.readdirSync(
            backupRoot
        )
        .filter(
            x =>
            x.startsWith("backup-")
        )
        :
        [];



    return (
        "backup-" +
        String(
            backups.length + 1
        )
        .padStart(3,"0")
    );


}



// ==========================================
// COPY
// ==========================================

function copyFolder(
    source,
    destination
){


    if(
        !fs.existsSync(destination)
    ){

        fs.mkdirSync(
            destination,
            {
                recursive:true
            }
        );

    }



    const items =
        fs.readdirSync(
            source
        );



    for(
        const item of items
    ){


        if(
            EXCLUDED.includes(item)
        ){

            continue;

        }



        const src =
            path.join(
                source,
                item
            );


        const dest =
            path.join(
                destination,
                item
            );



        const stat =
            fs.statSync(
                src
            );



        if(
            stat.isDirectory()
        ){

            copyFolder(
                src,
                dest
            );

        }
        else{

            fs.copyFileSync(
                src,
                dest
            );

        }


    }


}



// ==========================================
// CLEAN OLD BACKUPS
// ==========================================

function cleanupBackups(){


    let backups =
        fs.readdirSync(
            backupRoot
        )
        .filter(
            x =>
            x.startsWith("backup-")
        )
        .sort();



    while(
        backups.length > MAX_BACKUPS
    ){


        const old =
            backups.shift();



        fs.rmSync(

            path.join(
                backupRoot,
                old
            ),

            {
                recursive:true,
                force:true
            }

        );


    }


}



// ==========================================
// CREATE BACKUP
// ==========================================

function createBackup(){


    ensureBackupFolder();


    createLock();


    try{


        const version =
            generateVersion();



        const destination =
            path.join(
                backupRoot,
                version
            );



        copyFolder(
            projectRoot,
            destination
        );



        const metadata = {


            system:
                "Anna OS Backup Manager",


            version:
                "0.1.22",


            created:
                new Date()
                .toISOString(),


            backup:
                version,


            source:
                projectRoot,


            excluded:
                EXCLUDED


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



        cleanupBackups();



        return {


            status:
                "completed",


            metadata


        };


    }

    finally{


        removeLock();


    }


}




module.exports = {


    createBackup

};