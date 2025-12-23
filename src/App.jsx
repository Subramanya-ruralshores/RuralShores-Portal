import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PublicLayout from './pages/PublicLayout';
import AdminLayout from './pages/AdminLayout';
import EmployeeLayout from './pages/EmployeeLayout';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Careers from './pages/Careers';
import ExecutiveTeam from './pages/ExecutiveTeam';
import OurCenters from './pages/OurCenters';
import NewsRoom from './pages/NewsRoom';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import GenAI from './pages/GenAI';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageServices from './pages/admin/ManageServices';
import ManageCareers from './pages/admin/ManageCareers';
import ManageEmployees from './pages/admin/ManageEmployees';
import ManageLeaves from './pages/admin/ManageLeaves';
import ManageTickets from './pages/admin/ManageTickets';

// Employee Pages
import EmployeeDashboard from './pages/employee/Dashboard';
import Payroll from './pages/employee/Payroll';
import Leaves from './pages/employee/Leaves';
import Profile from './pages/employee/Profile';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/executive-team" element={<ExecutiveTeam />} />
              <Route path="/centers" element={<OurCenters />} />
              <Route path="/newsroom" element={<NewsRoom />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/gen-ai" element={<GenAI />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute role="ADMIN">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminDashboard />} />
              <Route path="help-requests" element={<AdminDashboard />} />
              <Route path="services" element={<ManageServices />} />
              <Route path="support-tickets" element={<ManageTickets />} />
            </Route>

            {/* Employee Routes */}
            <Route path="/employee" element={
              <ProtectedRoute role="EMPLOYEE">
                <EmployeeLayout />
              </ProtectedRoute>
            }>
              <Route index element={<EmployeeDashboard />} />
              <Route path="payroll" element={<Payroll />} />
              <Route path="leaves" element={<Leaves />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
