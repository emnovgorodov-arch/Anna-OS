// ==========================================
// Anna OS Self Developer v0.2
// ==========================================

const { selfCycle } = require("./selfCycle");

async function selfDeveloper() {

    console.log("================================");
    console.log("🤖 Self Developer");
    console.log("================================");


    const result = await selfCycle();


    return {

        message: "Самодиагностика завершена",


        analysis: result.analysis || {

            status: result.status || "unknown",

            message:
                result.message ||
                "Анализ завершён"

        },


        fixes: result.fixes || [],


        report: result.report || result

    };

}


module.exports = {
    selfDeveloper
};