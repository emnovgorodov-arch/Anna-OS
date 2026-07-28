export default function StatCard({ title, value, icon, color }) {
  return (
    <div
      className="rounded-2xl p-6 text-white shadow-lg"
      style={{ background: color }}
    >
      <div className="text-4xl">
        {icon}
      </div>

      <div className="mt-4 text-sm opacity-80">
        {title}
      </div>

      <div className="text-4xl font-bold mt-2">
        {value}
      </div>
    </div>
  );
}