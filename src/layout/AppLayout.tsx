import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./AppLayout.css";

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      label: "Home",
      icon: "🏠",
      path: "/",
    },
    {
      label: "Explore",
      icon: "🗺️",
      path: "/explore",
    },
    {
      label: "Pick",
      icon: "🎲",
      path: "/pick",
    },
    {
      label: "Favorites",
      icon: "❤️",
      path: "/favorites",
    },
    {
      label: "Profile",
      icon: "👤",
      path: "/profile",
    },
  ];

  return (
    <div className="app-layout">
      <main className="app-content">
        <Outlet />
      </main>

      <nav className="bottom-nav">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            className={
              location.pathname === tab.path ? "nav-item active" : "nav-item"
            }
            onClick={() => navigate(tab.path)}
          >
            <span className="nav-icon">{tab.icon}</span>

            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
