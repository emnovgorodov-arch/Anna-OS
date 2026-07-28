export async function askAnna(message) {

  try {

    const response = await fetch(
      "http://localhost:3000/ask",
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

    return data.answer;

  } catch (error) {

    console.log(error);

    return "Anna AI не удалось подключиться 🤖";

  }

}