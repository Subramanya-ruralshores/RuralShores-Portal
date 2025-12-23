import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    Clock,
    CheckCircle2,
    AlertCircle,
    Plus,
    History,
    FileText,
    ChevronDown,
    X
} from 'lucide-react';

const Leaves = () => {
    const [isApplying, setIsApplying] = useState(false);

    const balances = [
        { type: 'Casual Leave', code: 'CL', balance: 8, total: 12, color: '#3B82F6' },
        { type: 'Earned Leave', code: 'EL', balance: 14, total: 24, color: '#10B981' },
        { type: 'Sick Leave', code: 'SL', balance: 5, total: 6, color: '#F59E0B' },
        { type: 'Privilege Leave', code: 'PL', balance: 2, total: 10, color: '#6366F1' },
    ];

    const history = [
        { id: 1, type: 'CL', start: '2025-11-12', end: '2025-11-13', status: 'Approved', reason: 'Personal errands' },
        { id: 2, type: 'EL', start: '2025-10-01', end: '2025-10-05', status: 'Approved', reason: 'Family vacation' },
        { id: 3, type: 'SL', start: '2025-09-15', end: '2025-09-15', status: 'Approved', reason: 'Medical - Fever' },
        { id: 4, type: 'CL', start: '2025-12-24', end: '2025-12-26', status: 'Pending', reason: 'Holiday trip' },
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
            {/* Header section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Leave Management</h1>
                    <p style={{ color: '#64748B' }}>Track and manage your vacation and time-off requests.</p>
                </div>
                <button
                    onClick={() => setIsApplying(true)}
                    style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)'
                    }}
                >
                    <Plus size={20} /> Apply Now
                </button>
            </div>

            {/* Balance Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {balances.map((b, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        style={{
                            background: 'white',
                            padding: '24px',
                            borderRadius: '24px',
                            border: '1px solid #E2E8F0',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ background: `${b.color}15`, color: b.color, width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                <Calendar size={20} />
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>{b.balance} / {b.total}</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748B' }}>{b.type} Days</div>
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: 0, left: 0,
                            height: '4px',
                            width: `${(b.balance / b.total) * 100}%`,
                            background: b.color,
                            borderRadius: '0 4px 4px 0'
                        }}></div>
                    </motion.div>
                ))}
            </div>

            {/* History Table */}
            <motion.div
                style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '32px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
                    <History size={20} color="#3B82F6" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Recent Applications</h3>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #F1F5F9' }}>
                                <th style={{ padding: '16px', color: '#64748B', fontWeight: '600', fontSize: '0.85rem' }}>LEAVE TYPE</th>
                                <th style={{ padding: '16px', color: '#64748B', fontWeight: '600', fontSize: '0.85rem' }}>DURATION</th>
                                <th style={{ padding: '16px', color: '#64748B', fontWeight: '600', fontSize: '0.85rem' }}>REASON</th>
                                <th style={{ padding: '16px', color: '#64748B', fontWeight: '600', fontSize: '0.85rem' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((h) => (
                                <tr key={h.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '32px', height: '32px', borderRadius: '8px',
                                                background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '0.75rem', fontWeight: '800'
                                            }}>{h.type}</div>
                                            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{h.type === 'CL' ? 'Casual' : h.type === 'EL' ? 'Earned' : 'Sick'} Leave</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', fontSize: '0.9rem', color: '#475569' }}>
                                        {new Date(h.start).toLocaleDateString()} to {new Date(h.end).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '16px', fontSize: '0.9rem', color: '#64748B' }}>{h.reason}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            background: h.status === 'Approved' ? '#DCFCE7' : '#FEF3C7',
                                            color: h.status === 'Approved' ? '#15803D' : '#D97706'
                                        }}>
                                            {h.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Application Modal */}
            <AnimatePresence>
                {isApplying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(15, 23, 42, 0.4)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={{
                                background: 'white',
                                width: '100%',
                                maxWidth: '600px',
                                borderRadius: '32px',
                                padding: '40px',
                                boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>New Leave Request</h2>
                                <button
                                    onClick={() => setIsApplying(false)}
                                    style={{ background: '#F1F5F9', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                alert('Leave application submitted successfully!');
                                setIsApplying(false);
                            }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '10px', color: '#475569' }}>Leave Category</label>
                                        <select style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }}>
                                            <option>Casual Leave (CL)</option>
                                            <option>Earned Leave (EL)</option>
                                            <option>Sick Leave (SL)</option>
                                            <option>Privilege Leave (PL)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '10px', color: '#475569' }}>Start Date</label>
                                        <input type="date" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '10px', color: '#475569' }}>End Date</label>
                                        <input type="date" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '10px', color: '#475569' }}>Detailed Reason</label>
                                        <textarea rows="4" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', resize: 'none' }} placeholder="Why are you taking leave?"></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        background: '#0F172A',
                                        color: 'white',
                                        border: 'none',
                                        padding: '16px',
                                        borderRadius: '16px',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Submit Application
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Leaves;
