const fs = require("fs");
const path = require("path");


// ==========================================
// Anna OS Agent Manager v0.1.35
// Agent Registry + Management Layer
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
// INIT STORAGE
// ==========================================

function initAgentsStorage(){

    if(
        !fs.existsSync(agentsRoot)
    ){

        fs.mkdirSync(
            agentsRoot,
            {
                recursive:true
            }
        );

    }

}


// ==========================================
// CREATE AGENT
// ==========================================

function createAgent(
    config = {}
){

    initAgentsStorage();


    const agent = {

        id:
            config.id ||
            "agent-" +
            Date.now(),


        name:
            config.name ||
            "Unnamed Agent",


        role:
            config.role ||
            "general",


        version:
            "1.0",


        parent:
            config.parent ||
            "Anna OS Core",


        permissions:
            config.permissions ||
            [],


        status:
            "active",


        quality:
            0,


        created:
            new Date().toISOString()

    };


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
// GET ALL AGENTS
// ==========================================

function getAgents(){

    initAgentsStorage();


    return fs.readdirSync(
        agentsRoot
    )
    .filter(file =>
        file.endsWith(".json")
    )
    .map(file =>
        JSON.parse(
            fs.readFileSync(
                path.join(
                    agentsRoot,
                    file
                )
            )
        )
    );

}


// ==========================================
// GET AGENT
// ==========================================

function getAgent(
    id
){

    const agents =
        getAgents();


    return agents.find(
        agent =>
            agent.id === id
    )
    ||
    null;

}


// ==========================================
// UPDATE AGENT QUALITY
// ==========================================

function updateAgentQuality(
    id,
    score
){

    const agent =
        getAgent(id);


    if(!agent){

        return {

            status:
                "error",

            message:
                "Agent not found"

        };

    }


    agent.quality =
        score;


    fs.writeFileSync(

        path.join(
            agentsRoot,
            id + ".json"
        ),

        JSON.stringify(
            agent,
            null,
            2
        )

    );


    return agent;

}


// ==========================================
// AGENT SYSTEM STATUS
// ==========================================

function getAgentStatus(){

    const agents =
        getAgents();


    return {

        system:
            "Anna OS Agent Manager",


        version:
            "0.1.35",


        agents:
            agents.length,


        active:
            agents.filter(
                a =>
                    a.status === "active"
            ).length,


        status:
            "ready"

    };

}


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    createAgent,

    getAgents,

    getAgent,

    updateAgentQuality,

    getAgentStatus

};
