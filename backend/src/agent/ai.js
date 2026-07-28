// ==========================================
// Anna OS AI Core
// Ollama stable connector
// ==========================================


const http = require("http");


const MODEL = "qwen2.5:7b";


const SYSTEM_PROMPT = `
Ты — Анна.

Ты AI помощник проекта Anna OS.

Пользователь — Евгений.

Отвечай:
- русский язык;
- коротко;
- понятно;
- без внутренних рассуждений.
`;



function ollamaRequest(prompt){


    return new Promise((resolve,reject)=>{


        const body = JSON.stringify({

            model: MODEL,

            prompt,

            stream:false,

            options:{
                temperature:0.3,
                num_predict:80
            }

        });



        const req = http.request(

            {
                hostname:"127.0.0.1",
                port:11434,
                path:"/api/generate",
                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                    "Content-Length":Buffer.byteLength(body)
                },

                timeout:900000

            },


            res=>{


                let data="";


                res.on(
                    "data",
                    chunk=>{
                        data+=chunk;
                    }
                );


                res.on(
                    "end",
                    ()=>{


                        try{


                            const json=JSON.parse(data);

                            resolve(json.response);


                        }

                        catch(e){

                            reject(e);

                        }


                    }
                );


            }

        );



        req.on(
            "timeout",
            ()=>{
                req.destroy();

                reject(
                    new Error(
                        "Ollama timeout"
                    )
                );

            }
        );



        req.on(
            "error",
            reject
        );


        req.write(body);

        req.end();


    });


}




async function askAI(message){


    try{


        console.log("🤖 Anna → Ollama");


        const answer = await ollamaRequest(

`${SYSTEM_PROMPT}


Пользователь:

${message}


Анна:
`

        );


        console.log("✅ Ответ получен");


        return answer;



    }

    catch(err){


        console.error(err);


        return "Ошибка AI: " + err.message;


    }


}



module.exports={
    askAI
};