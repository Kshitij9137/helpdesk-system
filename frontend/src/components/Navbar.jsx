import { useNavigate } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10 shadow-sm">

      {/* Left — hamburger (mobile only) */}
      <button
        className="lg:hidden text-gray-500 hover:text-gray-800 text-2xl leading-none"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Center title on mobile, left on desktop */}
      <h1 className="text-base font-semibold text-gray-700 lg:ml-0 ml-auto mr-auto lg:mr-0">
        Helpdesk System
      </h1>

      {/* Right — quick actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/tickets/create")}
          className="hidden sm:flex items-center gap-1.5 bg-primary text-white text-sm px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <span>＋</span> New Ticket
        </button>

        {/* Notification bell — placeholder for now */}
        <button className="text-gray-400 hover:text-gray-700 text-xl relative">
          🔔
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </header>
  );
}