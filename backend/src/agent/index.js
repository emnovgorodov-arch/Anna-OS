// Anna Agent v0.1.8
// Главный файл запуска

import { askAI } from "./ai.js";
import { saveMemory } from "./memory.js";
import readline from "readline";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log("==============================");
console.log(" Anna Agent v0.1.8 запущен ");
console.log("==============================");


rl.question(
    "Введите задачу для Anna: ",
    async (task) => {

        console.log("\nAnna анализирует...\n");

        try {

            const answer = await askAI(task);

            console.log("Ответ Anna:");
            console.log("----------------");
            console.log(answer);

            saveMemory(task, answer);

            console.log("\nСохранено в память.");

        } catch (error) {

            console.log("Ошибка:");
            console.log(error.message);

        }

        rl.close();

    }
);