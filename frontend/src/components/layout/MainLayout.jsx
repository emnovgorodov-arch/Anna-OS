import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

export default function MainLayout({ children }) {
  return (
    <div className="layout">

      <aside className="sidebar">

        <div className="logo">
          Anna OS
        </div>

        <div className="menu">

          <Link to="/">🏠 Dashboard</Link>

          <Link to="/clients">👥 Клиенты</Link>

          <Link to="/telegram">💬 Telegram</Link>

          <Link to="/avito">🛒 Avito</Link>

          <Link to="/analytics">📈 Аналитика</Link>

          <Link to="/ai">🤖 AI</Link>

          <Link to="/settings">⚙ Настройки</Link>

        </div>

      </aside>

      <div className="content">

        <div className="header">

          <h2>Anna OS Business Platform</h2>

          <div>
            👤 Евгений
          </div>

        </div>

        <div className="page">

          {children}

        </div>

      </div>

    </div>
  );
}