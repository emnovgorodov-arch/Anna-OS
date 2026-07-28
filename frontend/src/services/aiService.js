// ==========================================
// Anna OS Frontend AI Service
// ==========================================


export async function askAnna(message) {

    try {


        const response = await fetch(
            "http://localhost:3000/api/ai",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    task: message
                })

            }
        );



        const data = await response.json();



        console.log("Ответ Anna OS:");
        console.log(data);



        // Возвращаем только ответ Анны
        return data.answer || "Анна не получила ответ.";



    }


    catch (err) {


        console.error("Ошибка связи с Anna OS:");

        console.error(err);



        return "Анна не смогла подключиться к серверу.";

    }

}