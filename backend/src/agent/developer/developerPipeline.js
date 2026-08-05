// ==========================================
// Anna OS Developer Pipeline v0.1.17
// Decision + Learning Report Integration
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

const { generateLearningReport } =
    require("./learningReport");

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
        // ERROR ANALYSIS
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
        // LEARNING SYSTEM
        // ==================================


        const learning =
            getDecisionStats();



        const learningReport =
            generateLearningReport();





        console.log(
            "🧠 Learning report generated"
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



            learning,



            learningReport:
                learningReport.version


        });







        // ==================================
        // RETURN
        // ==================================


        return {


            pipeline:
                "Anna OS Developer Pipeline",



            version:
                "0.1.17",



            trigger,



            status:
                "completed",



            learning,



            learningReport,



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
                "0.1.17",



            status:
                "error",



            analysis


        };


    }


}





module.exports = {


    developerPipeline

};