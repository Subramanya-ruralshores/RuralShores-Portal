import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, MessageSquare, LogOut, Shield } from 'lucide-react';
import Notifications from '../components/Notifications';


const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                background: 'var(--bg-card)',
                borderRight: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                padding: '24px',
                position: 'fixed',
                height: '100vh',
                overflowY: 'auto'
            }}>
                {/* Logo */}
                <div style={{ marginBottom: '32px', paddingLeft: '8px' }}>
                    <img
                        src="https://www.ruralshores.com/pic/Logo%20580x236.png"
                        alt="RuralShores"
                        style={{ height: '40px', marginBottom: '16px', objectFit: 'contain' }}
                    />
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>Admin Panel</div>
                </div>

                {/* Profile Section */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '40px',
                    padding: '12px',
                    background: 'var(--bg-soft)',
                    borderRadius: '12px'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '700'
                    }}>
                        SA
                    </div>
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>Super Admin</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Administrator</div>
                    </div>
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '12px' }}>
                        Admin Panel
                    </div>

                    <Link to="/admin" style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        color: isActive('/admin') ? 'white' : 'var(--text-main)',
                        background: isActive('/admin') ? 'var(--primary)' : 'transparent',
                        fontWeight: '500',
                        fontSize: '0.95rem'
                    }}>
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>

                    <Link to="/admin/users" style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        color: isActive('/admin/users') ? 'white' : 'var(--text-main)',
                        background: isActive('/admin/users') ? 'var(--primary)' : 'transparent',
                        fontWeight: '500',
                        fontSize: '0.95rem'
                    }}>
                        <Users size={18} /> Users
                    </Link>

                    <Link to="/admin/support-tickets" style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        color: isActive('/admin/support-tickets') ? 'white' : 'var(--text-main)',
                        background: isActive('/admin/support-tickets') ? 'var(--primary)' : 'transparent',
                        fontWeight: '500',
                        fontSize: '0.95rem'
                    }}>
                        <MessageSquare size={18} /> Support Tickets
                    </Link>

                    <Link to="/admin/services" style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        color: isActive('/admin/services') ? 'white' : 'var(--text-main)',
                        background: isActive('/admin/services') ? 'var(--primary)' : 'transparent',
                        fontWeight: '500',
                        fontSize: '0.95rem'
                    }}>
                        <Shield size={18} /> Manage Services
                    </Link>
                </div>

                {/* Footer / Logout */}
                <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            width: '100%',
                            padding: '12px',
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            fontWeight: '500'
                        }}
                    >
                        <LogOut size={18} /> Logout
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <Shield size={12} /> Admin Portal
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                <header style={{
                    padding: '20px 40px',
                    background: 'white',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <Notifications />
                </header>
                <div style={{ padding: '40px', flex: 1, overflowY: 'auto' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
