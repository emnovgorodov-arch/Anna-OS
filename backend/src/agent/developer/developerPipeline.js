// ==========================================
// Anna OS Developer Pipeline v0.1.15
// Decision + Learning Integration
// ==========================================


const { selfDeveloper } =
    require("./selfDeveloper");

const { analyzeError } =
    require("./errorAnalyzer");

const { createPatchProposal } =
    require("./patchEngine");

const { decidePatch } =
    require("./decisionEngine");

const { getDecisionStats } =
    require("./decisionStats");

const { remember } =
    require("../../memory/memory");




// ==========================================
// DEVELOPMENT PIPELINE
// ==========================================


async function developerPipeline(
    trigger = "manual"
) {


    console.log("================================");
    console.log("🚀 ANNA DEVELOPER PIPELINE");
    console.log("TRIGGER:", trigger);
    console.log("================================");



    let proposals = [];



    try {


        const result =
            await selfDeveloper();





        // ==================================
        // ANALYSIS
        // ==================================


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
                    "Review generated report",


                risk:
                    "low",


                confidence:
                    0.8


            };



            const analysis =
                analyzeError(error);



            const patch =
                createPatchProposal(
                    analysis
                );



            const decision =
                decidePatch(
                    patch
                );



            proposals.push({

                patch,

                decision

            });


        }





        // ==================================
        // LEARNING STATS
        // ==================================


        const learning =
            getDecisionStats();





        console.log(
            "🧠 Learning stats loaded"
        );





        // ==================================
        // MEMORY
        // ==================================


        remember({


            type:
                "developer_pipeline",


            trigger,


            status:
                result.analysis.status,


            proposals:
                proposals.length,


            learning


        });







        return {


            pipeline:
                "Anna OS Developer Pipeline",



            version:
                "0.1.15",



            trigger,



            status:
                "completed",



            learning,



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
                    "Developer Pipeline",


                reason:
                    "Pipeline execution error",


                recommendation:
                    "Review developer pipeline"


            });





        return {


            pipeline:
                "Anna OS Developer Pipeline",



            version:
                "0.1.15",



            status:
                "error",



            analysis


        };


    }


}




module.exports = {


    developerPipeline

};