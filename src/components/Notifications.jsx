import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const fetchUnreadCount = async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.NOTIFICATIONS.UNREAD, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setUnreadCount(res.data.unread);
        } catch (err) {
            console.error("Failed to fetch unread count", err);
        }
    };

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_ENDPOINTS.NOTIFICATIONS.BASE, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setNotifications(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch notifications", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnreadCount();

        // Poll every minute
        const interval = setInterval(fetchUnreadCount, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
            // Mark count as read locally? No, wait explicitly.
        }
    }, [isOpen]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMarkAsRead = async (id, link) => {
        try {
            await axios.patch(API_ENDPOINTS.NOTIFICATIONS.READ(id), {}, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
            if (link) {
                setIsOpen(false);
                navigate(link);
            }
        } catch (err) {
            console.error("Failed to mark as read", err);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await axios.patch(API_ENDPOINTS.NOTIFICATIONS.READ_ALL, {}, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            setUnreadCount(0);
        } catch (err) {
            console.error("Failed to mark all read", err);
        }
    };

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    color: 'var(--text-main)'
                }}
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        background: '#ef4444',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        style={{
                            position: 'absolute',
                            top: '50px',
                            right: '0',
                            width: '360px',
                            background: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            border: '1px solid var(--border)',
                            zIndex: 1000,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '500px'
                        }}
                    >
                        <div style={{
                            padding: '16px',
                            borderBottom: '1px solid var(--border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: '#f8fafc'
                        }}>
                            <h3 style={{ margin: 0, fontSize: '1rem' }}>Notifications</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllRead}
                                    style={{
                                        border: 'none',
                                        background: 'none',
                                        color: 'var(--primary)',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>

                        <div style={{ overflowY: 'auto', flex: 1 }}>
                            {loading ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
                            ) : notifications.length === 0 ? (
                                <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No notifications</div>
                            ) : (
                                notifications.map(notif => (
                                    <div
                                        key={notif.id}
                                        onClick={() => handleMarkAsRead(notif.id, notif.link)}
                                        style={{
                                            padding: '16px',
                                            borderBottom: '1px solid var(--border)',
                                            background: notif.is_read ? 'white' : '#f0f9ff',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s',
                                            display: 'flex',
                                            gap: '12px'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = notif.is_read ? 'white' : '#f0f9ff'}
                                    >
                                        <div style={{
                                            width: '8px', height: '8px', borderRadius: '50%',
                                            background: notif.is_read ? 'transparent' : 'var(--primary)',
                                            marginTop: '6px'
                                        }}></div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '4px', color: '#1e293b' }}>
                                                {notif.title}
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
                                                {notif.message}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '8px' }}>
                                                {new Date(notif.created_at).toLocaleDateString()} • {new Date(notif.created_at).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Notifications;
