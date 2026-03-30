import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  PointElement, LineElement, BarElement,
  Title, Tooltip, Legend, Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, LinearScale,
  PointElement, LineElement, BarElement,
  Title, Tooltip, Legend, Filler
);

export default function TicketTrendsChart({ trends }) {
  const data = {
    labels: trends.labels,
    datasets: [
      {
        label: "Tickets Created",
        data: trends.created,
        borderColor: "#1890ff",
        backgroundColor: "rgba(24,144,255,0.08)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#1890ff",
        pointRadius: 5,
      },
      {
        label: "Tickets Resolved",
        data: trends.resolved,
        borderColor: "#52c41a",
        backgroundColor: "rgba(82,196,26,0.08)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#52c41a",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y} tickets`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 2 },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="m-0 text-base font-bold">📈 Ticket Trends — Last 7 Days</h3>
        <span className="text-gray-400 text-xs">Created vs Resolved</span>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

