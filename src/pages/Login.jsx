import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, User, HelpCircle, Shield, Chrome, ArrowRight, CheckSquare, Square } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    // Check for redirected state
    const [successMessage, setSuccessMessage] = useState(location.state?.message || '');
    const initialEmail = location.state?.email || '';

    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user.role === 'ADMIN') navigate('/admin');
            else if (user.role === 'EMPLOYEE') navigate('/employee');
            else navigate('/');
        } catch (err) {
            setError(err.message || 'Invalid credentials');
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
                        <div style={{
                            padding: '15px',
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                            borderLeft: '4px solid var(--secondary)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', color: 'var(--primary)', fontWeight: '700' }}>
                                <User size={20} /> User Login
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', paddingLeft: '30px' }}>
                                Access your account
                            </div>
                        </div>

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

                        <Link to="/admin/login" style={{
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
                                <Shield size={20} /> Admin Login
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', paddingLeft: '30px' }}>
                                Management console
                            </div>
                        </Link>
                    </div>

                    <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: 'var(--text-light)', textAlign: 'center' }}>
                        &copy; 2025 RuralShores
                    </div>
                </div>

                {/* Right Content / Form Panel */}
                <div style={{ flex: 1, padding: '30px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '10px' }}>Welcome back</h2>
                        <p style={{ color: 'var(--text-light)' }}>Please enter your details to sign in</p>
                    </div>

                    {error && <div style={{
                        padding: '12px',
                        background: '#fee2e2',
                        color: '#ef4444',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '0.9rem'
                    }}>{error}</div>}

                    {successMessage && <div style={{
                        padding: '12px',
                        background: '#dcfce7',
                        color: '#16a34a',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '0.9rem'
                    }}>{successMessage}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
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

                        <div style={{ marginBottom: '25px' }}>
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

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <div
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                onClick={() => setRememberMe(!rememberMe)}
                            >
                                {rememberMe ? <CheckSquare size={18} color="var(--secondary)" /> : <Square size={18} color="var(--text-light)" />}
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Remember me</span>
                            </div>
                            <a href="#" style={{ fontSize: '0.9rem', color: 'var(--secondary)', textDecoration: 'none', fontWeight: '600' }}>Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center', padding: '14px', borderRadius: '12px' }}
                        >
                            Sign In
                        </button>
                    </form>

                    <div style={{ margin: '30px 0', textAlign: 'center', position: 'relative' }}>
                        <span style={{ background: 'var(--bg-card)', padding: '0 10px', color: 'var(--text-light)', fontSize: '0.85rem', position: 'relative', zIndex: 1 }}>Or continue with</span>
                        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border)', zIndex: 0 }}></div>
                    </div>

                    <button style={{
                        width: '100%',
                        padding: '12px',
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        color: 'var(--text-main)',
                        fontWeight: '600',
                        fontSize: '0.95rem'
                    }}>
                        <Chrome size={20} /> Google
                    </button>

                    <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                        Don't have an account? <Link to="/signup" style={{ color: 'var(--secondary)', fontWeight: '700', textDecoration: 'none' }}>Sign up</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
