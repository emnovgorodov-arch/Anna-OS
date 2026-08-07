const fs = require("fs");
const path = require("path");


// ==========================================
// Anna OS Agent Lifecycle Manager v0.1.39
// Agent State + Version Control Layer
// ==========================================


const projectRoot =
    path.join(__dirname, "../../../..");


const agentsRoot =
    path.join(
        projectRoot,
        "data",
        "agents"
    );


// ==========================================
// LOAD AGENT
// ==========================================

function loadAgent(id){

    const file =
        path.join(
            agentsRoot,
            id + ".json"
        );


    if(!fs.existsSync(file)){

        return null;

    }


    return JSON.parse(
        fs.readFileSync(
            file
        )
    );

}


// ==========================================
// SAVE AGENT
// ==========================================

function saveAgent(agent){

    const file =
        path.join(
            agentsRoot,
            agent.id + ".json"
        );


    fs.writeFileSync(
        file,
        JSON.stringify(
            agent,
            null,
            2
        )
    );


    return agent;

}


// ==========================================
// START AGENT
// ==========================================

function startAgent(id){

    const agent =
        loadAgent(id);


    if(!agent){

        return {

            status:
                "error",

            message:
                "Agent not found"

        };

    }


    agent.status =
        "active";


    agent.started =
        new Date().toISOString();


    return saveAgent(agent);

}


// ==========================================
// STOP AGENT
// ==========================================

function stopAgent(id){

    const agent =
        loadAgent(id);


    if(!agent){

        return {

            status:
                "error",

            message:
                "Agent not found"

        };

    }


    agent.status =
        "inactive";


    agent.stopped =
        new Date().toISOString();


    return saveAgent(agent);

}


// ==========================================
// UPDATE VERSION
// ==========================================

function updateAgentVersion(
    id,
    version
){

    const agent =
        loadAgent(id);


    if(!agent){

        return {

            status:
                "error",

            message:
                "Agent not found"

        };

    }


    agent.version =
        version;


    agent.updated =
        new Date().toISOString();


    return saveAgent(agent);

}


// ==========================================
// QUALITY IMPROVEMENT
// ==========================================

function improveAgentQuality(
    id,
    score,
    note = ""
){

    const agent =
        loadAgent(id);


    if(!agent){

        return {

            status:
                "error",

            message:
                "Agent not found"

        };

    }


    agent.qualityScore =
        score;


    if(
        !agent.history
    ){

        agent.history = [];

    }


    agent.history.push({

        date:
            new Date().toISOString(),

        quality:
            score,

        note

    });


    return saveAgent(agent);

}


// ==========================================
// STATUS
// ==========================================

function getLifecycleStatus(){

    let count = 0;


    if(
        fs.existsSync(agentsRoot)
    ){

        count =
            fs.readdirSync(
                agentsRoot
            )
            .filter(
                file =>
                    file.endsWith(".json")
            )
            .length;

    }


    return {

        system:
            "Anna OS Agent Lifecycle Manager",

        version:
            "0.1.39",

        managedAgents:
            count,

        functions:
            [
                "start",
                "stop",
                "version-control",
                "quality-improvement"
            ],

        status:
            "ready"

    };

}


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    startAgent,

    stopAgent,

    updateAgentVersion,

    improveAgentQuality,

    getLifecycleStatus

};
