import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Star, Heart, Zap, Target, Search, Filter, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const jobs = [
        {
            title: 'Associates - Voice Process',
            location: 'Bagepalli, Karnataka',
            type: 'Full-time',
            category: 'Voice',
            salary: 'As per Industry Standard'
        },
        {
            title: 'Data Analyst - AI Training',
            location: 'Hubli, Karnataka',
            type: 'Full-time',
            category: 'Tech',
            salary: 'Competitive'
        },
        {
            title: 'Team Lead - BPO Operations',
            location: 'Noida, Uttar Pradesh',
            type: 'Full-time',
            category: 'Operations',
            salary: 'Leadership Grade'
        },
        {
            title: 'HR Executive',
            location: 'Bangalore, Karnataka',
            type: 'Full-time',
            category: 'HR',
            salary: 'Top tier'
        },
        {
            title: 'Quality Analyst - Banking',
            location: 'Pulla, Andhra Pradesh',
            type: 'Full-time',
            category: 'Operations',
            salary: 'Competitive'
        }
    ];

    const categories = ['All', 'Voice', 'Non-Voice', 'Tech', 'Operations', 'HR'];
    const filteredJobs = selectedCategory === 'All' ? jobs : jobs.filter(j => j.category === selectedCategory || (selectedCategory === 'Non-Voice' && j.category === 'Tech'));

    return (
        <div style={{ background: '#FFFFFF' }}>
            {/* Minimalist Corporate Hero */}
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
                    background: 'radial-gradient(circle at bottom left, rgba(231, 76, 60, 0.1) 0%, transparent 60%)',
                    zIndex: 0
                }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span style={{ color: 'var(--secondary)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.8rem' }}>Talent & Impact</span>
                        <h1 style={{ color: 'white', marginTop: '20px' }}>
                            Careers that <br />
                            <span style={{ color: 'var(--secondary)' }}>Create Value.</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '800px', margin: '30px auto 0', lineHeight: '1.6' }}>
                            Join a workforce of 16,000+ pioneers. At RuralShores, you don't just build a career; you build a nation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Why Join Us Section */}
            <section className="section" style={{ background: 'var(--bg-soft)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ marginBottom: '20px' }}>The RuralShores <span style={{ color: 'var(--secondary)' }}>Advantage</span></h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', maxWidth: '700px', margin: '0 auto' }}>We provide more than just roles; we provide a platform for professional transformation.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
                        {[
                            { icon: <Zap color="var(--secondary)" size={32} />, title: "Rapid Growth", desc: "Access to internal training programs and fast-track leadership paths." },
                            { icon: <Heart color="var(--secondary)" size={32} />, title: "Social Impact", desc: "Every hour you work contributes directly to rural economic development." },
                            { icon: <Target color="var(--secondary)" size={32} />, title: "Global Skills", desc: "Work on cutting-edge projects for Fortune 500 clients worldwide." },
                            { icon: <Star color="var(--secondary)" size={32} />, title: "Work-Life", desc: "Professional corporate careers without relocating from your roots." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card"
                                style={{ padding: '40px', background: 'white' }}
                            >
                                <div style={{ marginBottom: '20px' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: 'var(--primary)' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Board Section */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '80px', alignItems: 'start' }}>

                        {/* Filters Sidebar */}
                        <aside style={{ position: 'sticky', top: '140px' }}>
                            <div style={{ marginBottom: '40px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                                    <Filter size={18} color="var(--secondary)" />
                                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: '800' }}>Filter Roles</h4>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            style={{
                                                textAlign: 'left',
                                                padding: '14px 20px',
                                                borderRadius: '12px',
                                                border: '1px solid',
                                                borderColor: selectedCategory === cat ? 'var(--primary)' : 'rgba(10, 43, 85, 0.05)',
                                                background: selectedCategory === cat ? 'var(--primary)' : 'white',
                                                color: selectedCategory === cat ? 'white' : 'var(--text-light)',
                                                fontWeight: '700',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s cubic-bezier(0.2, 1, 0.3, 1)',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-card" style={{ padding: '30px', background: 'var(--primary)', color: 'white' }}>
                                <h5 style={{ color: 'white', fontSize: '1rem', marginBottom: '15px' }}>Job Alert?</h5>
                                <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>Don't see a role? Drop your CV and we'll reach out when we have a match.</p>
                                <Link to="/contact" style={{
                                    background: 'var(--secondary)',
                                    color: 'white',
                                    padding: '12px 20px',
                                    borderRadius: '8px',
                                    display: 'block',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    fontWeight: '800',
                                    fontSize: '0.8rem'
                                }}>REACH OUT</Link>
                            </div>
                        </aside>

                        {/* Jobs List */}
                        <main>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '40px',
                                paddingBottom: '20px',
                                borderBottom: '1px solid rgba(10, 43, 85, 0.05)'
                            }}>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '800' }}>{selectedCategory === 'All' ? 'Current' : selectedCategory} Openings</h3>
                                <span style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: '700' }}>{filteredJobs.length} Positions Available</span>
                            </div>

                            <div style={{ display: 'grid', gap: '20px' }}>
                                <AnimatePresence mode="wait">
                                    {filteredJobs.map((job, i) => (
                                        <motion.div
                                            key={job.title + i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3, delay: i * 0.05 }}
                                            className="glass-card"
                                            style={{
                                                padding: '30px 40px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                background: 'white'
                                            }}
                                        >
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                                                    <h4 style={{ fontSize: '1.4rem', color: 'var(--primary)', fontWeight: '800', margin: 0 }}>{job.title}</h4>
                                                    <span style={{
                                                        background: 'rgba(10, 43, 85, 0.05)',
                                                        color: 'var(--primary)',
                                                        padding: '4px 12px',
                                                        borderRadius: '4px',
                                                        fontSize: '0.7rem',
                                                        fontWeight: '900',
                                                        textTransform: 'uppercase'
                                                    }}>{job.category}</span>
                                                </div>
                                                <div style={{ display: 'flex', gap: '30px', color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: '600' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} color="var(--secondary)" /> {job.location}</span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} color="var(--secondary)" /> {job.type}</span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ArrowRight size={16} color="var(--secondary)" /> {job.salary}</span>
                                                </div>
                                            </div>
                                            <Link to="/contact" className="btn btn-primary" style={{ padding: '16px 30px' }}>Apply Now</Link>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {filteredJobs.length === 0 && (
                                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                                        <Search size={48} color="rgba(10, 43, 85, 0.1)" style={{ marginBottom: '20px' }} />
                                        <p style={{ color: 'var(--text-light)', fontSize: '1.2rem' }}>No positions found in this category right now.</p>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            {/* Bottom Section: Employee Testimony Simulation */}
            <section className="section" style={{ background: 'var(--primary)', color: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '100px', alignItems: 'center' }}>
                        <div>
                            <span style={{ color: 'var(--secondary)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.8rem' }}>The Mission</span>
                            <h2 style={{ color: 'white', marginTop: '20px', marginBottom: '30px' }}>Scaling Skills, <br />Changing Lives.</h2>
                            <p style={{ fontSize: '1.2rem', opacity: 0.8, lineHeight: '1.8', marginBottom: '40px' }}>
                                "The most rewarding part of working here is seeing a young person from a small village transform into a global corporate professional within months. We aren't just giving jobs; we're giving identity."
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                                    <img src="https://www.ruralshores.com/pic/Sindhu%20Girish.png" alt="HR Head" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>Sindhu Girish</div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>AVP & Head of HR</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h4 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '5px' }}>16k+</h4>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Employees Trained</p>
                            </div>
                            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h4 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '5px' }}>16</h4>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Centers</p>
                            </div>
                            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h4 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '5px' }}>8+</h4>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>States Presence</p>
                            </div>
                            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h4 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '5px' }}>35+</h4>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Fortune 500 Clients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
