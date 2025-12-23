import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    User,
    CreditCard,
    Calendar,
    LogOut,
    Bell,
    Search,
    Settings,
    Menu,
    X,
    ChevronRight,
    Home
} from 'lucide-react';

const EmployeeLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const sidebarItems = [
        { path: '/employee', icon: Home, label: 'Dashboard' },
        { path: '/employee/profile', icon: User, label: 'My Profile' },
        { path: '/employee/payroll', icon: CreditCard, label: 'Payroll & Payslips' },
        { path: '/employee/leaves', icon: Calendar, label: 'Leave Management' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#F8FAFC',
            color: '#1E293B',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Animated Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? '280px' : '80px' }}
                style={{
                    background: '#0F172A',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px 16px',
                    position: 'fixed',
                    height: '100vh',
                    zIndex: 1000,
                    boxShadow: '10px 0 30px rgba(0,0,0,0.05)',
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                {/* Logo Area */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isSidebarOpen ? 'space-between' : 'center',
                    marginBottom: '40px',
                    padding: '0 8px'
                }}>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                        >
                            <div style={{ background: 'white', padding: '5px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                                <img src="https://www.ruralshores.com/pic/Logo%20580x236.png" style={{ height: '24px' }} alt="Logo" />
                            </div>
                            <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-1px' }}>PORTAL</span>
                        </motion.div>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '8px', borderRadius: '8px' }}
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Nav Links */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '14px 16px',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                color: isActive(item.path) ? 'white' : '#94A3B8',
                                background: isActive(item.path) ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' : 'transparent',
                                transition: 'all 0.2s ease',
                                justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                                position: 'relative',
                                boxShadow: isActive(item.path) ? '0 10px 20px rgba(37, 99, 235, 0.2)' : 'none'
                            }}
                        >
                            <item.icon size={22} />
                            {isSidebarOpen && (
                                <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>{item.label}</span>
                            )}
                            {isActive(item.path) && isSidebarOpen && (
                                <motion.div layoutId="active-indicator" style={{ marginLeft: 'auto' }}>
                                    <ChevronRight size={16} />
                                </motion.div>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#F87171',
                            border: 'none',
                            cursor: 'pointer',
                            justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                            transition: 'all 0.2s',
                            width: '100%'
                        }}
                    >
                        <LogOut size={22} />
                        {isSidebarOpen && <span style={{ fontWeight: '600' }}>Sign Out</span>}
                    </button>

                    {isSidebarOpen && (
                        <div style={{
                            marginTop: '20px',
                            padding: '16px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                            }}>
                                {user?.email?.[0].toUpperCase() || 'E'}
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'white', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    {user?.email || 'Employee'}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Verified Team</div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main style={{
                flex: 1,
                marginLeft: isSidebarOpen ? '280px' : '80px',
                transition: 'margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: '40px'
            }}>
                {/* Top Headers */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '40px'
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0F172A' }}>Enterprise Workplace</h2>
                        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Welcome back to the RuralShores operational hub.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                style={{
                                    padding: '10px 15px 10px 40px',
                                    borderRadius: '10px',
                                    border: '1px solid #E2E8F0',
                                    background: 'white',
                                    outline: 'none',
                                    width: '250px'
                                }}
                            />
                        </div>
                        <button style={{ background: 'white', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '10px', color: '#64748B', cursor: 'pointer' }}>
                            <Bell size={20} />
                        </button>
                        <button style={{ background: 'white', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '10px', color: '#64748B', cursor: 'pointer' }}>
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                <Outlet />
            </main>
        </div>
    );
};

export default EmployeeLayout;
