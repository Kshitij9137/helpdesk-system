// Summary counts
export const mockSummary = {
  open: 18,
  in_progress: 7,
  resolved: 43,
  closed: 29,
  total: 97,
};

// Ticket trends — last 7 days
export const mockTicketTrends = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  created: [8, 12, 5, 14, 9, 3, 6],
  resolved: [5, 10, 7, 11, 8, 2, 4],
};

// Average resolution time in hours per priority
export const mockResolutionTime = {
  labels: ["Low", "Medium", "High", "Critical"],
  avgHours: [68, 21, 5, 1.2],
  // SLA targets in hours
  slaTargets: [72, 24, 4, 1],
};

// Agent performance
export const mockAgentStats = [
  { name: "Agent A", resolved: 24, avg_hours: 3.2 },
  { name: "Agent B", resolved: 18, avg_hours: 5.8 },
  { name: "Agent C", resolved: 12, avg_hours: 8.1 },
];