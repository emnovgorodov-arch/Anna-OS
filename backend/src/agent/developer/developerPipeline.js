/**
 * ==========================================
 * Anna OS Developer Pipeline v0.1.32
 * Decision + Learning + Memory Intelligence
 * + Safe Backup Integration
 * + Backup Validation
 * + Recovery Intelligence
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

const { validateBackup } =
    require("./backupValidator");

const { getRecoveryStatus } =
    require("./recoveryManager");


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

    let backupValidation = null;

    let recovery = null;


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


                // ==================================
                // BACKUP VALIDATION
                // ==================================

                backupValidation =
                    validateBackup(
                        backup.metadata.backup
                    );


                console.log(
                    "?? Backup validation:",
                    backupValidation.status
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


                backupValidation = {

                    status:
                        "not-run",

                    reason:
                        "Backup creation failed"

                };

            }

        }


        // ==================================
        // RECOVERY INTELLIGENCE
        // ==================================

        recovery =
            getRecoveryStatus();


        console.log(
            "?? Recovery status checked"
        );


        // ==================================
        // FINAL RETURN
        // ==================================

        return {

            pipeline:
                "Anna OS Developer Pipeline",

            version:
                "0.1.32",

            trigger,

            status:
                "completed",

            learning,

            learningReport,

            memoryAnalysis,

            proposals,

            backup,

            backupValidation,

            recovery,

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
                "0.1.32",

            trigger,

            status:
                "error",

            analysis,

            backup:
                null,

            backupValidation:
                null,

            recovery:
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
