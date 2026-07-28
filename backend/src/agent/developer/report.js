function generateReport(data) {

    console.log("📄 Формирую отчёт...");

    return {
        generated: new Date().toISOString(),

        analysis: data.analysis,

        fixes: data.fixes,

        summary: {
            status: data.analysis.status,
            fixesApplied: data.fixes.length
        }
    };

}

module.exports = {
    generateReport
};