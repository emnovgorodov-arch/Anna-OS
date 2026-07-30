// ==========================================
// Anna OS Brain Block v0.1.2
// Central Thinking Layer
// ==========================================


const { loadContext } = require("./context");
const { dispatchTask } = require("./dispatcher");



// ==========================================
// RUN BRAIN
// ==========================================


async function runBrain(input) {


    console.log("================================");
    console.log("🧠 BRAIN BLOCK");
    console.log("================================");


    const task =
        input.task ||
        "";



    // Загружаем контекст

    const context = await loadContext();



    console.log(
        "🧠 Context loaded"
    );



    // Определяем маршрут задачи

    const route =
        await dispatchTask({

            task,

            context

        });



    console.log(
        "🧭 Route:",
        route
    );



    return {


        prompt:
`
Ты — Анна OS.

Контекст системы:

${JSON.stringify(context,null,2)}


Задача пользователя:

${task}


Режим обработки:

${route.mode || "general"}

Ответь пользователю полезно и кратко.
`,


        context,


        route



    };


}



// ==========================================
// EXPORT
// ==========================================


module.exports = {

    runBrain

};