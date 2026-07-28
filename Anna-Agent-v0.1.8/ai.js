// Anna Agent v0.1.8
// AI модуль - связь с Ollama

import axios from "axios";


const OLLAMA_URL = "http://localhost:11434/api/generate";


export async function askAI(task) {

    const response = await axios.post(
        OLLAMA_URL,
        {
            model: "qwen2.5:3b",

            prompt: `
Ты Anna Agent v0.1.8.

Ты помощник-разработчик.
Твоя задача — анализировать запросы и предлагать решения.

Задача пользователя:
${task}

Ответ дай структурировано:
1. Анализ задачи.
2. План действий.
3. Код или решение.
            `,

            stream: false
        }
    );


    return response.data.response;

}