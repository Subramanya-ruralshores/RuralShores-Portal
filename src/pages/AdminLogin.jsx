import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, User, HelpCircle, Shield, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth(); // Assuming same auth logic, backend handles roles or separate admin endpoint
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/admin'); // Redirect to admin dashboard
        } catch (err) {
            setError(err.message || 'Invalid admin credentials');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 20px 40px'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    display: 'flex',
                    background: 'var(--bg-card)',
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '800px',
                    minHeight: '500px',
                    position: 'relative',
                    border: '1px solid var(--border)'
                }}
            >
                {/* Left Sidebar / Navigation Panel */}
                <div style={{
                    width: '320px',
                    background: 'var(--bg-soft)',
                    padding: '40px 30px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid var(--border)',
                    position: 'relative'
                }}>


                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                        <Link to="/login" style={{
                            padding: '15px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            transition: 'background 0.2s',
                            opacity: 0.7
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', color: 'var(--text-main)', fontWeight: '600' }}>
                                <User size={20} /> User Login
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', paddingLeft: '30px' }}>
                                Access user portal
                            </div>
                        </Link>

                        <Link to="/contact" style={{
                            padding: '15px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            transition: 'background 0.2s',
                            opacity: 0.7
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', color: 'var(--text-main)', fontWeight: '600' }}>
                                <HelpCircle size={20} /> Help & Support
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', paddingLeft: '30px' }}>
                                Need assistance?
                            </div>
                        </Link>

                        <div style={{
                            padding: '15px',
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                            borderLeft: '4px solid var(--primary)' // Distinct highlight for Admin
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', color: 'var(--primary)', fontWeight: '700' }}>
                                <Shield size={20} /> Admin Login
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', paddingLeft: '30px' }}>
                                Management console
                            </div>
                        </div>

                    </div>

                    <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: 'var(--text-light)', textAlign: 'center' }}>
                        &copy; 2025 RuralShores
                    </div>
                </div>

                {/* Right Content / Form Panel */}
                <div style={{ flex: 1, padding: '30px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '6px 12px',
                            background: '#dbeafe',
                            color: '#1e40af',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            marginBottom: '15px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Restricted Area
                        </div>
                        <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '10px' }}>Admin Portal</h2>
                        <p style={{ color: 'var(--text-light)' }}>Secure access for management</p>
                    </div>

                    {error && <div style={{
                        padding: '12px',
                        background: '#fee2e2',
                        color: '#ef4444',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '0.9rem'
                    }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>Admin Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@ruralshores.com"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 12px 12px 45px',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)',
                                        background: 'var(--bg-main)',
                                        color: 'var(--text-main)',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 12px 12px 45px',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)',
                                        background: 'var(--bg-main)',
                                        color: 'var(--text-main)',
                                        outline: 'none',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                padding: '14px',
                                borderRadius: '12px',
                                background: '#0f172a', // Darker for admin
                                borderColor: '#0f172a'
                            }}
                        >
                            Access Dashboard <ArrowRight size={18} />
                        </button>
                    </form>

                    <div style={{ marginTop: '20px', padding: '15px', background: '#f8fafc', borderRadius: '10px', fontSize: '0.8rem', color: '#64748b' }}>
                        <strong style={{ display: 'block', marginBottom: '5px' }}>Security Notice:</strong>
                        All administrative actions are logged and monitored. Unauthorized access attempts will be reported.
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
