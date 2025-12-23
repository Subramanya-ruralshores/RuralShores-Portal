import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, ChevronRight, Globe, Shield, Activity, Search, Building2, Server, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OurCenters = () => {
    const centers = [
        {
            name: 'Bengaluru',
            state: 'Karnataka',
            officeName: 'RuralShores Office – Bengaluru',
            address: 'RuralShores Business Services Pvt. Ltd, #135/2, Maruthi Industrial Estate, Adjacent to Hotel Zuri, ITPL Road, Hoodi, Whitefield, Bangalore - 560 048',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Business Services Pvt. Ltd, Hoodi, Whitefield, Bangalore'
        },
        {
            name: 'Noida',
            state: 'Uttar Pradesh',
            officeName: 'RuralShores Office – Noida',
            address: 'RuralShores Business Services Pvt LTd, B-15, Sector-2, Noida Uttar Pradesh, 201301',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Business Services Pvt LTd, Sector-2, Noida'
        },
        {
            name: 'Bagepalli',
            state: 'Karnataka',
            officeName: 'RuralShores Centre – Bagepalli',
            address: 'RuralShores Centre, Sri Sathya Sai Nagar, Chickaballapur Dist, Bagepalli, Karnataka - 561 207.',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Centre, Bagepalli, Karnataka'
        },
        {
            name: 'Thirthahalli',
            state: 'Karnataka',
            officeName: 'RuralShores Centre – Thirthahalli',
            address: 'RuralShores Centre, Ambedkar Bhavan, Bettamakki, Shimoga District, Thirthahalli - 577 432.',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Centre, Thirthahalli, Karnataka'
        },
        {
            name: 'Bhiloda',
            state: 'Gujarat',
            officeName: 'RuralShores Centre – Bhiloda',
            address: 'RuralShores Centre, 1st Floor Arbuda Complex Opp. Gangasagar Borewell Dholwani Teen Rasta, Bhiloda, Gujarat - 383 245.',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Centre, Bhiloda, Gujarat'
        },
        {
            name: 'Sausar',
            state: 'Madhya Pradesh',
            officeName: 'RuralShores Centre – Sausar',
            address: 'RuralShores Centre, Vasundhara Lawn, Belgaun Naka, Chindwara Dist, Sausar, MP - 480 106.',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Centre, Sausar, Madhya Pradesh'
        },
        {
            name: 'Dhawalgaon',
            state: 'Maharashtra',
            officeName: 'RuralShores Centre – Dhawalgaon',
            address: 'RuralShores Centre, Karkhana Chowk, Tal. Shrigonda, Dist Ahmednagar, Dhawalgaon, Maharastra - 413 702',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Centre, Dhawalgaon, Maharashtra'
        },
        {
            name: 'Kopargaon',
            state: 'Maharashtra',
            officeName: 'RuralShores Centre – Kopargaon',
            address: 'RuralShores Centre, Sanjivini Sugar Factory Hall, Off Station Road, P.O. Shingnapur, Kopargaon, Maharastra - 423 603.',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Centre, Kopargaon, Maharashtra'
        },
        {
            name: 'Pulla',
            state: 'Andhra Pradesh',
            officeName: 'RuralShores Centre – Pulla',
            address: 'RuralShores Centre, Behind Vinayaka Temple, NH 5 Road, Bhimadolu Mandal, West Godavari District, Pulla, AP - 534 401.',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Centre, Pulla, Andhra Pradesh'
        },
        {
            name: 'Rathinagiri',
            state: 'Tamil Nadu',
            officeName: 'RuralShores Centre – Rathinagiri',
            address: 'RuralShores Centre, No:93/2, Kilminnal Post, Rathiangiri, Vellore - 632 517.',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Centre, Rathinagiri, Tamil Nadu'
        },
        {
            name: 'Sonari',
            state: 'Uttar Pradesh',
            officeName: 'RuralShores Centre – Sonari',
            address: 'RuralShores Centre, NH-24, Sitarasoin P.O., Tehsil - Sidhauli, Sitapur Dist, Sonari, UP - 261 303.',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Centre, Sonari, Uttar Pradesh'
        },
        {
            name: 'Uthiramerur',
            state: 'Tamil Nadu',
            officeName: 'RuralShores Centre – Uthiramerur',
            address: 'RuralShores Centre, Mission School Street, Kanchipuram District, Uthiramerur, Tamil Nadu - 603 406.',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Centre, Uthiramerur, Tamil Nadu'
        },
        {
            name: 'Jaleswar',
            state: 'Odisha',
            officeName: 'RuralShores Centre – Jaleswar',
            address: 'RuralShores Centre, Century Plaza, Hospital bypass, New bazar, Jaleswar, Odisha - 756 032.',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Centre, Jaleswar, Odisha'
        },
        {
            name: 'Baitalpur',
            state: 'Uttar Pradesh',
            officeName: 'RuralShores Centre – Baitalpur',
            address: 'RuralShores Centre, MB Complex, Deoria Dist, Baitalpur, UP - 274 201.',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Centre, Baitalpur, Uttar Pradesh'
        },
        {
            name: 'Garchuk',
            state: 'Assam',
            officeName: 'RuralShores Centre – Garchuk',
            address: 'RuralShores Business Services Private Limited, Agni Shanti Towers, 2nd Floor, N.H.37, Garchuk, Guwahati, Assam - 781035.',
            email: 'info@ruralshores.com',
            mapQuery: 'RuralShores Business Services Private Limited, Garchuk, Guwahati'
        },
        {
            name: 'Jambusar',
            state: 'Gujarat',
            officeName: 'RuralShores Centre – Jambusar',
            address: 'PI Foundation Skill Training Center, Jambusar, Gujarat.',
            email: 'info@ruralshores.com',
            mapQuery: 'PI Foundation Skill Training Center, Jambusar, Gujarat'
        }
    ];

    const states = [...new Set(centers.map(c => c.state))].sort();
    const [activeState, setActiveState] = useState(states[0]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCenters = centers.filter(c => {
        const matchesState = c.state === activeState;
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.officeName.toLowerCase().includes(searchQuery.toLowerCase());
        return searchQuery ? matchesSearch : matchesState;
    });

    return (
        <div style={{ background: 'var(--bg-soft)' }}>
            {/* Smooth Light Hero */}
            <section className="hero" style={{
                paddingTop: '160px',
                paddingBottom: '80px',
                background: 'var(--primary-gradient)',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at bottom center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                    zIndex: 0
                }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.75rem' }}>Our Centers Across India</span>
                        <h1 style={{ color: 'white', marginTop: '15px' }}>
                            Delivery centers enabling <br />
                            <span style={{ color: 'var(--accent)' }}>secure, reliable operations.</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '800px', margin: '20px auto 0', lineHeight: '1.6' }}>
                            And inclusive employment - closer to your customers and communities.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search & Stats */}
            <section style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 3fr',
                        gap: '30px',
                        alignItems: 'center'
                    }}>
                        <div className="glass-card" style={{ padding: '0', background: 'white', border: '1px solid var(--border)', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', alignItems: 'center', padding: '15px 25px' }}>
                                <Search size={20} color="var(--text-light)" />
                                <input
                                    type="text"
                                    placeholder="Search by Center Name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        border: 'none',
                                        padding: '10px 15px',
                                        flex: 1,
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        color: 'var(--text-main)'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '1px',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            background: 'white',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                            border: '1px solid var(--border)'
                        }}>
                            {[
                                { label: 'Active Centers', val: '16', icon: <Building2 size={20} /> },
                                { label: 'Pan-India Coverage', val: '09 States', icon: <MapPin size={20} /> },
                                { label: 'Secure Facilities', val: '100%', icon: <Shield size={20} /> }
                            ].map((stat, i) => (
                                <div key={i} style={{ padding: '20px', textAlign: 'center', background: 'white' }}>
                                    <div style={{ color: 'var(--secondary)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '2px' }}>{stat.val}</div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--text-light)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Directory Section */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '50px', alignItems: 'start' }}>

                        {/* Sidebar */}
                        <aside style={{ position: 'sticky', top: '120px' }}>
                            <div style={{ marginBottom: '30px' }}>
                                <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--primary-dark)', fontWeight: '800' }}>Where We Operate</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '25px', lineHeight: '1.6' }}>
                                    Explore our pan-India presence. Each center is engineered for security, uptime, and talent access.
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {states.map(state => (
                                        <button
                                            key={state}
                                            onClick={() => {
                                                setActiveState(state);
                                                setSearchQuery('');
                                            }}
                                            style={{
                                                textAlign: 'left',
                                                padding: '14px 20px',
                                                borderRadius: '12px',
                                                border: '1px solid',
                                                borderColor: (activeState === state && !searchQuery) ? 'var(--primary)' : 'transparent',
                                                background: (activeState === state && !searchQuery) ? 'var(--primary)' : 'white',
                                                color: (activeState === state && !searchQuery) ? 'white' : 'var(--text-main)',
                                                fontWeight: '700',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {state}
                                            {(activeState === state && !searchQuery) && <ChevronRight size={16} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Results */}
                        <main>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeState + searchQuery}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div style={{ display: 'grid', gap: '30px' }}>
                                        {filteredCenters.map((center, i) => (
                                            <div
                                                key={center.name}
                                                className="glass-card"
                                                style={{
                                                    padding: '0',
                                                    display: 'grid',
                                                    gridTemplateColumns: '1.2fr 1fr',
                                                    minHeight: '300px',
                                                    overflow: 'hidden',
                                                    background: 'white'
                                                }}
                                            >
                                                <div style={{ padding: '40px' }}>
                                                    <div style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        padding: '4px 12px',
                                                        background: 'rgba(79, 70, 229, 0.05)',
                                                        color: 'var(--primary)',
                                                        borderRadius: '100px',
                                                        fontSize: '0.7rem',
                                                        fontWeight: '800',
                                                        marginBottom: '20px'
                                                    }}>
                                                        CENTER IN {center.state.toUpperCase()}
                                                    </div>
                                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--primary-dark)', fontWeight: '800' }}>{center.officeName}</h3>

                                                    <div style={{ display: 'grid', gap: '20px' }}>
                                                        <div style={{ display: 'flex', gap: '15px' }}>
                                                            <div style={{
                                                                width: '36px',
                                                                height: '36px',
                                                                borderRadius: '10px',
                                                                background: 'rgba(14, 165, 233, 0.1)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0
                                                            }}>
                                                                <MapPin size={18} color="var(--secondary)" />
                                                            </div>
                                                            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: 0, lineHeight: '1.6' }}>{center.address}</p>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                                            <div style={{
                                                                width: '36px',
                                                                height: '36px',
                                                                borderRadius: '10px',
                                                                background: 'rgba(14, 165, 233, 0.1)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0
                                                            }}>
                                                                <Mail size={18} color="var(--secondary)" />
                                                            </div>
                                                            <a href={`mailto:${center.email}`} style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem' }}>{center.email}</a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style={{ background: '#E2E8F0', position: 'relative' }}>
                                                    <iframe
                                                        title={center.name}
                                                        width="100%"
                                                        height="100%"
                                                        style={{ border: 0 }}
                                                        loading="lazy"
                                                        src={`https://maps.google.com/maps?q=${encodeURIComponent(center.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                                    ></iframe>
                                                </div>
                                            </div>
                                        ))}
                                        {filteredCenters.length === 0 && (
                                            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-light)' }}>
                                                No centers found matching your search.
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OurCenters;
