const {
    createAndRegisterAgent
} =
require("./agentControl");


// ==========================================
// Anna OS Business Agent Registry v0.1.38
// Initial Business Agent Structure
// ==========================================


// ==========================================
// BUSINESS AGENT DEFINITIONS
// ==========================================

const BUSINESS_AGENTS = [

    {

        id:
            "marketing-agent",

        name:
            "Marketing Agent",

        role:
            "marketing",

        permissions:
            [
                "audience_analysis",
                "promotion_strategy",
                "campaign_planning"
            ],

        knowledge:
            [
                "marketing",
                "social_media",
                "customer_behavior"
            ]

    },


    {

        id:
            "content-agent",

        name:
            "Content Agent",

        role:
            "content_creation",

        permissions:
            [
                "text_creation",
                "content_analysis",
                "content_improvement"
            ],

        knowledge:
            [
                "brand_style",
                "copywriting",
                "content_strategy"
            ]

    },


    {

        id:
            "analytics-agent",

        name:
            "Analytics Agent",

        role:
            "analytics",

        permissions:
            [
                "data_analysis",
                "reports",
                "performance_tracking"
            ],

        knowledge:
            [
                "metrics",
                "business_analysis"
            ]

    },


    {

        id:
            "sales-agent",

        name:
            "Sales Agent",

        role:
            "sales",

        permissions:
            [
                "sales_analysis",
                "client_support",
                "funnel_analysis"
            ],

        knowledge:
            [
                "sales",
                "negotiation",
                "customer_psychology"
            ]

    }

];


// ==========================================
// INITIALIZE BUSINESS AGENTS
// ==========================================

function initializeBusinessAgents(){

    const created = [];


    for(
        const agent of BUSINESS_AGENTS
    ){

        created.push(

            createAndRegisterAgent({

                id:
                    agent.id,

                name:
                    agent.name,

                role:
                    agent.role,

                parent:
                    "Anna OS Business Core",

                permissions:
                    agent.permissions,

                knowledge:
                    agent.knowledge

            })

        );

    }


    return {

        system:
            "Anna OS Business Agent Registry",

        version:
            "0.1.38",

        initialized:
            created.length,

        agents:
            created

    };

}


// ==========================================
// GET REGISTRY
// ==========================================

function getBusinessAgentRegistry(){

    return {

        system:
            "Anna OS Business Agent Registry",

        version:
            "0.1.38",

        availableAgents:
            BUSINESS_AGENTS

    };

}


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    initializeBusinessAgents,

    getBusinessAgentRegistry

};
