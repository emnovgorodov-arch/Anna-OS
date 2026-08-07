const {
    getBusinessAgentRegistry
} =
require("./businessAgentRegistry");


const {
    createAndRegisterAgent
} =
require("./agentControl");


// ==========================================
// Anna OS Agent Initialization Engine v0.1.40
// Business Agent Deployment Layer
// ==========================================


// ==========================================
// INITIALIZE SELECTED AGENTS
// ==========================================

function initializeAgents(
    selected = []
){

    const registry =
        getBusinessAgentRegistry();


    const available =
        registry.availableAgents;


    const agents =
        available.filter(
            agent =>
                selected.length === 0 ||
                selected.includes(agent.id)
        );


    const created =
        [];


    for(
        const agent of agents
    ){

        created.push(

            createAndRegisterAgent({

                id:
                    agent.id,

                name:
                    agent.name,

                role:
                    agent.role,

                permissions:
                    agent.permissions,

                knowledge:
                    agent.knowledge,

                version:
                    "1.0",

                status:
                    "created"

            })

        );

    }


    return {

        system:
            "Anna OS Agent Initialization Engine",

        version:
            "0.1.40",

        initialized:
            created.length,

        agents:
            created

    };

}


// ==========================================
// INITIALIZE FIRST BUSINESS AGENT
// ==========================================

function initializeMarketingAgent(){

    return initializeAgents([

        "marketing-agent"

    ]);

}


// ==========================================
// INITIALIZATION STATUS
// ==========================================

function getInitializationStatus(){

    return {

        system:
            "Anna OS Agent Initialization Engine",

        version:
            "0.1.40",

        connected:

            [

                "Business Agent Registry",

                "Agent Control Layer"

            ],

        status:
            "ready"

    };

}


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    initializeAgents,

    initializeMarketingAgent,

    getInitializationStatus

};
