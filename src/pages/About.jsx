import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Target, Eye, Award, MapPin,
    ArrowRight, CheckCircle2,
    Zap, Heart, Shield,
    TrendingUp, Users, ChevronLeft, ChevronRight, History, Globe, Sparkles, Building2, Briefcase, DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const assamImages = [
        "https://www.ruralshores.com/GAU/1.jpeg",
        "https://www.ruralshores.com/GAU/2.jpeg",
        "https://www.ruralshores.com/GAU/3.jpeg",
        "https://www.ruralshores.com/GAU/4.jpeg"
    ];

    const timeline = [
        { year: "2008", title: "Our Start", desc: "RuralShores is founded with a simple idea: take world-class processes to rural India and unlock opportunity." },
        { year: "2014", title: "Multi-Center Expansion", desc: "We standardize our operating model and expand to multiple states with strong client partnerships." },
        { year: "2020", title: "Technology Acceleration", desc: "Adoption of automation, digital quality frameworks, and secure cloud to scale reliably." },
        { year: "2025", title: "North-East Focus", desc: "Garchuk, Assam opens - deepening our commitment to underserved regions." }
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % assamImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + assamImages.length) % assamImages.length);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ background: '#FFFFFF' }}>
            {/* Hero */}
            <section className="hero" style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'var(--primary-gradient)',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                    zIndex: 0
                }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.75rem' }}>The RuralShores Legacy</span>
                        <h1 style={{ color: 'white', marginTop: '15px' }}>
                            Our Story of <br />
                            <span style={{ color: 'var(--accent)' }}>Empowerment.</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '800px', margin: '25px auto 0', lineHeight: '1.6' }}>
                            We're building an India where rural talent powers global business - sustainably, inclusively, and at scale.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission/Vision/Objective */}
            <section className="section" style={{ background: 'var(--bg-soft)', marginTop: '-60px' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-card"
                            style={{ padding: '40px 30px', textAlign: 'center', background: 'var(--glass-gradient)' }}
                        >
                            <div style={{ color: 'var(--secondary)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}><Target size={40} /></div>
                            <h3 style={{ marginBottom: '15px' }}>Mission</h3>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '15px' }}>
                                Skill – Employ – Empower – Engage: transform rural youth into confident professionals through targeted training and employment.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--text-light)', textAlign: 'left' }}>
                                <li style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} /> Bridge talent and opportunity</li>
                                <li style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} /> Create dignified livelihoods</li>
                                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} /> Sustainable local impact</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="glass-card"
                            style={{ padding: '40px 30px', textAlign: 'center', background: 'var(--glass-gradient)' }}
                        >
                            <div style={{ color: 'var(--secondary)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}><Eye size={40} /></div>
                            <h3 style={{ marginBottom: '15px' }}>Vision</h3>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '15px' }}>
                                A future where rural youth thrive without having to migrate.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--text-light)', textAlign: 'left' }}>
                                <li style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} /> Strong local opportunities</li>
                                <li style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} /> Keep families connected</li>
                                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} /> Urban-level jobs in rural areas</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="glass-card"
                            style={{ padding: '40px 30px', textAlign: 'center', background: 'var(--glass-gradient)' }}
                        >
                            <div style={{ color: 'var(--secondary)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}><Sparkles size={40} /></div>
                            <h3 style={{ marginBottom: '15px' }}>Objective</h3>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '15px' }}>
                                Provide sustainable employment to 10,000 rural youth across India.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--text-light)', textAlign: 'left' }}>
                                <li style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} /> Establish 50+ delivery centres</li>
                                <li style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} /> Future-ready pathways</li>
                                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} /> Locally accessible careers</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why RuralShores - Advantages & Benefits */}
            <section className="section">
                <div className="container">
                    <div className="section-title">
                        <span>Why RuralShores?</span>
                        <h2>Dual Impact, Shared Success</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div style={{ marginBottom: '30px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Briefcase size={24} color="white" />
                                    </div>
                                    <h3 style={{ margin: 0 }}>Advantages to Corporates</h3>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '15px' }}>
                                    {[
                                        'Abundant, untapped talent in rural India',
                                        'Very low attrition enabling a stable workforce',
                                        'Quality delivery with longer knowledge retention',
                                        'Lower cost when compared to city-based providers',
                                        'Meaningful contribution to CSR objectives'
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '1rem', color: 'var(--text-light)' }}>
                                            <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div style={{ marginBottom: '30px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Heart size={24} color="white" />
                                    </div>
                                    <h3 style={{ margin: 0 }}>Benefits to Rural India</h3>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '15px' }}>
                                    {[
                                        'Skilling and creation of dignified employment',
                                        'Additional family income and savings',
                                        'Women empowerment and financial inclusion',
                                        'Community development and local growth',
                                        'Decongests cities; protects local ecosystems'
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '1rem', color: 'var(--text-light)' }}>
                                            <CheckCircle2 size={20} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Garchuk Center Showcase */}
            <section style={{ padding: '100px 0', background: 'var(--bg-soft)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span style={{ color: 'var(--secondary)', fontWeight: '900', letterSpacing: '4px', fontSize: '0.75rem', textTransform: 'uppercase' }}>New Center in Garchuk, Assam</span>
                        <h2 style={{ marginTop: '15px', marginBottom: '15px' }}>Opening Moments</h2>
                        <p style={{ color: 'var(--text-light)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                            The opening of our Garchuk centre marks a milestone in our growth and community engagement across the Northeast.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        {/* Image Carousel */}
                        <div style={{ position: 'relative', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentSlide}
                                    src={assamImages[currentSlide]}
                                    alt={`Garchuk Center ${currentSlide + 1}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }}
                                />
                            </AnimatePresence>
                            <button onClick={prevSlide} style={{
                                position: 'absolute',
                                left: '20px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255,255,255,0.9)',
                                border: 'none',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                            }}>
                                <ChevronLeft size={24} color="var(--primary)" />
                            </button>
                            <button onClick={nextSlide} style={{
                                position: 'absolute',
                                right: '20px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255,255,255,0.9)',
                                border: 'none',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                            }}>
                                <ChevronRight size={24} color="var(--primary)" />
                            </button>
                            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                                {assamImages.map((_, i) => (
                                    <div key={i} style={{
                                        width: currentSlide === i ? '30px' : '10px',
                                        height: '10px',
                                        borderRadius: '5px',
                                        background: currentSlide === i ? 'white' : 'rgba(255,255,255,0.5)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }} onClick={() => setCurrentSlide(i)}></div>
                                ))}
                            </div>
                        </div>

                        {/* Impact Points */}
                        <div style={{ display: 'grid', gap: '25px' }}>
                            {[
                                { title: 'Empowering the Local Community', desc: 'We will create direct employment for up to 500 individuals, ensuring the benefits of growth are felt locally.', icon: <Users size={24} /> },
                                { title: 'Investing in People', desc: 'Comprehensive training, career pathways, and a supportive environment help our employees build life-long skills.', icon: <TrendingUp size={24} /> },
                                { title: 'Sustainable & Inclusive Growth', desc: 'We will implement eco-friendly practices and promote a diverse, inclusive workplace culture.', icon: <Globe size={24} /> },
                                { title: 'Community Engagement', desc: 'We collaborate with local organizations to support skilling, healthcare, and other essential services.', icon: <Heart size={24} /> }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{ display: 'flex', gap: '15px' }}
                                >
                                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {React.cloneElement(item.icon, { color: 'var(--primary)' })}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{item.title}</h4>
                                        <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className="section">
                <div className="container">
                    <div className="section-title">
                        <span>Our Journey</span>
                        <h2>A Legacy of Innovation</h2>
                    </div>

                    <div style={{ position: 'relative', marginTop: '80px' }}>
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            bottom: 0,
                            width: '2px',
                            background: 'var(--border)',
                            transform: 'translateX(-50%)'
                        }}></div>

                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                style={{
                                    display: 'flex',
                                    justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start',
                                    width: '50%',
                                    marginLeft: i % 2 === 0 ? '0' : '50%',
                                    padding: '0 60px',
                                    marginBottom: '80px',
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    left: i % 2 === 0 ? 'auto' : '-10px',
                                    right: i % 2 === 0 ? '-10px' : 'auto',
                                    top: '30px',
                                    width: '20px',
                                    height: '20px',
                                    background: 'var(--secondary)',
                                    borderRadius: '50%',
                                    border: '4px solid white',
                                    boxShadow: '0 0 0 4px rgba(14, 165, 233, 0.2)',
                                    zIndex: 1
                                }}></div>
                                <div className="glass-card" style={{
                                    width: '100%',
                                    textAlign: i % 2 === 0 ? 'right' : 'left',
                                    padding: '35px 40px'
                                }}>
                                    <div style={{
                                        color: 'var(--secondary)',
                                        fontSize: '2rem',
                                        fontWeight: '900',
                                        marginBottom: '5px',
                                        fontFamily: 'var(--font-heading)'
                                    }}>
                                        {item.year}
                                    </div>
                                    <h4 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{item.title}</h4>
                                    <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Acknowledgments */}
            <section style={{ padding: '100px 0', background: 'var(--bg-soft)' }}>
                <div className="container">
                    <div className="section-title">
                        <span>Acknowledgments</span>
                        <h2>Grateful for Partnership</h2>
                        <p>We're grateful to benevolent organizations who supported us when it mattered most.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '60px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-card"
                            style={{ padding: '50px', background: 'white' }}
                        >
                            <img src="https://www.ruralshores.com/pic/LT.webp" alt="L&T Infotech" style={{ height: '50px', marginBottom: '30px' }} />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>L&T Infotech</h3>
                            <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: '1.7' }}>
                                Larsen and Toubro Infotech (LTI) helped equip two new centres at Dhavlagaon (Maharashtra) and Sonari (Uttar Pradesh). Their timely support enabled job creation in remote areas.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="glass-card"
                            style={{ padding: '50px', background: 'white' }}
                        >
                            <img src="https://www.ruralshores.com/pic/Automation%20Anywhere%20Logo.webp" alt="Automation Anywhere" style={{ height: '50px', marginBottom: '30px' }} />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Automation Anywhere</h3>
                            <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: '1.7' }}>
                                Automation Anywhere Software Pvt. Ltd. (AASPL) supported the creation of jobs in Kopargaon, Maharashtra - financially and through in-kind IT hardware. We also collaborate with AASPL on Robotic Process Automation.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Network Map Section */}
            <section className="section" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '100px', alignItems: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span style={{ color: 'var(--secondary)', fontWeight: '900', letterSpacing: '4px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Nationwide Delivery</span>
                            <h2 style={{ color: 'white', margin: '20px 0 30px' }}>Bridging India's <br />Digital Divide.</h2>
                            <p style={{ fontSize: '1.15rem', opacity: 0.8, marginBottom: '40px', lineHeight: '1.8' }}>
                                From rural hamlets in Karnataka to the tea gardens of Assam, we've built high-tech centers where passion meets precision.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                                {[
                                    { l: 'States Covered', v: '9' },
                                    { l: 'Rural Centers', v: '16' },
                                    { l: 'Local Languages', v: '12' },
                                    { l: 'Community Impact', v: '15,000+' }
                                ].map((stat, i) => (
                                    <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '5px' }}>{stat.v}</div>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>{stat.l}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            style={{ position: 'relative' }}
                        >
                            <img
                                src="https://www.ruralshores.com/pic/ruralshoresmap.jpg"
                                alt="Network Map"
                                style={{ width: '100%', borderRadius: '30px', filter: 'brightness(0.9) contrast(1.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: '30px',
                                left: '30px',
                                background: 'white',
                                color: 'var(--primary)',
                                padding: '12px 25px',
                                borderRadius: '100px',
                                fontWeight: '900',
                                fontSize: '0.85rem',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <MapPin size={20} color="var(--secondary)" />
                                16 HIGH-TECH OPERATIONS HUBS
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '100px 0', background: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ marginBottom: '25px' }}>Be part of the story</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
                        Partner with us to build resilient, future-ready teams - powered by rural India.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Link to="/contact" className="btn btn-primary">Let's Talk <ArrowRight size={18} /></Link>
                        <Link to="/executive-team" className="btn" style={{ background: 'var(--bg-soft)', color: 'var(--primary)', border: '1px solid var(--border)' }}>Meet Our Leadership</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
