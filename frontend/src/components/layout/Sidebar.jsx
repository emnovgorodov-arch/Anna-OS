import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        background: "#111827",
        color: "white",
        minHeight: "calc(100vh - 70px)",
        padding: "20px",
      }}
    >
      <h2>Меню</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "25px",
        }}
      >
        <Link to="/">🏠 Dashboard</Link>
        <Link to="/clients">👥 Клиенты</Link>
        <Link to="/telegram">💬 Telegram</Link>
        <Link to="/avito">🛒 Avito</Link>
        <Link to="/analytics">📊 Аналитика</Link>
        <Link to="/ai">🤖 AI</Link>
        <Link to="/settings">⚙ Настройки</Link>
      </nav>
    </aside>
  );
}