export const mockFAQs = [
  {
    id: 1,
    question: "How do I reset my password?",
    answer: "Go to the login page and click 'Forgot Password'. Enter your email address and we'll send you a reset link within a few minutes. Check your spam folder if you don't see it.",
    category: "Account",
    tags: ["password", "login", "reset"],
  },
  {
    id: 2,
    question: "How do I create a new support ticket?",
    answer: "After logging in, navigate to the Tickets section from the sidebar and click the '+ New Ticket' button. Fill in the title, description, and priority level, then submit.",
    category: "Tickets",
    tags: ["ticket", "create", "support"],
  },
  {
    id: 3,
    question: "What do the different ticket priority levels mean?",
    answer: "Low: Minor issues with no urgency. Medium: Issues affecting workflow but have a workaround. High: Significant issues affecting productivity. Critical: System is down or data loss is occurring.",
    category: "Tickets",
    tags: ["priority", "ticket", "levels"],
  },
  {
    id: 4,
    question: "How do I update my profile information?",
    answer: "Click on your avatar in the top-right corner and select 'Profile Settings'. From there you can update your name, email, and profile picture.",
    category: "Account",
    tags: ["profile", "settings", "account"],
  },
  {
    id: 5,
    question: "Who can see my tickets?",
    answer: "Your tickets are visible to you, assigned agents, and admins. Other regular users cannot see your tickets.",
    category: "Privacy",
    tags: ["tickets", "privacy", "visibility"],
  },
  {
    id: 6,
    question: "How long does it take to resolve a ticket?",
    answer: "Resolution time depends on priority. Critical tickets are addressed within 1 hour, High within 4 hours, Medium within 24 hours, and Low within 72 hours.",
    category: "Tickets",
    tags: ["resolution", "time", "sla"],
  },
];

export const faqCategories = ["All", "Account", "Tickets", "Privacy"];