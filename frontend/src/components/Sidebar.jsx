import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Dashboard",      path: "/dashboard", icon: "📊", roles: ["Admin", "Agent", "User"] },
  { label: "Tickets",        path: "/tickets",   icon: "🎫", roles: ["Admin", "Agent", "User"] },
  { label: "Knowledge Base", path: "/faq",       icon: "📚", roles: ["Admin", "Agent", "User"] },
  { label: "Analytics",      path: "/dashboard", icon: "📈", roles: ["Admin", "Agent"] },
];

export default function Sidebar({ isOpen, onClose }) {
  // ✅ FIX: removed duplicate useAuth() call — only declare once
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "User";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const visibleItems = navItems.filter(item => item.roles.includes(role));

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-30 flex flex-col
        sidebar-transition
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎧</span>
            <span className="text-lg font-bold tracking-tight">HelpDesk</span>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white text-xl" onClick={onClose}>✕</button>
        </div>

        <div className="px-5 py-3 border-b border-gray-700">
          <span className="text-xs text-gray-400">Logged in as</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
              {role[0]}
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">
                {user?.username ?? "user"}
              </p>
              <span className={`text-xs font-bold ${
                role === "Admin" ? "text-yellow-400"
                : role === "Agent" ? "text-blue-400"
                : "text-green-400"
              }`}>
                {role}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {visibleItems.map(item => (
            <NavLink
              key={item.path + item.label}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>
    </>
  );
}