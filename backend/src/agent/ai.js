// ==========================================
// Anna OS AI Core v0.1.2
// Minimal Ollama Connector
// ==========================================


const axios = require("axios");


const OLLAMA_URL =
    "http://localhost:11434/api/generate";


const MODEL =
    "qwen2.5:7b";



async function askAI(prompt) {


    console.log("================================");
    console.log("🤖 AI CORE");
    console.log("MODEL:", MODEL);
    console.log("================================");


    try {


        const response = await axios.post(

            OLLAMA_URL,

            {

                model: MODEL,

                prompt: String(prompt),

                stream: false,

                options: {

                    temperature: 0.3,

                    num_predict: 100

                }

            },

            {

                timeout: 300000

            }

        );


        console.log("✅ OLLAMA RESPONSE");


        return response.data.response;



    } catch(error) {


        console.log("🚨 OLLAMA ERROR");

        console.log(error.message);


        return "Анна OS: ошибка связи с AI моделью.";

    }


}



module.exports = {

    askAI

};