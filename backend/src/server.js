require("dotenv").config();


const express = require("express");
const cors = require("cors");


// Подключаем ядро Анны
const { runAnna } = require("./agent/core");



const app = express();



app.use(cors());

app.use(express.json());





// Проверка сервера

app.get("/", (req,res)=>{


    res.send(`

        <h1>🚀 Анна OS работает</h1>

        <p>Backend запущен успешно</p>

        <p>AI Core активен</p>

    `);


});






// Главный API Анны

app.post("/api/ai", async(req,res)=>{


    try {


        const task =
    req.body.task ||
    req.body.message;

console.log("================================");
console.log("BODY:", req.body);
console.log("TASK:", task);
console.log("================================");



        if(!task){


            return res.status(400).json({

                answer:
                "Пустой запрос."

            });


        }




        // Передаем задачу ядру Анны

        const result =
        await runAnna(task);




        res.json(result);



    }


    catch(error){


        console.log(
            "🚨 Ошибка Анна OS Core"
        );


        console.log(error);



        res.status(500).json({

            answer:
            "Ошибка ядра Анны."

        });


    }


});







app.listen(3000,()=>{


    console.log("==============================");

    console.log(
        "🚀 Анна OS запущена"
    );

    console.log(
        "AI Core активен"
    );

    console.log(
        "http://localhost:3000"
    );


    console.log("==============================");


});