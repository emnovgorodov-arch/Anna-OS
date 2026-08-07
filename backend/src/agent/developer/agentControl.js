const {
    createAgentProfile
} =
require("./agentFactory");


const {
    registerAgent
} =
require("./agentFactory");


const {
    getAgents
} =
require("./agentManager");


// ==========================================
// Anna OS Agent Control Layer v0.1.37
// Factory + Manager Integration
// ==========================================


// ==========================================
// CREATE AND REGISTER AGENT
// ==========================================

function createAndRegisterAgent(
    config = {}
){

    const agent =
        createAgentProfile(
            config
        );


    const registration =
        registerAgent(
            agent
        );


    return {

        system:
            "Anna OS Agent Control Layer",


        version:
            "0.1.37",


        agent,

        registration

    };

}


// ==========================================
// GET AGENT OVERVIEW
// ==========================================

function getAgentOverview(){

    const agents =
        getAgents();


    return {

        system:
            "Anna OS Agent Control Layer",


        version:
            "0.1.37",


        totalAgents:
            agents.length,


        agents

    };

}


// ==========================================
// CONTROL STATUS
// ==========================================

function getControlStatus(){

    return {

        system:
            "Anna OS Agent Control Layer",


        version:
            "0.1.37",


        connected:

            [

                "Agent Factory",

                "Agent Manager"

            ],


        status:
            "ready"

    };

}


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    createAndRegisterAgent,

    getAgentOverview,

    getControlStatus

};
