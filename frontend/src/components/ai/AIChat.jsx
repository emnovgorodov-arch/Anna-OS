import { useState } from "react";
import { askAnna } from "../../services/aiService";


export default function AIChat() {


  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Привет! Я Anna AI 🤖 Чем могу помочь?"
    }
  ]);


  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);



  async function sendMessage(){

    if(!input.trim()) return;


    const question = input;


    setMessages(prev => [
      ...prev,
      {
        role:"user",
        text:question
      }
    ]);


    setInput("");
    setLoading(true);



    const answer = await askAnna(question);



    setMessages(prev => [
      ...prev,
      {
        role:"ai",
        text:answer
      }
    ]);


    setLoading(false);

  }



return (

<div className="bg-white text-gray-900 rounded-2xl p-6 shadow">


<h2 className="text-xl font-bold mb-5">
💬 Anna AI Chat
</h2>



<div className="space-y-4 mb-6">


{
messages.map((msg,index)=>(

<div
key={index}
className={
msg.role==="user"
?
"text-right"
:
"text-left"
}
>


<span
className={
msg.role==="user"
?
"bg-blue-600 text-white px-4 py-3 rounded-xl inline-block"
:
"bg-gray-200 px-4 py-3 rounded-xl inline-block"
}
>

{msg.text}

</span>


</div>

))
}



{
loading &&
<div>
<span className="bg-gray-200 px-4 py-3 rounded-xl">
Anna печатает 🤖
</span>
</div>
}



</div>



<div className="flex gap-3">


<input

value={input}

onChange={(e)=>setInput(e.target.value)}

onKeyDown={(e)=>{
if(e.key==="Enter"){
sendMessage();
}
}}

placeholder="Напишите сообщение Anna..."

className="flex-1 border rounded-xl p-3"

/>



<button

onClick={sendMessage}

className="bg-blue-600 text-white px-6 rounded-xl"

>

Отправить

</button>


</div>


</div>

);


}