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
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.title}>📈 Ticket Trends — Last 7 Days</h3>
        <span style={styles.subtitle}>Created vs Resolved</span>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

const styles = {
  card: { background: "white", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", marginBottom: "1.5rem" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" },
  title: { margin: 0, fontSize: "1rem", fontWeight: "700" },
  subtitle: { color: "#aaa", fontSize: "0.85rem" },
};