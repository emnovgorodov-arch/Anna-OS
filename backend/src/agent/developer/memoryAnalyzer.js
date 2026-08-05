// ==========================================
// Anna OS Memory Analyzer v0.1.18
// ==========================================
//
// Анализ истории решений и ошибок
// ==========================================


const fs = require("fs");
const path = require("path");



const historyFile = path.join(
    __dirname,
    "patchHistory.json"
);




// ==========================================
// LOAD PATCH HISTORY
// ==========================================


function loadHistory() {


    if (!fs.existsSync(historyFile)) {

        return [];

    }


    return JSON.parse(
        fs.readFileSync(
            historyFile,
            "utf8"
        )
    );


}





// ==========================================
// ANALYZE ERROR PATTERNS
// ==========================================


function analyzeMemory() {


    const history =
        loadHistory();



    const components = {};

    const errors = {};




    history.forEach(item => {



        const component =
            item.component || "unknown";



        const error =
            item.error || "unknown";



        components[component] =
            (components[component] || 0) + 1;



        errors[error] =
            (errors[error] || 0) + 1;



    });





    const patterns =
        Object.keys(components)
        .map(component => {



            const count =
                components[component];



            let priority =
                "low";



            if (count >= 5) {

                priority =
                    "high";

            }
            else if (count >= 3) {

                priority =
                    "medium";

            }




            return {


                component,


                count,


                priority


            };



        });







    const recommendations = [];




    patterns.forEach(pattern => {



        if (
            pattern.priority === "high"
        ) {


            recommendations.push(

                "Investigate repeated issue: "
                +
                pattern.component

            );


        }



        if (
            pattern.priority === "medium"
        ) {


            recommendations.push(

                "Improve validation for: "
                +
                pattern.component

            );


        }



    });






    if (
        recommendations.length === 0
    ) {


        recommendations.push(

            "No critical memory patterns detected."

        );


    }






    return {


        analyzer:

            "Anna OS Memory Analyzer",



        version:

            "0.1.18",



        analyzed:

            new Date()
            .toISOString(),



        totalRecords:

            history.length,



        patterns,



        recommendations


    };


}





module.exports = {


    analyzeMemory,


    loadHistory


};