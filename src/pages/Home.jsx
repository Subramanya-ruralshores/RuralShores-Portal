import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Users, Target, Rocket, Heart, Globe, Shield, Tag, Brain, Megaphone, BarChart, Database, Zap, Briefcase, MapPin, TrendingUp, Activity } from 'lucide-react';

const Home = () => {


    useEffect(() => {
        // Any general home page effects can go here
    }, []);

    const metrics = [
        { label: 'Rural Professionals', value: '3,500+', icon: <Users size={24} /> },
        { label: 'Delivery Centers', value: '15+', icon: <MapPin size={24} /> },
        { label: 'Processes Scaled', value: '100+', icon: <Zap size={24} /> },
        { label: 'States Present', value: '9', icon: <Globe size={24} /> }
    ];

    const domains = [
        { title: 'Banking & Finance', desc: 'Secure AP/AR processing and compliance management for global financial institutions.', icon: <Database /> },
        { title: 'Telecom & Tech', desc: '24/7 technical helpdesk and network monitoring for industry leaders.', icon: <Rocket /> },
        { title: 'Insurance & Healthcare', desc: 'Precise claims processing and medical record digitization with 99.9% accuracy.', icon: <Shield /> },
        { title: 'Logistics & Retail', desc: 'Dynamic supply chain data management and real-time customer support.', icon: <Briefcase /> }
    ];

    const clientLogos = [
        { name: 'Deloitte', logo: 'https://logo.clearbit.com/deloitte.com' },
        { name: 'TCS', logo: 'https://logo.clearbit.com/tcs.com' },
        { name: 'HCL Tech', logo: 'https://logo.clearbit.com/hcltech.com' },
        { name: 'Tech Mahindra', logo: 'https://logo.clearbit.com/techmahindra.com' },
        { name: 'Ather Energy', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Ather-logo.svg/1280px-Ather-logo.svg.png' },
        { name: 'Bayer', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Logo_Bayer.svg/2048px-Logo_Bayer.svg.png' },
        { name: 'EY', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/EY_logo_2019.svg/2048px-EY_logo_2019.svg.png' },
        { name: 'Flipkart', logo: 'https://cdn.freebiesupply.com/logos/large/2x/flipkart-logo-png-transparent.png' },
        { name: 'Infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/2560px-Infosys_logo.svg.png' },
        { name: 'HDFC Life', logo: 'https://logos-world.net/wp-content/uploads/2023/05/HDFC-Life-Logo.jpg' },
        { name: 'ICICI Prudential', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Icici_prudential_life_insurance_logo.png' },
        { name: 'Godrej', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Godrej_Logo.svg/1280px-Godrej_Logo.svg.png' },
        { name: 'Tata AIG', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/03/TATA_AIG_logo.png' },
        { name: 'Myntra', logo: 'https://logos-world.net/wp-content/uploads/2022/12/Myntra-Logo.png' }
    ];

    return (
        <div style={{ overflowX: 'hidden' }}>
            {/* Split Hero Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                padding: '160px 0 100px',
                background: 'var(--primary-gradient)',
                color: 'white',
                position: 'relative'
            }}>
                {/* Simplified Overlay for Home */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 80%)',
                    zIndex: 0
                }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span style={{
                                color: 'var(--secondary)',
                                fontWeight: '900',
                                textTransform: 'uppercase',
                                letterSpacing: '4px',
                                fontSize: '0.8rem',
                                display: 'block',
                                marginBottom: '20px'
                            }}>
                                Countryside • Nationwide
                            </span>
                            <h1 style={{ marginBottom: '30px', color: 'white' }}>
                                Creating Sustainable <br />
                                <span style={{ color: 'var(--accent)' }}>Employment.</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', marginBottom: '40px', maxWidth: '650px', lineHeight: '1.6' }}>
                                Creating sustainable employment where it matters most - empowering 3,500+ rural professionals across India.
                            </p>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <Link to="/services" className="btn btn-primary">Our Solutions <ArrowRight size={20} /></Link>
                                <Link to="/about" className="btn" style={{ background: 'white', border: '1px solid #EEE', color: 'var(--primary)' }}>Our Vision</Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            style={{ position: 'relative' }}
                        >
                            <div style={{
                                background: 'var(--bg-card)',
                                padding: '15px',
                                borderRadius: '40px',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.2)',
                                transform: 'rotate(2deg)'
                            }}>
                                <img
                                    src="https://www.ruralshores.com/pic/Hero-Banner-4.jpg"
                                    alt="RuralShores Team"
                                    style={{ width: '100%', borderRadius: '30px', display: 'block' }}
                                />
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '-30px',
                                right: '-30px',
                                background: 'var(--secondary)',
                                color: 'white',
                                padding: '20px 30px',
                                borderRadius: '20px',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2rem', fontWeight: '900' }}>16</div>
                                <div style={{ fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Centers Across India</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Impact Metrics */}
            <section style={{ padding: '80px 0', background: 'var(--primary-dark)', color: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
                        {metrics.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{ color: 'var(--secondary)', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>{m.icon}</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '5px' }}>{m.value}</div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>{m.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Domain Expertise */}
            <section className="section">
                <div className="container">
                    <div className="section-title">
                        <span>Domain Excellence</span>
                        <h2>Global Expertise, Local Impact</h2>
                        <p>We manage mission-critical processes for blue-chip clients across major industry verticals.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                        {domains.map((d, i) => (
                            <motion.div
                                key={i}
                                className="glass-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                style={{ padding: '40px 30px', background: 'var(--glass-gradient)' }}
                            >
                                <div style={{ color: 'var(--secondary)', marginBottom: '24px' }}>
                                    {React.cloneElement(d.icon, { size: 40 })}
                                </div>
                                <h3 style={{ marginBottom: '20px' }}>{d.title}</h3>
                                <p style={{ color: 'var(--text-light)', marginBottom: '0', fontSize: '1.1rem' }}>{d.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Pillars */}
            <section className="section" style={{ background: 'var(--bg-soft)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
                        <div>
                            <span style={{ color: 'var(--primary)', fontWeight: '900', letterSpacing: '4px' }}>OUR PHILOSOPHY</span>
                            <h2 style={{ margin: '20px 0 30px' }}>The Three Pillars of Rural Excellence</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                {[
                                    { t: 'Impact Sourcing', d: 'Prioritizing social impact alongside commercial excellence to create sustainable ecosystems.' },
                                    { t: 'Technology First', d: 'Leveraging AI and modern cloud infrastructure to deliver urban-quality output from rural centers.' },
                                    { t: 'Skill Transformation', d: 'Our Skills Academy ensures every professional is industry-ready with global standards.' }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '25px' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--secondary)', marginTop: '8px', flexShrink: 0 }}></div>
                                        <div>
                                            <h4 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{item.t}</h4>
                                            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
                            <iframe
                                src="https://www.youtube.com/embed/HHS9rMcyX5Y"
                                title="RuralShores Operations"
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '40px' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </section>



            {/* Trusted by Enterprises */}
            <section style={{ padding: '100px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                        <div>
                            <span style={{ color: 'var(--secondary)', fontWeight: '900', letterSpacing: '4px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Trusted by Enterprises</span>
                            <h2 style={{ margin: '20px 0 30px' }}>Process Excellence, Data Security, and Scale</h2>
                            <p style={{ fontSize: '1.15rem', color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '40px' }}>
                                You can rely on our proven track record of delivering mission-critical operations for Fortune 500 companies across Banking, Insurance, Telecom, and Technology sectors.
                            </p>
                            <div style={{ display: 'grid', gap: '20px' }}>
                                {[
                                    { label: 'ISO 27001 Certified', icon: <Shield size={20} /> },
                                    { label: '99.9% SLA Adherence', icon: <CheckCircle2 size={20} /> },
                                    { label: 'Multi-layered Security', icon: <Globe size={20} /> }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {React.cloneElement(item.icon, { color: 'var(--primary)' })}
                                        </div>
                                        <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <img
                                src="https://www.ruralshores.com/pic/rural2.jpeg"
                                alt="RuralShores Professional Team"
                                style={{ width: '100%', borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* World's Largest Rural Digital Operations Company */}
            <section style={{ padding: '120px 0', background: 'var(--bg-card)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src="https://media.licdn.com/dms/image/v2/D5622AQGKhSjPLdJ9Eg/feedshare-shrink_1280/B56Zk3S80FJwAs-/0/1757569343727?e=1767830400&v=beta&t=UDuhfIRBf3KTgB0BMWiLRVqHgutKBRw-yrh9a_P_AUI"
                                alt="RuralShores Operations"
                                style={{ width: '100%', borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span style={{ color: 'var(--secondary)', fontWeight: '900', letterSpacing: '4px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Market Leadership</span>
                            <h2 style={{ margin: '20px 0 30px' }}>World's Largest Rural Digital Operations Company</h2>
                            <p style={{ fontSize: '1.15rem', color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '30px' }}>
                                RuralShores operates in <strong>14+ centers</strong> spread across <strong>9 states</strong>, working with several bluechip marquee clients of global repute. We handle more than <strong>100 complex IT/ITeS processes</strong> through voice and non-voice services.
                            </p>
                            <div style={{ display: 'grid', gap: '20px' }}>
                                {[
                                    { icon: <MapPin size={20} />, label: '14+ Centers Across 9 States' },
                                    { icon: <Briefcase size={20} />, label: '100+ Complex IT/ITeS Processes' },
                                    { icon: <Users size={20} />, label: 'Bluechip Marquee Global Clients' },
                                    { icon: <TrendingUp size={20} />, label: 'Voice & Non-Voice Services' }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {React.cloneElement(item.icon, { color: 'var(--primary)' })}
                                        </div>
                                        <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', lineHeight: '1.8', marginTop: '30px', padding: '20px', background: 'var(--bg-soft)', borderRadius: '15px' }}>
                                We also help organizations in <strong>retail and FMCG penetrate into rural markets</strong> and increase their market share through our feet-on-street support and financial inclusion services.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Impact - Transform Rural Youth */}
            <section style={{ padding: '120px 0', background: 'var(--bg-soft)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span style={{ color: 'var(--secondary)', fontWeight: '900', letterSpacing: '4px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Our Vision</span>
                            <h2 style={{ margin: '20px 0 30px' }}>Transforming Rural Youth into Confident Knowledge Professionals</h2>
                            <p style={{ fontSize: '1.15rem', color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '30px' }}>
                                Through <strong>Impact Sourcing</strong>, RuralShores aims to provide livelihood to <strong>100,000+ rural youth</strong> by providing jobs at the doorstep of rural youth rather than bringing them to the job.
                            </p>

                            {/* Company Stats */}
                            <div style={{
                                background: 'var(--bg-card)',
                                padding: '30px',
                                borderRadius: '20px',
                                marginBottom: '30px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                                    {[
                                        { value: '2008', label: 'Founded' },
                                        { value: '1,001-5,000', label: 'Employees' },
                                        { value: 'Bangalore', label: 'Headquarters' },
                                        { value: '1,075+', label: 'LinkedIn Members' }
                                    ].map((stat, i) => (
                                        <div key={i} style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '5px' }}>{stat.value}</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: '600' }}>{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Specialties */}
                            <div>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Our Specialties</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {[
                                        'Artificial Intelligence', 'Agentic AI', 'Marketing As A Service',
                                        'Digital Marketing', 'Data Digitization', 'KPO Services',
                                        'Inbound Calling', 'Skill Development', 'IT/ITeS'
                                    ].map((specialty, i) => (
                                        <div key={i} style={{
                                            padding: '10px 20px',
                                            background: 'var(--bg-card)',
                                            borderRadius: '100px',
                                            fontSize: '0.85rem',
                                            fontWeight: '700',
                                            color: 'var(--primary)',
                                            border: '1px solid var(--border)'
                                        }}>
                                            {specialty}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src="https://media.licdn.com/dms/image/v2/D5622AQGl02OgrLyFAg/feedshare-shrink_1280/B56ZssQx9KJUAs-/0/1765974157155?e=1767830400&v=beta&t=PuOaaf4MNlyDbfIJsdhmz-A_S4dYTLFux3sbnL9VA1g"
                                alt="Rural Youth Transformation"
                                style={{ width: '100%', borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gen AI Spotlight Section */}
            <section style={{
                padding: '120px 0',
                background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)', zIndex: 0 }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div style={{
                                display: 'inline-block',
                                padding: '6px 12px',
                                background: 'rgba(59, 130, 246, 0.2)',
                                color: '#60A5FA',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                marginBottom: '20px',
                                textTransform: 'uppercase'
                            }}>
                                Future of Work
                            </div>
                            <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '25px', lineHeight: '1.1' }}>
                                Next-Gen <span style={{ color: 'var(--secondary)' }}>Generative AI</span> Solutions.
                            </h2>
                            <p style={{ fontSize: '1.2rem', color: '#94A3B8', marginBottom: '35px', lineHeight: '1.7' }}>
                                We are transforming rural operations with enterprise-grade Agentic AI. From automated claims processing to intelligent customer support, our Gen AI modules are built for scale and precision.
                            </p>
                            <Link to="/gen-ai" className="btn btn-secondary" style={{ padding: '15px 40px', fontSize: '1rem' }}>
                                Get Started <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            style={{ position: 'relative' }}
                        >
                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '40px',
                                borderRadius: '32px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div style={{ display: 'grid', gap: '20px' }}>
                                    {[
                                        { icon: <Brain />, title: 'Neural RPA', d: 'Bridging LLMs with robotic process automation.' },
                                        { icon: <Activity />, title: 'Agentic Workflows', d: 'Autonomous AI agents for complex task handling.' },
                                        { icon: <Shield />, title: 'Responsible AI', d: 'Governance and security baked into every module.' }
                                    ].map((feat, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', flexShrink: 0 }}>
                                                {feat.icon}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '5px' }}>{feat.title}</div>
                                                <div style={{ color: '#64748B', fontSize: '0.95rem' }}>{feat.d}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Global Client Network - Enhanced Marquee */}
            <section style={{ padding: '120px 0', background: 'var(--bg-soft)' }}>
                <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <span style={{ color: 'var(--secondary)', fontWeight: '900', letterSpacing: '4px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Trusted by leading enterprises</span>
                    <h2 style={{ marginTop: '15px', marginBottom: '15px' }}>Our Enterprise Partners</h2>
                    <p style={{ color: 'var(--text-light)', maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem' }}>
                        Delivering quality from countryside to nationwide.
                    </p>
                </div>
                <div className="marquee-wrapper">
                    <div className="marquee-content">
                        {[...clientLogos, ...clientLogos].map((client, i) => (
                            <div key={i} style={{ position: 'relative', display: 'inline-block' }}>
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="partner-logo"
                                    title={client.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA High Impact */}
            <section style={{
                padding: '120px 0',
                background: 'var(--primary)',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url("https://www.transparenttextures.com/patterns/cubes.png")', opacity: 0.1 }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ color: 'white', marginBottom: '30px' }}>Scale Your Business with Impact.</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.6' }}>
                        Join 200+ global brands delivering excellence through our rural-first platform.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Link to="/contact" className="btn btn-secondary" style={{ padding: '20px 60px' }}>Work With Us</Link>
                        <Link to="/careers" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '20px 40px' }}>Join the Team</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

