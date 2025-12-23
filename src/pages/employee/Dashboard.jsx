import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    CheckCircle2,
    Clock,
    Calendar as CalendarIcon,
    Star,
    ArrowUpRight,
    Activity,
    Briefcase,
    Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const EmployeeDashboard = () => {
    const { user } = useAuth();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const metrics = [
        { label: 'Weekly Productivity', value: '94%', icon: TrendingUp, color: '#3B82F6', trend: '+2.5%' },
        { label: 'Tasks Completed', value: '28/32', icon: CheckCircle2, color: '#10B981', trend: 'On track' },
        { label: 'Attendance (MTD)', value: '18 Days', icon: Clock, color: '#F59E0B', trend: '98% punctuality' },
        { label: 'Leave Balance', value: '12 Days', icon: CalendarIcon, color: '#EF4444', trend: 'Valid till Dec' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
            {/* Hero Welcome Card */}
            <motion.div
                variants={itemVariants}
                style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
                    borderRadius: '24px',
                    padding: '40px',
                    color: 'white',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
            >
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: '#94A3B8' }}>
                        <Zap size={18} color="#F59E0B" />
                        <span style={{ fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Standard Pulse</span>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '-1px' }}>
                        Welcome to your Hub,<br />
                        <span style={{ color: '#3B82F6' }}>{user?.name || 'Jr.Executive'}</span>
                    </h1>
                    <p style={{ opacity: 0.8, maxWidth: '500px', lineHeight: '1.6', fontSize: '1.1rem' }}>
                        You have 4 tasks ending today and a team sync scheduled at 2:00 PM. Keep up the great momentum!
                    </p>
                </div>

                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '40px',
                    textAlign: 'right'
                }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1 }}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    <div style={{ color: '#94A3B8', fontWeight: '600' }}>{currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                </div>
            </motion.div>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {metrics.map((m, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
                        style={{
                            background: 'white',
                            padding: '24px',
                            borderRadius: '20px',
                            border: '1px solid #E2E8F0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ background: `${m.color}15`, color: m.color, padding: '12px', borderRadius: '12px' }}>
                                <m.icon size={24} />
                            </div>
                            <span style={{ fontSize: '0.75rem', color: m.color === '#EF4444' ? '#EF4444' : '#10B981', fontWeight: '700', background: `${m.color}10`, padding: '4px 8px', borderRadius: '10px' }}>
                                {m.trend}
                            </span>
                        </div>
                        <div>
                            <div style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>{m.label}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A' }}>{m.value}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Split */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>

                {/* Task Progress & Charts */}
                <motion.div variants={itemVariants} style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Productivity Index</h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }}></div> Target
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></div> Actual
                            </span>
                        </div>
                    </div>

                    {/* Simulated Chart */}
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '20px', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        {[65, 80, 45, 90, 70, 85, 95].map((h, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                                    style={{
                                        width: '100%',
                                        background: h > 80 ? '#10B981' : '#3B82F6',
                                        borderRadius: '6px 6px 2px 2px',
                                        opacity: 0.8
                                    }}
                                />
                                <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: '600' }}>Mon</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '20px' }}>Key Deliverables</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {[
                                { title: 'Q4 Operational Report', status: 'In Progress', progress: 75, color: '#3B82F6' },
                                { title: 'Compliance Audit - Site B', status: 'Pending', progress: 10, color: '#F59E0B' },
                                { title: 'Team Skill Assessment', status: 'Completed', progress: 100, color: '#10B981' },
                            ].map((task, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{task.title}</span>
                                            <span style={{ fontSize: '0.8rem', color: task.color, fontWeight: '700' }}>{task.status}</span>
                                        </div>
                                        <div style={{ width: '100%', height: '6px', background: '#F1F5F9', borderRadius: '10px', overflow: 'hidden' }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${task.progress}%` }}
                                                transition={{ duration: 1.5, delay: 1 }}
                                                style={{ height: '100%', background: task.color }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Info & Side Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <motion.div variants={itemVariants} style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #E2E8F0' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '25px' }}>Announcement Box</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ background: '#F59E0B20', color: '#F59E0B', padding: '10px', borderRadius: '12px', flexShrink: 0 }}>
                                    <Star size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '4px' }}>Annual Townhall</div>
                                    <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: '1.5' }}>Scheduled for Friday at 3:00 PM. Presence is mandatory for all leads.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ background: '#3B82F620', color: '#3B82F6', padding: '10px', borderRadius: '12px', flexShrink: 0 }}>
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '4px' }}>System Maintenance</div>
                                    <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: '1.5' }}>Portal will be down for 2 hours on Sunday for security updates.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        style={{
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            borderRadius: '24px',
                            padding: '32px',
                            color: 'white'
                        }}
                    >
                        <Briefcase size={32} color="rgba(255,255,255,0.4)" style={{ marginBottom: '15px' }} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '10px', color: 'white' }}>Quick Referral</h3>
                        <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '20px', lineHeight: '1.5' }}>Refer a candidate for the Senior Analyst role and earn a bonus of ₹5,000.</p>
                        <button style={{
                            background: 'white',
                            color: '#059669',
                            border: 'none',
                            padding: '12px 20px',
                            borderRadius: '12px',
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            Refer Now <ArrowUpRight size={16} />
                        </button>
                    </motion.div>
                </div>

            </div>
        </motion.div>
    );
};

export default EmployeeDashboard;
