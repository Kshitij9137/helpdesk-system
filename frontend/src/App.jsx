import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TicketList from "./pages/TicketList";
import TicketDetail from "./pages/TicketDetail";
import CreateTicket from "./pages/CreateTicket";
import EditTicket from "./pages/EditTicket";
import ProtectedRoute from "./components/ProtectedRoute";
import FAQList from "./pages/faq/FAQList";
import FAQDetail from "./pages/faq/FAQDetail";
import CreateFAQ from "./pages/faq/CreateFAQ";
import EditFAQ from "./pages/faq/EditFAQ";
import Layout from "./components/Layout";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* All ticket routes are protected and wrapped in Layout */}
          <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/tickets" element={<ProtectedRoute><Layout><TicketList /></Layout></ProtectedRoute>} />
          <Route path="/tickets/create" element={<ProtectedRoute><Layout><CreateTicket /></Layout></ProtectedRoute>} />
          <Route path="/tickets/:id" element={<ProtectedRoute><Layout><TicketDetail /></Layout></ProtectedRoute>} />
          <Route path="/tickets/:id/edit" element={<ProtectedRoute><Layout><EditTicket /></Layout></ProtectedRoute>} />

          <Route path="/faq" element={<ProtectedRoute><Layout><FAQList /></Layout></ProtectedRoute>} />
          <Route path="/faq/create" element={<ProtectedRoute><Layout><CreateFAQ /></Layout></ProtectedRoute>} />
          <Route path="/faq/:id" element={<ProtectedRoute><Layout><FAQDetail /></Layout></ProtectedRoute>} />
          <Route path="/faq/:id/edit" element={<ProtectedRoute><Layout><EditFAQ /></Layout></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}