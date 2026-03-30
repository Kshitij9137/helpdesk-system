const cards = [
  { label: "Total Tickets",   key: "total",       color: "#1890ff", bg: "#e6f4ff", icon: "🎫" },
  { label: "Open",            key: "open",        color: "#ff7a45", bg: "#fff2e8", icon: "🔴" },
  { label: "In Progress",     key: "in_progress", color: "#faad14", bg: "#fffbe6", icon: "🟡" },
  { label: "Resolved",        key: "resolved",    color: "#52c41a", bg: "#f6ffed", icon: "🟢" },
  { label: "Closed",          key: "closed",      color: "#8c8c8c", bg: "#f5f5f5", icon: "⚫" },
];

export default function SummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mb-8">
      {cards.map(card => (
        <div key={card.key} className="rounded-lg p-5 shadow-sm" style={{ borderTop: `4px solid ${card.color}`, background: card.bg }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl">{card.icon}</span>
            <span className="text-2xl font-extrabold leading-none" style={{ color: card.color }}>
              {summary[card.key] ?? 0}
            </span>
          </div>
          <p className="m-0 text-gray-600 font-semibold text-xs">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

