// Anna Agent v0.1.8
// Модуль памяти агента

import fs from "fs";

const MEMORY_FILE = "./memory.json";


export function saveMemory(task, answer) {

    let memory = [];


    // если файл памяти существует - читаем его
    if (fs.existsSync(MEMORY_FILE)) {

        const data = fs.readFileSync(
            MEMORY_FILE,
            "utf8"
        );

        memory = JSON.parse(data);

    }


    // добавляем новую запись
    memory.push({

        date: new Date().toISOString(),

        task: task,

        answer: answer

    });


    // сохраняем обратно
    fs.writeFileSync(
        MEMORY_FILE,
        JSON.stringify(memory, null, 2)
    );

}