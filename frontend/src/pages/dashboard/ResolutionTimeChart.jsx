import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ResolutionTimeChart({ resolutionData }) {
  const data = {
    labels: resolutionData.labels,
    datasets: [
      {
        label: "Avg Resolution Time (hrs)",
        data: resolutionData.avgHours,
        backgroundColor: [
          "rgba(82,196,26,0.75)",
          "rgba(250,173,20,0.75)",
          "rgba(255,122,69,0.75)",
          "rgba(245,34,45,0.75)",
        ],
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "SLA Target (hrs)",
        data: resolutionData.slaTargets,
        backgroundColor: "rgba(0,0,0,0.08)",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y} hrs`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Hours" },
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
        <h3 style={styles.title}>⏱️ Avg Resolution Time by Priority</h3>
        <span style={styles.subtitle}>vs SLA Target</span>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
}

const styles = {
  card: { background: "white", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", marginBottom: "1.5rem" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" },
  title: { margin: 0, fontSize: "1rem", fontWeight: "700" },
  subtitle: { color: "#aaa", fontSize: "0.85rem" },
};