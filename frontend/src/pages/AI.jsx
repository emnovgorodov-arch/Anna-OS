import MainLayout from "../components/layout/MainLayout";
import AIChat from "../components/ai/AIChat";


export default function AI() {

return (

<MainLayout>


<h1 className="text-3xl font-bold mb-8">
🤖 AI Центр
</h1>


<div className="bg-white text-gray-900 rounded-2xl p-8 mb-8">


<h2 className="text-xl font-bold mb-4">
AI помощник Anna
</h2>


<p>
Управление искусственным интеллектом платформы:
</p>


<ul className="mt-4 space-y-2">

<li>
🤖 Автоответы клиентам
</li>

<li>
🧠 Анализ сообщений
</li>

<li>
📊 Генерация отчётов
</li>

</ul>


</div>


<AIChat />


</MainLayout>

);

}