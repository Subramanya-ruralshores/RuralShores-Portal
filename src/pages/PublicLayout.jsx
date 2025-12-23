import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Mail, Phone, MapPin, ArrowRight, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PublicLayout = () => {
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <div className="layout">
            {/* Navbar */}
            <nav className="navbar">
                <div className="container nav-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    {/* 1. Logo Section */}
                    <Link to="/" className="logo">
                        <div className="logo-rounded">
                            <img src="https://www.ruralshores.com/pic/Logo%20580x236.png" alt="RuralShores Logo" />
                        </div>
                    </Link>

                    {/* 2. Main Navigation Links */}
                    <div className="nav-links-center" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <Link to="/" className="nav-link">Home</Link>

                        {/* About Us Dropdown */}
                        <div className="nav-item-dropdown"
                            style={{ position: 'relative' }}
                            onMouseEnter={() => setIsAboutOpen(true)}
                            onMouseLeave={() => setIsAboutOpen(false)}
                        >
                            <button
                                className="nav-link"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontFamily: 'var(--font-main)',
                                    fontSize: '1rem',
                                    padding: 0
                                }}
                                onClick={() => setIsAboutOpen(!isAboutOpen)}
                            >
                                About Us <ChevronDown size={14} />
                            </button>

                            <AnimatePresence>
                                {isAboutOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: '-15px',
                                            paddingTop: '20px',
                                            zIndex: 100
                                        }}
                                    >
                                        <div style={{
                                            background: 'var(--bg-card)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '16px',
                                            padding: '8px',
                                            minWidth: '200px',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px'
                                        }}>
                                            <Link to="/about" className="dropdown-item" onClick={() => setIsAboutOpen(false)}>
                                                Our Story
                                            </Link>
                                            <Link to="/executive-team" className="dropdown-item" onClick={() => setIsAboutOpen(false)}>
                                                Executive Team
                                            </Link>
                                            <Link to="/centers" className="dropdown-item" onClick={() => setIsAboutOpen(false)}>
                                                Our Centers
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link to="/services" className="nav-link">Services</Link>
                        <Link to="/careers" className="nav-link">Careers</Link>
                    </div>

                    {/* 3. Action Buttons */}
                    <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Link to="/newsroom" className="btn-nav-outline">
                            NewsRoom
                        </Link>

                        <a href="https://www.ruralshoresskillsacademy.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-nav-outline"
                        >
                            Skill Academy
                        </a>

                        {/* Login Dropdown */}
                        <div className="nav-item-dropdown"
                            style={{ position: 'relative' }}
                            onMouseEnter={() => setIsLoginOpen(true)}
                            onMouseLeave={() => setIsLoginOpen(false)}
                        >
                            <button
                                className="nav-link"
                                style={{
                                    background: 'var(--bg-soft)',
                                    border: '1px solid var(--border)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontFamily: 'var(--font-main)',
                                    fontSize: '0.95rem',
                                    fontWeight: '700',
                                    padding: '10px 20px',
                                    borderRadius: '50px',
                                    color: 'var(--primary)',
                                    transition: 'all 0.3s'
                                }}
                                onClick={() => setIsLoginOpen(!isLoginOpen)}
                            >
                                Login <ChevronDown size={14} style={{ transform: isLoginOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                            </button>

                            <AnimatePresence>
                                {isLoginOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            right: '0',
                                            paddingTop: '20px',
                                            zIndex: 100
                                        }}
                                    >
                                        <div style={{
                                            background: 'var(--bg-card)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '16px',
                                            padding: '8px',
                                            minWidth: '180px',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px'
                                        }}>
                                            <Link to="/login" className="dropdown-item" onClick={() => setIsLoginOpen(false)}>
                                                User Login
                                            </Link>
                                            <Link to="/admin/login" className="dropdown-item" onClick={() => setIsLoginOpen(false)}>
                                                Admin Login
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                    </div>
                </div>
            </nav>

            {/* Social Floating Bar */}
            <div className="social-bar">
                <button
                    onClick={toggleTheme}
                    className="social-icon"
                    aria-label="Toggle theme"
                    style={{
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px' // Spacing from other icons
                    }}
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <a href="https://www.linkedin.com/company/ruralshores-business-services-pvt-ltd/posts/?feedView=all" className="social-icon"><Linkedin size={20} /></a>
                <a href="https://www.facebook.com/people/Rural-Shores/61561876670633/" className="social-icon"><Facebook size={20} /></a>
                <a href="https://x.com/RuralShores" className="social-icon"><Twitter size={20} /></a>
                <a href="https://www.youtube.com/@RURALSHORESOFFICIAL" className="social-icon"><Youtube size={20} /></a>
                <a href="https://www.instagram.com/ruralshoresofficial/" className="social-icon"><Instagram size={20} /></a>
            </div>

            {/* Main Content with Premium Transition */}
            <main>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Premium Corporate Footer */}
            <footer style={{ background: 'var(--primary-dark)', color: '#CBD5E1', padding: '100px 0 40px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: 'var(--secondary-gradient)' }}></div>
                <div className="container">
                    <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', marginBottom: '80px' }}>
                        <div>
                            <Link to="/" style={{ display: 'block', marginBottom: '60px' }}>
                                <img src="https://www.ruralshores.com/pic/Logo%20580x236.png" alt="RuralShores" style={{ height: '50px', objectFit: 'contain' }} />
                            </Link>
                            <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '300px' }}>
                                Empowering rural youth through excellence in global service delivery since 2008.
                            </p>
                        </div>

                        <div>
                            <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '30px', fontWeight: '700', letterSpacing: '1px' }}>Quick Links</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {['Our Story', 'Services', 'Careers', 'Executive Team'].map((item) => (
                                    <Link
                                        key={item}
                                        to={`/${item.toLowerCase().replace(' ', '-')}`}
                                        className="footer-link"
                                        style={{ color: '#CBD5E1', textDecoration: 'none', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}
                                        onMouseEnter={(e) => { e.target.style.color = 'var(--secondary)'; e.target.style.transform = 'translateX(5px)'; }}
                                        onMouseLeave={(e) => { e.target.style.color = '#CBD5E1'; e.target.style.transform = 'translateX(0)'; }}
                                    >
                                        <ArrowRight size={14} color="var(--secondary)" /> {item}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '30px', fontWeight: '700', letterSpacing: '1px' }}>Our Hubs</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {[
                                    { city: 'Bangalore (HQ)', type: 'Headquarters' },
                                    { city: 'Noida', type: 'Regional Hub' },
                                    { city: 'Hubli', type: 'Delivery Center' },
                                    { city: 'Bagepalli', type: 'Delivery Center' }
                                ].map((hub) => (
                                    <div key={hub.city} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
                                        <div>
                                            <div style={{ color: 'white', fontSize: '0.95rem', fontWeight: '600' }}>{hub.city}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{hub.type}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '30px', fontWeight: '700', letterSpacing: '1px' }}>Contact</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <a href="mailto:info@ruralshores.com" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: '#CBD5E1' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Mail size={18} color="var(--secondary)" />
                                    </div>
                                    <span style={{ transition: 'color 0.3s' }}>info@ruralshores.com</span>
                                </a>
                                <a href="tel:+918041125522" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: '#CBD5E1' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Phone size={18} color="var(--secondary)" />
                                    </div>
                                    <span>+91 80 4112 5522</span>
                                </a>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '15px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <MapPin size={18} color="var(--secondary)" />
                                    </div>
                                    <span style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>RuralShores Business Services Pvt. Ltd,<br />#135/2, Maruthi Industrial Estate,<br />Adjacent to Hotel Zuri, ITPL Road,<br />Hoodi, Whitefield, Bangalore - 560 048</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #1E293B', paddingTop: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                        <p style={{ fontSize: '0.9rem', color: '#64748B' }}>
                            © 2025 RuralShores Business Services Pvt Ltd. All rights reserved.
                        </p>
                        <div style={{ display: 'flex', gap: '30px' }}>
                            <a href="#" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>Privacy Policy</a>
                            <a href="#" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>Terms of Use</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
