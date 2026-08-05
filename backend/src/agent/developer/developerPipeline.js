// ==========================================
// Anna OS Developer Pipeline v0.1.8
// ==========================================


const { selfDeveloper } = require("./selfDeveloper");
const { analyzeError } = require("./errorAnalyzer");
const { createPatchProposal } = require("./patchEngine");
const { remember } = require("../../memory/memory");



// ==========================================
// DEVELOPMENT PIPELINE
// ==========================================


async function developerPipeline(trigger = "manual") {


    console.log("================================");
    console.log("🚀 ANNA DEVELOPER PIPELINE");
    console.log("TRIGGER:", trigger);
    console.log("================================");


    let proposals = [];


    try {


        const result = await selfDeveloper();



        if (
            result.analysis.status !== "ok"
        ) {


            const error = {

                error:
                    result.analysis.message,


                component:
                    "Developer Cycle",


                reason:
                    "Self diagnostic warning",


                recommendation:
                    "Review generated report"

            };



            const analysis =
                analyzeError(error);



            const patch =
                createPatchProposal(
                    analysis
                );



            proposals.push(patch);


        }



        remember({


            type:
                "developer_pipeline",


            trigger,


            status:
                result.analysis.status,


            proposals:
                proposals.length


        });



        return {


            pipeline:
                "Anna OS Developer Pipeline",


            trigger,


            status:
                "completed",


            proposals,


            result


        };


    }


    catch(error){


        const analysis =
            analyzeError({

                error:
                    error.message,


                component:
                    "Developer Pipeline"

            });



        return {


            pipeline:
                "Anna OS Developer Pipeline",


            status:
                "error",


            analysis


        };


    }


}



module.exports = {

    developerPipeline

};