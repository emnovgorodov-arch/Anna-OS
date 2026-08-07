const fs = require("fs");
const path = require("path");


// ==========================================
// Anna OS Agent Factory v0.1.36
// Agent Creation & Registration Layer
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
// INITIALIZE
// ==========================================

function initStorage(){

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
// CREATE AGENT PROFILE
// ==========================================

function createAgentProfile(
    config = {}
){

    initStorage();


    const agent = {

        id:
            config.id ||
            "agent-" + Date.now(),


        name:
            config.name ||
            "Unnamed Agent",


        role:
            config.role ||
            "general",


        parent:
            config.parent ||
            "Anna OS Core",


        version:
            "0.1.0",


        permissions:
            config.permissions ||
            [],


        knowledge:
            config.knowledge ||
            [],


        status:
            "created",


        learning:
            true,


        qualityScore:
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
// REGISTER AGENT
// ==========================================

function registerAgent(
    agent
){

    initStorage();


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


    return {

        status:
            "registered",

        agent:
            agent.id

    };

}


// ==========================================
// GET FACTORY STATUS
// ==========================================

function getFactoryStatus(){

    initStorage();


    const agents =
        fs.readdirSync(
            agentsRoot
        )
        .filter(
            file =>
                file.endsWith(".json")
        );


    return {

        system:
            "Anna OS Agent Factory",

        version:
            "0.1.36",

        createdAgents:
            agents.length,

        status:
            "ready"

    };

}


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    createAgentProfile,

    registerAgent,

    getFactoryStatus

};
