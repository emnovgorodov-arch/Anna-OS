import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Telegram from "./pages/Telegram";
import AI from "./pages/AI";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Instagram from "./pages/Instagram";
import VK from "./pages/VK";

import "./App.css";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/telegram" element={<Telegram />} />
            <Route path="/instagram" element={<Instagram />} />
            <Route path="/vk" element={<VK />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    );
}