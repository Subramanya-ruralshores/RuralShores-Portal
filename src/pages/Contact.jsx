import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const Contact = () => {
    const [focused, setFocused] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: 'Business Transformation Services',
        message: ''
    });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            await axios.post(API_ENDPOINTS.SUPPORT.SUBMIT, {
                ...formData,
                subject: `${formData.category} Inquiry from ${formData.name}`
            });
            setStatus({ loading: false, success: true, error: null });
            setFormData({
                name: '',
                email: '',
                category: 'Business Transformation Services',
                message: ''
            });
            setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
        } catch (err) {
            setStatus({
                loading: false,
                success: false,
                error: err.response?.data?.message || 'Failed to submit inquiry. Please try again.'
            });
        }
    };

    const inputStyle = (isFocused) => ({
        width: '100%',
        padding: '18px 25px',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: isFocused ? 'var(--primary)' : 'rgba(10, 43, 85, 0.1)',
        background: isFocused ? 'white' : 'var(--bg-soft)',
        outline: 'none',
        fontSize: '1rem',
        color: 'var(--primary)',
        transition: 'all 0.3s cubic-bezier(0.2, 1, 0.3, 1)',
        boxShadow: isFocused ? '0 10px 30px rgba(10, 43, 85, 0.08)' : 'none'
    });

    return (
        <div style={{ background: '#FFFFFF' }}>
            {/* Blockbuster Hero */}
            <section className="hero" style={{
                paddingTop: '200px',
                paddingBottom: '120px',
                background: 'var(--primary)',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at top right, rgba(231, 76, 60, 0.1) 0%, transparent 60%)',
                    zIndex: 0
                }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span style={{ color: 'var(--secondary)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.8rem' }}>Direct Engagement</span>
                        <h1 style={{ color: 'white', fontSize: '5rem', marginTop: '20px', letterSpacing: '-3px' }}>
                            Start a <br />
                            <span style={{ color: 'var(--secondary)' }}>Conversation.</span>
                        </h1>
                        <p style={{ fontSize: '1.4rem', opacity: 0.8, maxWidth: '800px', margin: '40px auto 0', lineHeight: '1.6' }}>
                            Ready to scale your impact or transform your business? Our team is standing by to help you navigate the future of delivery.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '100px', alignItems: 'start' }}>

                        {/* Contact Directory */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div style={{ marginBottom: '60px' }}>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', letterSpacing: '-1px' }}>Global Connect</h2>
                                <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Visit our corporate headquarters or reach out via our dedicated channels.</p>
                            </div>

                            <div style={{ display: 'grid', gap: '30px' }}>
                                {[
                                    { icon: <MapPin size={24} />, title: "Headquarters", detail: "RuralShores Business Services Pvt. Ltd, #135/2, Maruthi Industrial Estate, Adjacent to Hotel Zuri, ITPL Road, Hoodi, Whitefield, Bangalore - 560 048", color: "var(--primary)" },
                                    { icon: <Mail size={24} />, title: "Corporate Inquiries", detail: "info@ruralshores.com", color: "var(--secondary)" },
                                    { icon: <MessageSquare size={24} />, title: "Career Desk", detail: "careers@ruralshores.com", color: "#27ae60" },
                                    { icon: <Phone size={24} />, title: "Support Line", detail: "+91 80 4112 5522", color: "var(--primary)" }
                                ].map((item, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '30px', display: 'flex', gap: '25px', alignItems: 'flex-start', border: '1px solid rgba(10, 43, 85, 0.05)' }}>
                                        <div style={{ background: 'var(--bg-soft)', color: item.color, padding: '15px', borderRadius: '14px' }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>{item.title}</h4>
                                            <p style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: '700', margin: 0, lineHeight: '1.5' }}>{item.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '60px', padding: '40px', background: 'var(--primary)', borderRadius: '32px', color: 'white' }}>
                                <Globe size={40} color="var(--secondary)" style={{ marginBottom: '20px' }} />
                                <h3 style={{ color: 'white', marginBottom: '15px' }}>Nationwide Presence</h3>
                                <p style={{ opacity: 0.8, fontSize: '0.95rem', marginBottom: '25px' }}>Operations across 8+ states with 16+ delivery centers. Check our centers page for specific site locations.</p>
                                <a href="/centers" style={{ color: 'var(--secondary)', fontWeight: '800', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    VIEW ALL CENTERS <ArrowRight size={18} />
                                </a>
                            </div>
                        </motion.div>

                        {/* Inquiry Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card"
                            style={{ padding: '80px', background: 'white', border: '1px solid rgba(10, 43, 85, 0.05)', boxShadow: '0 40px 100px rgba(10, 43, 85, 0.05)' }}
                        >
                            <div style={{ marginBottom: '50px' }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Inquiry Gateway</h3>
                                <p style={{ color: 'var(--text-light)' }}>Please fill the details below and a subject specialist will reach out within 24 hours.</p>
                            </div>

                            {status.success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        padding: '20px',
                                        borderRadius: '12px',
                                        background: '#d4edda',
                                        color: '#155724',
                                        marginBottom: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}
                                >
                                    <CheckCircle size={20} />
                                    <span>Thank you! Your inquiry has been submitted successfully. We will contact you shortly.</span>
                                </motion.div>
                            )}

                            {status.error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        padding: '20px',
                                        borderRadius: '12px',
                                        background: '#f8d7da',
                                        color: '#721c24',
                                        marginBottom: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}
                                >
                                    <AlertCircle size={20} />
                                    <span>{status.error}</span>
                                </motion.div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                style={{ display: 'grid', gap: '30px' }}
                            >
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '10px', display: 'block', letterSpacing: '1px' }}>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your name"
                                            style={inputStyle(focused === 'name')}
                                            onFocus={() => setFocused('name')}
                                            onBlur={() => setFocused(null)}
                                        />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '10px', display: 'block', letterSpacing: '1px' }}>Work Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="you@company.com"
                                            style={inputStyle(focused === 'email')}
                                            onFocus={() => setFocused('email')}
                                            onBlur={() => setFocused(null)}
                                        />
                                    </div>
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '10px', display: 'block', letterSpacing: '1px' }}>Inquiry Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        style={inputStyle(focused === 'cat')}
                                        onFocus={() => setFocused('cat')}
                                        onBlur={() => setFocused(null)}
                                    >
                                        <option>Business Transformation Services</option>
                                        <option>Skill Training & Academy</option>
                                        <option>Strategic Partnerships</option>
                                        <option>Career Opportunities</option>
                                        <option>Other Inquiries</option>
                                    </select>
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '10px', display: 'block', letterSpacing: '1px' }}>How can we help?</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        placeholder="Briefly describe your requirements..."
                                        style={{ ...inputStyle(focused === 'msg'), resize: 'none' }}
                                        onFocus={() => setFocused('msg')}
                                        onBlur={() => setFocused(null)}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status.loading}
                                    className="btn btn-primary"
                                    style={{
                                        padding: '22px',
                                        justifyContent: 'center',
                                        fontSize: '1rem',
                                        letterSpacing: '2px',
                                        boxShadow: '0 20px 40px rgba(10, 43, 85, 0.2)',
                                        opacity: status.loading ? 0.7 : 1,
                                        cursor: status.loading ? 'wait' : 'pointer'
                                    }}
                                >
                                    {status.loading ? <Loader2 className="spin" size={20} /> : (
                                        <>TRANSMIT MESSAGE <Send size={20} style={{ marginLeft: '10px' }} /></>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sub-Footer Map Frame (Mock) */}
            <section style={{ height: '400px', width: '100%', background: 'var(--bg-soft)', overflow: 'hidden', position: 'relative' }}>
                <iframe
                    title="RS HQ Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.6)' }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=RuralShores%20Business%20Services%20Pvt%20Ltd%20Hoodi%20Whitefield&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                ></iframe>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', background: 'linear-gradient(rgba(255,255,255,0.8), transparent 20%, transparent 80%, rgba(255,255,255,0.8))' }}></div>
            </section>
        </div>
    );
};

export default Contact;
