import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, Calendar, User, Mail, MessageSquare, Filter, ChevronDown, Trash2 } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

const ManageTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, open, in_progress, resolved
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Fetch initial data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [ticketsRes, statsRes] = await Promise.all([
                axios.get(API_ENDPOINTS.SUPPORT.LIST, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }),
                axios.get(API_ENDPOINTS.SUPPORT.STATS, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            ]);
            setTickets(ticketsRes.data);
            setStats(statsRes.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch tickets", err);
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.patch(API_ENDPOINTS.SUPPORT.STATUS(id), { status: newStatus }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            fetchData(); // Refresh data
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update ticket status");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this ticket?")) return;
        try {
            await axios.delete(`${API_ENDPOINTS.SUPPORT.LIST}/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setTickets(tickets.filter(t => t.id !== id));
            // Update stats locally or refetch
            fetchData();
        } catch (err) {
            console.error("Failed to delete ticket", err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'open': return '#ef4444'; // Red
            case 'in_progress': return '#f59e0b'; // Amber
            case 'resolved': return '#10b981'; // Green
            default: return '#6b7280';
        }
    };

    const filteredTickets = tickets.filter(ticket => {
        if (filter === 'all') return true;
        return ticket.status === filter;
    });

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>Support Center</h1>
                <p style={{ color: 'var(--text-light)' }}>Manage and track all incoming support inquiries.</p>
            </div>

            {/* Stats Overview */}
            {stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
                    {[
                        { label: 'Total Tickets', value: stats.total, color: '#6366f1', icon: <MessageSquare size={24} /> },
                        { label: 'Open', value: stats.open, color: '#ef4444', icon: <AlertCircle size={24} /> },
                        { label: 'In Progress', value: stats.in_progress, color: '#f59e0b', icon: <Clock size={24} /> },
                        { label: 'Resolved', value: stats.resolved, color: '#10b981', icon: <CheckCircle size={24} /> },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', background: 'white' }}>
                            <div style={{ background: `${stat.color}20`, color: stat.color, padding: '16px', borderRadius: '16px' }}>
                                {stat.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b' }}>{stat.value}</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Filters */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '30px' }}>
                {['all', 'open', 'in_progress', 'resolved'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '12px',
                            border: '1px solid',
                            borderColor: filter === f ? getStatusColor(f === 'all' ? 'resolved' : f) : '#e2e8f0',
                            background: filter === f ? `${getStatusColor(f === 'all' ? 'resolved' : f)}10` : 'white',
                            color: filter === f ? getStatusColor(f === 'all' ? 'resolved' : f) : '#64748b',
                            fontWeight: '600',
                            textTransform: 'capitalize',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        {f.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* Ticket List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>Loading tickets...</div>
                ) : filteredTickets.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>No tickets found.</div>
                ) : (
                    filteredTickets.map(ticket => (
                        <motion.div
                            key={ticket.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: 'white',
                                padding: '24px',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                display: 'grid',
                                gridTemplateColumns: 'minmax(300px, 1fr) 200px 200px 100px',
                                gap: '20px',
                                alignItems: 'center'
                            }}
                        >
                            {/* Main Info */}
                            <div>
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                                    <span style={{
                                        fontSize: '0.75rem', fontWeight: '800', padding: '4px 10px', borderRadius: '20px',
                                        background: `${getStatusColor(ticket.status)}20`, color: getStatusColor(ticket.status),
                                        textTransform: 'uppercase'
                                    }}>
                                        {ticket.status.replace('_', ' ')}
                                    </span>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>#{ticket.id}</span>
                                </div>
                                <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '8px' }}>{ticket.subject || ticket.category}</h3>
                                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>{ticket.message}</p>
                                <div style={{ display: 'flex', gap: '20px', marginTop: '16px', fontSize: '0.9rem', color: '#64748b' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} /> {ticket.name}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> {ticket.email}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {new Date(ticket.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Category */}
                            <div style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '600' }}>
                                {ticket.category}
                            </div>

                            {/* Actions Status */}
                            <div>
                                <select
                                    value={ticket.status}
                                    onChange={(e) => handleStatusUpdate(ticket.id, e.target.value)}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '8px',
                                        border: '1px solid #cbd5e1',
                                        width: '100%',
                                        background: '#f8fafc',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="open">Open</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                </select>
                            </div>

                            {/* Delete */}
                            <div style={{ textAlign: 'right' }}>
                                <button
                                    onClick={() => handleDelete(ticket.id)}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '8px',
                                        border: '1px solid #fee2e2',
                                        background: '#fef2f2',
                                        color: '#ef4444',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageTickets;
