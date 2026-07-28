import MainLayout from "../components/layout/MainLayout";

const clients = [
  {
    id: 1,
    name: "Алексей Петров",
    phone: "+7 999 111-22-33",
    source: "Telegram",
    status: "Новый",
  },
  {
    id: 2,
    name: "Мария Иванова",
    phone: "+7 999 222-33-44",
    source: "Avito",
    status: "В работе",
  },
  {
    id: 3,
    name: "Сергей Смирнов",
    phone: "+7 999 333-44-55",
    source: "Telegram",
    status: "Клиент",
  },
];


export default function Clients(){

return (

<MainLayout>


<h1 className="text-3xl font-bold mb-8">
👥 Клиенты
</h1>


<div className="bg-white text-gray-900 rounded-2xl p-6 shadow">


<input
className="w-full p-3 border rounded-xl mb-6"
placeholder="🔍 Поиск клиента"
/>


<table className="w-full">


<thead>

<tr className="text-left border-b">

<th className="p-3">
Имя
</th>

<th>
Телефон
</th>

<th>
Источник
</th>

<th>
Статус
</th>

</tr>

</thead>


<tbody>


{
clients.map(client=>(

<tr 
key={client.id}
className="border-b hover:bg-gray-100"
>


<td className="p-3 font-bold">
{client.name}
</td>


<td>
{client.phone}
</td>


<td>
{client.source}
</td>


<td>

<span className="
px-3 py-1 
rounded-full
bg-blue-100
text-blue-700
">

{client.status}

</span>

</td>


</tr>

))
}


</tbody>


</table>


</div>


</MainLayout>

);

}
