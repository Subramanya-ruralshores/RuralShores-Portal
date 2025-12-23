import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash, X, Save, AlertCircle, CheckCircle2, Image as ImageIcon, Link as LinkIcon, Type } from 'lucide-react';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null);
    const [notification, setNotification] = useState(null);
    const [deletingService, setDeletingService] = useState(null); // { id, title }

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'Sparkles',
        image_url: '',
        link: '',
        key_benefits: '',
        use_cases: '',
        deliverables: '',
        is_active: true
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.SERVICES.BASE);
            setServices(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            showNotification('Error fetching services', 'error');
            setLoading(false);
        }
    };

    const showNotification = (msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleOpenModal = (service = null) => {
        if (service) {
            setCurrentService(service);
            setFormData({
                title: service.title,
                description: service.description,
                icon: service.icon,
                image_url: service.image_url,
                link: service.link || '',
                key_benefits: service.key_benefits.join(', '),
                use_cases: service.use_cases.join(', '),
                deliverables: service.deliverables.join(', '),
                is_active: service.is_active ?? true
            });
        } else {
            setCurrentService(null);
            setFormData({
                title: '',
                description: '',
                icon: 'Sparkles',
                image_url: '',
                link: '',
                key_benefits: '',
                use_cases: '',
                deliverables: '',
                is_active: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            id: currentService?.id,
            key_benefits: formData.key_benefits.split(',').map(s => s.trim()).filter(Boolean),
            use_cases: formData.use_cases.split(',').map(s => s.trim()).filter(Boolean),
            deliverables: formData.deliverables.split(',').map(s => s.trim()).filter(Boolean)
        };

        try {
            if (currentService) {
                // Update (Note: Add PUT route to backend if needed, or use POST with ID)
                await axios.post(API_ENDPOINTS.SERVICES.BASE, formattedData); // Re-using POST for simplicity if it handles upsert, or update logic
                showNotification('Service updated successfully');
            } else {
                await axios.post(API_ENDPOINTS.SERVICES.BASE, formattedData);
                showNotification('New service added');
            }
            fetchServices();
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            showNotification('Failed to save service', 'error');
        }
    };

    const handleDelete = (id) => {
        const service = services.find(s => s.id === id);
        setDeletingService({ id, title: service.title });
    };

    const confirmDelete = async () => {
        if (!deletingService) return;
        try {
            await axios.delete(`${API_ENDPOINTS.SERVICES.BASE}/${deletingService.id}`);
            showNotification('Service removed from ecosystem');
            fetchServices();
            setDeletingService(null);
        } catch (err) {
            showNotification('Error decommissioning service', 'error');
        }
    };

    const toggleStatus = async (service) => {
        try {
            const updated = { ...service, is_active: !service.is_active };
            await axios.post(API_ENDPOINTS.SERVICES.BASE, updated);
            showNotification(`Service ${updated.is_active ? 'Activated' : 'Deactivated'}`);
            fetchServices();
        } catch (err) {
            showNotification('Failed to toggle status', 'error');
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Manage Services</h1>
                    <p style={{ color: 'var(--text-light)' }}>Dynamic content management for the portal offerings.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="btn btn-primary"
                    style={{ borderRadius: '12px', padding: '12px 24px' }}
                >
                    <Plus size={20} /> Add New Service
                </button>
            </div>

            {/* Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: '40px',
                            right: '40px',
                            padding: '16px 24px',
                            background: notification.type === 'error' ? '#fee2e2' : '#dcfce7',
                            color: notification.type === 'error' ? '#ef4444' : '#16a34a',
                            borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            zIndex: 2000,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontWeight: '600'
                        }}
                    >
                        {notification.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                        {notification.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px'
            }}>
                {loading ? (
                    <div>Loading services...</div>
                ) : services.map((service) => (
                    <motion.div
                        key={service.id}
                        layout
                        style={{
                            background: 'var(--bg-card)',
                            borderRadius: '16px',
                            border: '1px solid var(--border)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                            <img src={service.image_url} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: service.is_active ? 'none' : 'grayscale(100%)' }} />
                            <div style={{
                                position: 'absolute', top: '12px', right: '12px',
                                background: service.is_active ? '#16a34a' : '#64748b',
                                color: 'white', padding: '4px 12px', borderRadius: '20px',
                                fontSize: '0.7rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px'
                            }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }}></div>
                                {service.is_active ? 'ACTIVE' : 'OFFLINE'}
                            </div>
                        </div>
                        <div style={{ padding: '20px', flex: 1 }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: service.is_active ? 'inherit' : 'var(--text-light)' }}>{service.title}</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: '1.5', marginBottom: '20px' }}>
                                {service.description.substring(0, 100)}...
                            </p>
                        </div>
                        <div style={{
                            padding: '16px 20px',
                            background: 'var(--bg-soft)',
                            borderTop: '1px solid var(--border)',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px',
                            alignItems: 'center'
                        }}>
                            <button
                                onClick={() => toggleStatus(service)}
                                title={service.is_active ? 'Turn Off' : 'Turn On'}
                                style={{
                                    background: service.is_active ? 'rgba(22, 163, 74, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                                    border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer',
                                    color: service.is_active ? '#16a34a' : '#64748b',
                                    display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '700'
                                }}
                            >
                                {service.is_active ? 'ON' : 'OFF'}
                            </button>
                            <button
                                onClick={() => handleOpenModal(service)}
                                style={{ background: 'white', border: '1px solid var(--border)', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: 'var(--primary)' }}
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(service.id)}
                                style={{ background: 'white', border: '1px solid var(--border)', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#ef4444' }}
                            >
                                <Trash size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(15, 23, 42, 0.4)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 1500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{
                                background: 'white',
                                width: '100%',
                                maxWidth: '700px',
                                borderRadius: '24px',
                                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                maxHeight: '90vh'
                            }}
                        >
                            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
                                    {currentService ? 'Edit Service' : 'Add New Service'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '32px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}>Service Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}>Icon Name (Lucide)</label>
                                        <input
                                            type="text"
                                            value={formData.icon}
                                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                            placeholder="e.g. Brain, Cpu, Megaphone"
                                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}>Short Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none', minHeight: '100px', resize: 'vertical' }}
                                        required
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}>Image URL</label>
                                        <input
                                            type="text"
                                            value={formData.image_url}
                                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}>Navigation Link (Optional)</label>
                                        <input
                                            type="text"
                                            value={formData.link}
                                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                            placeholder="/gen-ai"
                                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}>Key Benefits (Comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.key_benefits}
                                        onChange={(e) => setFormData({ ...formData, key_benefits: e.target.value })}
                                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}
                                        required
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}>Use Cases (Comma separated)</label>
                                        <input
                                            type="text"
                                            value={formData.use_cases}
                                            onChange={(e) => setFormData({ ...formData, use_cases: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}>Deliverables (Comma separated)</label>
                                        <input
                                            type="text"
                                            value={formData.deliverables}
                                            onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Visibility Status</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>If turned off, this service will be hidden from the public portal.</div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                                        style={{
                                            width: '60px', height: '32px', borderRadius: '20px',
                                            background: formData.is_active ? '#16a34a' : '#cbd5e1',
                                            border: 'none', position: 'relative', cursor: 'pointer', transition: 'all 0.3s'
                                        }}
                                    >
                                        <div style={{
                                            width: '24px', height: '24px', borderRadius: '50%', background: 'white',
                                            position: 'absolute', top: '4px', left: formData.is_active ? '32px' : '4px',
                                            transition: 'all 0.3s'
                                        }}></div>
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ width: '100%', borderRadius: '12px', padding: '16px', fontSize: '1rem' }}
                                >
                                    <Save size={20} /> {currentService ? 'Save Changes' : 'Create Service'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
                {/* Deletion Confirmation Modal */}
                {deletingService && (
                    <div style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(2, 6, 23, 0.8)',
                        backdropFilter: 'blur(12px)',
                        zIndex: 2000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}>
                        <motion.div
                            initial={{ scale: 0.8, rotateX: 20 }}
                            animate={{ scale: 1, rotateX: 0 }}
                            style={{
                                background: 'white',
                                padding: '40px',
                                borderRadius: '40px',
                                width: '100%',
                                maxWidth: '450px',
                                textAlign: 'center',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '24px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#EF4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px'
                            }}>
                                <Trash size={40} />
                            </div>

                            <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0F172A', marginBottom: '16px', letterSpacing: '-0.5px' }}>
                                Decommission Service
                            </h3>

                            <p style={{ color: '#64748B', lineHeight: '1.6', marginBottom: '32px', fontSize: '1.05rem' }}>
                                You are about to permanently remove <strong>{deletingService.title}</strong> from the portal. This configuration cannot be recovered.
                            </p>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button
                                    onClick={() => setDeletingService(null)}
                                    style={{
                                        flex: 1,
                                        padding: '16px',
                                        borderRadius: '16px',
                                        background: '#F1F5F9',
                                        border: 'none',
                                        color: '#475569',
                                        fontWeight: '700',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    style={{
                                        flex: 1.5,
                                        padding: '16px',
                                        borderRadius: '16px',
                                        background: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
                                        border: 'none',
                                        color: 'white',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 20px rgba(239, 68, 68, 0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    Confirm Wipe <Save size={18} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default ManageServices;
