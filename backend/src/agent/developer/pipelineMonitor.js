const fs = require("fs");
const path = require("path");


// ==========================================
// Anna OS Pipeline Monitor v0.1.30
// Developer Activity Monitoring Layer
// ==========================================


const projectRoot =
    path.join(__dirname, "../../../..");

const memoryFile =
    path.join(
        projectRoot,
        "backend",
        "src",
        "memory",
        "memory.json"
    );



// ==========================================
// READ MEMORY EVENTS
// ==========================================

function readMemoryEvents() {

    if (!fs.existsSync(memoryFile)) {
        return [];
    }


    try {

        const data =
            JSON.parse(
                fs.readFileSync(
                    memoryFile,
                    "utf8"
                )
            );


        return Array.isArray(data)
            ? data
            : [];

    }
    catch {

        return [];

    }

}



// ==========================================
// PIPELINE STATUS
// ==========================================

function getPipelineStatus() {


    const events =
        readMemoryEvents();


    const developerEvents =
        events.filter(
            e =>
            e.type === "developer_pipeline"
        );


    return {

        system:
            "Anna OS Pipeline Monitor",


        version:
            "0.1.30",


        totalEvents:
            developerEvents.length,


        lastEvent:
            developerEvents.length > 0
                ? developerEvents[
                    developerEvents.length - 1
                  ]
                : null,


        health:
            "stable"

    };

}



// ==========================================
// EXPORT
// ==========================================

module.exports = {

    getPipelineStatus

};

