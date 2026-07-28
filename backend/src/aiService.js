require("dotenv").config();

async function askAI(prompt) {

    const response = await fetch(
        `${process.env.OLLAMA_URL}/api/generate`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: process.env.OLLAMA_MODEL,

                prompt: `
Ты — Anna, локальный AI-ассистент операционной системы Anna OS.

Твои правила:
- отвечай как персональный помощник пользователя;
- будь дружелюбной;
- помогай решать задачи;
- объясняй понятно;
- отвечай кратко и по делу;
- не говори, что ты просто модель.

Пользователь:
${prompt}

Anna:
`,

                stream: false
            })
        }
    );

    const data = await response.json();

    return data.response;
}


module.exports = {
    askAI
};