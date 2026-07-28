export default function Analytics(){

return (

<div className="mt-10 grid grid-cols-3 gap-6">


<div className="bg-white text-gray-900 rounded-2xl p-6 shadow">

<h2 className="text-xl font-bold mb-4">
📈 Клиенты за месяц
</h2>

<div className="text-5xl font-bold text-blue-600">
+48
</div>

<p className="mt-2 text-gray-500">
Новых клиентов
</p>

</div>



<div className="bg-white text-gray-900 rounded-2xl p-6 shadow">

<h2 className="text-xl font-bold mb-4">
💬 Telegram
</h2>

<div className="text-5xl font-bold text-cyan-600">
246
</div>

<p className="mt-2 text-gray-500">
Сообщений обработано
</p>

</div>



<div className="bg-white text-gray-900 rounded-2xl p-6 shadow">

<h2 className="text-xl font-bold mb-4">
🤖 AI
</h2>

<div className="text-5xl font-bold text-green-600">
89%
</div>

<p className="mt-2 text-gray-500">
Автоматических ответов
</p>

</div>


</div>

)

}