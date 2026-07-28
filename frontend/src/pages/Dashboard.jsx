import MainLayout from "../components/layout/MainLayout";
import StatCard from "../components/dashboard/StatCard";
import Analytics from "../components/dashboard/Analytics";

export default function Dashboard() {
  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-8">
        📊 Панель управления
      </h1>


      <div className="grid grid-cols-4 gap-6">

        <StatCard
          title="Клиенты"
          value="125"
          icon="👥"
          color="#2563eb"
        />

        <StatCard
          title="Telegram"
          value="6"
          icon="💬"
          color="#0891b2"
        />

        <StatCard
          title="Avito"
          value="32"
          icon="🛒"
          color="#7c3aed"
        />

        <StatCard
          title="AI ответы"
          value="14"
          icon="🤖"
          color="#16a34a"
        />

      </div>


      {/* Аналитика */}
      <Analytics />


      <div className="mt-10 bg-white text-gray-900 rounded-2xl p-6 shadow">

        <h2 className="text-xl font-bold mb-4">
          Последние события
        </h2>

        <div className="space-y-3">

          <div>
            👤 Новый клиент добавлен
          </div>

          <div>
            💬 Получено сообщение Telegram
          </div>

          <div>
            🤖 AI подготовил ответ
          </div>

        </div>

      </div>


    </MainLayout>
  );
}