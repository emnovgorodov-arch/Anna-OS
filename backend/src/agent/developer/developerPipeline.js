/**
 * ==========================================
 * Anna OS Developer Pipeline v0.1.27
 * Decision + Learning + Memory Intelligence
 * + Safe Backup Integration
 * ==========================================
 */

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

const { analyzeMemory } =
    require("./memoryAnalyzer");

const { remember } =
    require("../../memory/memory");

const { createBackup } =
    require("./backupManager");


// ==========================================
// DEVELOPMENT PIPELINE
// ==========================================

async function developerPipeline(
    trigger = "manual"
) {

    console.log("================================");
    console.log("?? ANNA DEVELOPER PIPELINE");
    console.log("TRIGGER:", trigger);
    console.log("================================");

    let proposals = [];

    let backup = null;


    try {

        // ==================================
        // SELF DEVELOPER
        // ==================================

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
                analyzeError(
                    error
                );


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
            "?? Learning report generated"
        );


        // ==================================
        // MEMORY INTELLIGENCE
        // ==================================

        const memoryAnalysis =
            analyzeMemory();


        console.log(
            "?? Memory analysis completed"
        );


        // ==================================
        // MEMORY SAVE
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
                learningReport.version,

            memoryAnalyzer:
                memoryAnalysis.version

        });


        // ==================================
        // BACKUP
        // ==================================

        if (
            result.analysis.status === "ok"
        ) {

            console.log(
                "?? Creating safe project backup..."
            );


            try {

                backup =
                    createBackup();


                console.log(
                    "? Backup created:",
                    backup.metadata.backup
                );

            }
            catch (backupError) {

                console.log(
                    "?? Backup failed:",
                    backupError.message
                );


                backup = {

                    status:
                        "error",

                    error:
                        backupError.message

                };

            }

        }


        // ==================================
        // RETURN
        // ==================================

        return {

            pipeline:
                "Anna OS Developer Pipeline",

            version:
                "0.1.27",

            trigger,

            status:
                "completed",

            learning,

            learningReport,

            memoryAnalysis,

            proposals,

            backup,

            result

        };


    }
    catch (error) {


        // ==================================
        // PIPELINE ERROR
        // ==================================

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
                "0.1.27",

            trigger,

            status:
                "error",

            analysis,

            backup:
                null

        };

    }

}


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    developerPipeline

};
