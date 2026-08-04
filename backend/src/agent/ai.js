// ==========================================
// Anna OS AI Core v0.1.3
// Ollama Connector
// ==========================================

const http = require("http");

const OLLAMA_HOST = "127.0.0.1";
const OLLAMA_PORT = 11434;

const MODEL = "qwen2.5:7b";


// ==========================================
// ASK AI
// ==========================================

async function askAI(prompt) {

    console.log("================================");
    console.log("🤖 AI CORE");
    console.log("MODEL:", MODEL);
    console.log("================================");


    const data = JSON.stringify({

        model: MODEL,

        prompt: String(prompt),

        stream: false,

        options: {

            temperature: 0.3,

            num_predict: 100

        }

    });



    return new Promise((resolve) => {


        const request = http.request(

            {

                hostname: OLLAMA_HOST,

                port: OLLAMA_PORT,

                path: "/api/generate",

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Content-Length":
                        Buffer.byteLength(data)

                }

            },


            (response) => {


                let body = "";


                response.on(
                    "data",
                    chunk => body += chunk
                );


                response.on(
                    "end",
                    () => {


                        try {


                            const result =
                                JSON.parse(body);


                            console.log(
                                "✅ OLLAMA RESPONSE"
                            );


                            resolve(
                                result.response
                            );


                        } catch(error) {


                            console.log(
                                "🚨 JSON ERROR"
                            );


                            resolve(
                                "Anna OS: ошибка обработки ответа Ollama."
                            );

                        }


                    }
                );


            }


        );


        // Ошибка соединения

        request.on(
            "error",
            error => {

                console.log(
                    "🚨 OLLAMA ERROR"
                );

                console.log(
                    error.message
                );


                resolve(
                    "Anna OS: ошибка связи с AI моделью."
                );

            }
        );


        // Большой таймаут для первой загрузки модели

        request.setTimeout(
            900000,
            () => {

                console.log(
                    "🚨 OLLAMA TIMEOUT"
                );


                resolve(
                    "Anna OS: AI модель отвечает слишком долго."
                );

            }
        );


        console.log(
            "📡 REQUEST SENT"
        );


        request.write(data);

        request.end();


    });

}



module.exports = {

    askAI

};