export default function AgentStatsTable({ agents }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="m-0 mb-4 text-base font-bold">👤 Agent Performance</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2.5 text-left font-bold text-xs text-gray-500 border-b-2 border-gray-200">Agent</th>
            <th className="p-2.5 text-left font-bold text-xs text-gray-500 border-b-2 border-gray-200">Tickets Resolved</th>
            <th className="p-2.5 text-left font-bold text-xs text-gray-500 border-b-2 border-gray-200">Avg Resolution Time</th>
            <th className="p-2.5 text-left font-bold text-xs text-gray-500 border-b-2 border-gray-200">Performance</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 text-sm border-b border-gray-100">🧑‍💼 {agent.name}</td>
              <td className="p-3 text-sm border-b border-gray-100 text-center font-bold text-green-500">
                {agent.resolved}
              </td>
              <td className="p-3 text-sm border-b border-gray-100 text-center">
                {agent.avg_hours} hrs
              </td>
              <td className="p-3 text-sm border-b border-gray-100 text-center">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold" style={{
                  background: agent.avg_hours <= 4 ? "#f6ffed" : agent.avg_hours <= 8 ? "#fffbe6" : "#fff2e8",
                  color: agent.avg_hours <= 4 ? "#52c41a" : agent.avg_hours <= 8 ? "#faad14" : "#ff4d4f",
                }}>
                  {agent.avg_hours <= 4 ? "🟢 Excellent" : agent.avg_hours <= 8 ? "🟡 Good" : "🔴 Needs Improvement"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

