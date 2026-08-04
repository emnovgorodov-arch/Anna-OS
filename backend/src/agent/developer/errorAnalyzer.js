// ==========================================
// Anna OS Error Analyzer v0.1.6.1
// ==========================================


function analyzeError(error) {


    const message =
        error?.message ||
        String(error);



    let component = "Unknown";

    let reason = "Unknown error";

    let recommendation =
        "Check system logs";


    // ==============================
    // MEMORY
    // ==============================

    if (
        message.includes("history") ||
        message.includes("memory")
    ) {

        component =
            "Memory Layer";


        reason =
            "Memory structure problem";


        recommendation =
            "Check memory initialization and schema";

    }



    // ==============================
    // AI CORE
    // ==============================

    else if (
        message.includes("OLLAMA") ||
        message.includes("socket")
    ) {

        component =
            "AI Core";


        reason =
            "AI model connection problem";


        recommendation =
            "Check Ollama service and model availability";

    }



    // ==============================
    // BRAIN
    // ==============================

    else if (
        message.includes("brain") ||
        message.includes("prompt")
    ) {

        component =
            "Brain Layer";


        reason =
            "Context processing problem";


        recommendation =
            "Check brain routing and context builder";

    }



    return {

        error:
            message,


        component,


        reason,


        recommendation,


        confidence:
            0.8,


        time:
            new Date()
            .toISOString()

    };


}



module.exports = {

    analyzeError

};