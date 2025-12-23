import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, User, HelpCircle, Shield, Chrome, ArrowRight, CheckSquare, Square, UserPlus } from 'lucide-react';

const Signup = () => {
    const { signup } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreeTerms) {
            setError('Please agree to the terms and conditions');
            return;
        }
        try {
            await signup({ name, email, password });
            navigate('/login', { state: { email, message: 'Account created successfully! Please sign in.' } });
        } catch (err) {
            setError(err.message || 'Signup failed');
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
                                <UserPlus size={20} /> Join Us
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', paddingLeft: '30px' }}>
                                Create your account
                            </div>
                        </div>

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
                                <User size={20} /> Sign In
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', paddingLeft: '30px' }}>
                                Already have an account?
                            </div>
                        </Link>
                    </div>

                    <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: 'var(--text-light)', textAlign: 'center' }}>
                        &copy; 2025 RuralShores
                    </div>
                </div>

                {/* Right Content / Form Panel */}
                <div style={{ flex: 1, padding: '30px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '10px' }}>Create Account</h2>
                        <p style={{ color: 'var(--text-light)' }}>Join RuralShores and start your journey</p>
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
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
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

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>Email Address</label>
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

                        <div style={{ marginBottom: '30px' }}>
                            <div
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                onClick={() => setAgreeTerms(!agreeTerms)}
                            >
                                {agreeTerms ? <CheckSquare size={18} color="var(--secondary)" /> : <Square size={18} color="var(--text-light)" />}
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                                    I agree to the <a href="#" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>Terms & Conditions</a>
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center', padding: '14px', borderRadius: '12px' }}
                        >
                            Create Account
                        </button>
                    </form>

                    <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--secondary)', fontWeight: '700', textDecoration: 'none' }}>Sign In</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
