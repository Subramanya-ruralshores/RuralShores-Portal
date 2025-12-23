import React, { useState } from 'react';
import {
    Users,
    MessageSquare,
    Activity,
    Trash2,
    Edit,
    CheckCircle,
    XCircle,
    ShieldCheck,
    FileText,
    BarChart3,
    Clock,
    X,
    Save,
    AlertCircle,
    Eye,
    LifeBuoy,
    UserPlus,
    Search,
    ArrowUpRight,
    Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom'; // New import

const AdminDashboard = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // Personnel Data (all @ruralshores.com)
    const [users, setUsers] = useState([
        { id: 1, name: 'Subramanya M S', email: 'subramanya@ruralshores.com', role: 'Super Admin', verified: true, joined: '10/12/2025' },
        { id: 2, name: 'Thilak Singh', email: 'thilak.singh@ruralshores.com', role: 'Team Lead', verified: true, joined: '17/12/2025' },
        { id: 3, name: 'Annajappa', email: 'annajappa@ruralshores.com', role: 'Sr. Executive', verified: true, joined: '15/12/2025' },
        { id: 4, name: 'Guruprasad', email: 'guruprasad@ruralshores.com', role: 'Associate', verified: false, joined: '15/12/2025' },
        { id: 5, name: 'Purushotham V', email: 'purushotham@ruralshores.com', role: 'Executive', verified: true, joined: '19/12/2025' },
    ]);

    // Help Desk Data
    const [requests, setRequests] = useState([
        {
            id: 1,
            user: 'Purushotham V',
            email: 'purushotham@ruralshores.com',
            subject: 'Payroll Sync Issue',
            message: 'My recent allowance updates are not reflecting in the December payslip.',
            status: 'resolved',
            date: '19/12/2025'
        },
        {
            id: 2,
            user: 'Guruprasad',
            email: 'guruprasad@ruralshores.com',
            subject: 'HR Form Error',
            message: 'Unable to upload my educational certificates to the Discovery form.',
            status: 'pending',
            date: '18/12/2025'
        },
        {
            id: 3,
            user: 'Thilak Singh',
            email: 'thilak.singh@ruralshores.com',
            subject: 'Asset Request',
            message: 'Requesting a replacement for my workstation headset.',
            status: 'pending',
            date: '17/12/2025'
        },
    ]);

    const [editingUser, setEditingUser] = useState(null);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Associate', verified: false });
    const [viewingRequest, setViewingRequest] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deletingItem, setDeletingItem] = useState(null); // { id, type, name }

    // Handlers
    const handleVerify = (id) => {
        setUsers(users.map(u => u.id === id ? { ...u, verified: !u.verified } : u));
    };

    const handleDeleteUser = (id) => {
        const user = users.find(u => u.id === id);
        setDeletingItem({ id, type: 'USER', name: user.name });
    };

    const handleSaveUser = (e) => {
        e.preventDefault();
        setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
        setEditingUser(null);
    };

    const handleResolve = (id) => {
        setRequests(requests.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
        setViewingRequest(null);
    };

    const handleDeleteRequest = (id) => {
        const req = requests.find(r => r.id === id);
        setDeletingItem({ id, type: 'REQUEST', name: req.subject });
    };

    const confirmDeletion = () => {
        if (!deletingItem) return;

        if (deletingItem.type === 'USER') {
            setUsers(users.filter(u => u.id !== deletingItem.id));
        } else if (deletingItem.type === 'REQUEST') {
            setRequests(requests.filter(r => r.id !== deletingItem.id));
            setViewingRequest(null);
        }
        setDeletingItem(null);
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        const id = users.length + 1;
        const joined = new Date().toLocaleDateString('en-GB');
        setUsers([...users, { ...newUser, id, joined }]);
        setIsAddingUser(false);
        setNewUser({ name: '', email: '', role: 'Associate', verified: false });
    };

    const handleExportCSV = () => {
        const headers = ['ID', 'Name', 'Email', 'Role', 'Verified', 'Joined'];
        const rows = users.map(u => [u.id, u.name, u.email, u.role, u.verified ? 'Yes' : 'No', u.joined]);
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `ruralshores_personnel_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Render Helpers
    const renderOverview = () => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <Users size={24} />
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '600', marginBottom: '4px' }}>Global Workforce</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A' }}>{users.length}</div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <LifeBuoy size={24} />
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '600', marginBottom: '4px' }}>Open Tickets</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A' }}>{requests.filter(r => r.status === 'pending').length}</div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <ShieldCheck size={24} />
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '600', marginBottom: '4px' }}>Verified Assets</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A' }}>{users.filter(u => u.verified).length}</div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <Activity size={24} />
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '600', marginBottom: '4px' }}>System Health</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#059669' }}>Operational</div>
                </div>
            </div>

            {/* HR Forms Section */}
            <div style={{ background: '#0F172A', borderRadius: '32px', padding: '40px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                        <div>
                            <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>HR Discovery Hub</h2>
                            <p style={{ color: '#94A3B8', maxWidth: '500px' }}>Access and manage critical onboarding, skill mapping, and compliance forms across all centers.</p>
                        </div>
                        <button style={{ padding: '12px 24px', background: 'white', color: '#0F172A', borderRadius: '14px', border: 'none', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            View All Forms <ArrowUpRight size={18} />
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                        {[
                            { name: 'Skill Assessment v2', responses: 124, status: 'Active' },
                            { name: 'Onboarding Kit', responses: 45, status: 'Review' },
                            { name: 'Compliance 2025', responses: 312, status: 'Compulsory' }
                        ].map((form, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '8px' }}>{form.name}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#64748B' }}>{form.responses} submissions</span>
                                    <span style={{ fontSize: '0.75rem', padding: '4px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}>{form.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const renderUsers = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                <div style={{ padding: '24px 32px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A' }}>Personnel Directory</h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                style={{ padding: '8px 12px 8px 36px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.9rem', width: '200px' }}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleExportCSV}
                            style={{ padding: '8px 16px', background: 'white', color: '#0F172A', border: '1px solid #E2E8F0', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                            <Download size={16} /> Export
                        </button>
                        <button
                            onClick={() => setIsAddingUser(true)}
                            style={{ padding: '8px 16px', background: '#0F172A', color: 'white', border: 'none', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                            <UserPlus size={16} /> Add Member
                        </button>
                    </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', background: '#F8FAFC' }}>
                                <th style={{ padding: '16px 32px', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Identity</th>
                                <th style={{ padding: '16px 32px', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Center Role</th>
                                <th style={{ padding: '16px 32px', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Security Level</th>
                                <th style={{ padding: '16px 32px', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Join Date</th>
                                <th style={{ padding: '16px 32px', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase())).map((u) => (
                                <tr key={u.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                    <td style={{ padding: '20px 32px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#F1F5F9', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#475569' }}>{u.name[0]}</div>
                                            <div>
                                                <div style={{ fontWeight: '700', color: '#0F172A' }}>{u.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 32px' }}>
                                        <span style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700', background: '#F1F5F9', color: '#475569' }}>{u.role}</span>
                                    </td>
                                    <td style={{ padding: '20px 32px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{
                                                width: '8px', height: '8px', borderRadius: '50%',
                                                background: u.verified ? '#10B981' : '#F59E0B',
                                                boxShadow: u.verified ? '0 0 12px #10B981' : '0 0 12px #F59E0B',
                                                animation: 'pulse 2s infinite'
                                            }}></div>
                                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: u.verified ? '#059669' : '#D97706' }}>
                                                {u.verified ? 'Top Level' : 'Pending'}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 32px', fontSize: '0.9rem', color: '#64748B' }}>{u.joined}</td>
                                    <td style={{ padding: '20px 32px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button onClick={() => handleVerify(u.id)} style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#10B981' }} title="Verify Identity"><ShieldCheck size={18} /></button>
                                            <button onClick={() => setEditingUser(u)} style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#3B82F6' }} title="Edit Profile"><Edit size={18} /></button>
                                            <button onClick={() => handleDeleteUser(u.id)} style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#EF4444' }} title="Delete Profile"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );

    const renderHelp = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
                {requests.map((req) => (
                    <motion.div
                        key={req.id}
                        whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                        style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '28px', transition: 'all 0.3s' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <div style={{
                                padding: '6px 14px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '800',
                                background: req.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                color: req.status === 'pending' ? '#D97706' : '#059669',
                                textTransform: 'uppercase',
                                border: `1px solid ${req.status === 'pending' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`
                            }}>
                                {req.status}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600' }}>{req.date}</div>
                        </div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>{req.subject}</h4>
                        <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: '1.6', marginBottom: '24px' }}>{req.message}</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F1F5F9', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#0F172A' }}>{req.user[0]}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0F172A' }}>{req.user}</div>
                                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{req.email}</div>
                            </div>
                            <button onClick={() => setViewingRequest(req)} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '12px', cursor: 'pointer', color: '#64748B' }}>
                                <Eye size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.4); opacity: 0.5; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </motion.div>
    );

    return (
        <div style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* Page Header */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-1px' }}>
                    {currentPath === '/admin' || currentPath === '/admin/' ? 'Strategic Overview' : currentPath.includes('users') ? 'Personnel Matrix' : 'Center Support'}
                </h1>
                <p style={{ color: '#64748B', fontSize: '1.1rem' }}>Welcome back to the Command Center.</p>
            </div>

            {/* View Dispatcher */}
            {currentPath === '/admin' || currentPath === '/admin/' ? renderOverview() : null}
            {currentPath.includes('users') ? renderUsers() : null}
            {currentPath.includes('help-requests') ? renderHelp() : null}

            {/* Modals */}
            <AnimatePresence>
                {editingUser && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000 }}>
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} style={{ background: 'white', padding: '40px', borderRadius: '32px', width: '450px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Modify Profile</h3>
                                <button onClick={() => setEditingUser(null)} style={{ padding: '8px', borderRadius: '10px', border: 'none', background: '#F1F5F9', cursor: 'pointer' }}><X size={20} /></button>
                            </div>
                            <form onSubmit={handleSaveUser}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px', display: 'block' }}>Full Name</label>
                                        <input style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingUser.name} onChange={e => setEditingUser({ ...editingUser, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px', display: 'block' }}>Corporate Email</label>
                                        <input style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingUser.email} onChange={e => setEditingUser({ ...editingUser, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px', display: 'block' }}>Designation</label>
                                        <select style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingUser.role} onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}>
                                            <option>Super Admin</option>
                                            <option>Team Lead</option>
                                            <option>Sr. Executive</option>
                                            <option>Executive</option>
                                            <option>Associate</option>
                                            <option>Trainee</option>
                                        </select>
                                    </div>
                                    <button type="submit" style={{ width: '100%', padding: '16px', background: '#0F172A', color: 'white', borderRadius: '14px', border: 'none', fontWeight: '700', marginTop: '10px', cursor: 'pointer' }}>Update Personnel Record</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

                {isAddingUser && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000 }}>
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} style={{ background: 'white', padding: '40px', borderRadius: '32px', width: '450px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Register New Member</h3>
                                <button onClick={() => setIsAddingUser(false)} style={{ padding: '8px', borderRadius: '10px', border: 'none', background: '#F1F5F9', cursor: 'pointer' }}><X size={20} /></button>
                            </div>
                            <form onSubmit={handleAddMember}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px', display: 'block' }}>Full Name</label>
                                        <input required style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} placeholder="Ex: Rahul Sharma" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px', display: 'block' }}>Corporate Email</label>
                                        <input required type="email" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} placeholder="rahul@ruralshores.com" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px', display: 'block' }}>Designation</label>
                                        <select style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                                            <option>Super Admin</option>
                                            <option>Team Lead</option>
                                            <option>Sr. Executive</option>
                                            <option>Executive</option>
                                            <option>Associate</option>
                                            <option>Trainee</option>
                                        </select>
                                    </div>
                                    <button type="submit" style={{ width: '100%', padding: '16px', background: '#0F172A', color: 'white', borderRadius: '14px', border: 'none', fontWeight: '700', marginTop: '10px', cursor: 'pointer' }}>Register Personnel</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

                {viewingRequest && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', z_index: 3000 }}>
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} style={{ background: 'white', padding: '40px', borderRadius: '32px', width: '500px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <div style={{ padding: '6px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '800', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>Ticket #{viewingRequest.id}</div>
                                <button onClick={() => setViewingRequest(null)} style={{ padding: '8px', borderRadius: '10px', border: 'none', background: '#F1F5F9', cursor: 'pointer' }}><X size={20} /></button>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px' }}>{viewingRequest.subject}</h3>
                            <p style={{ color: '#64748B', lineHeight: '1.7', marginBottom: '32px' }}>{viewingRequest.message}</p>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                {viewingRequest.status === 'pending' && (
                                    <button onClick={() => handleResolve(viewingRequest.id)} style={{ flex: 1, padding: '14px', background: '#10B981', color: 'white', borderRadius: '12px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Resolve Issue</button>
                                )}
                                <button onClick={() => {
                                    handleDeleteRequest(viewingRequest.id);
                                    setViewingRequest(null);
                                }} style={{ flex: 1, padding: '14px', background: 'white', color: '#EF4444', borderRadius: '12px', border: '1px solid #EF4444', fontWeight: '700', cursor: 'pointer' }}>Delete Ticket</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {deletingItem && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.8)', backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 4000 }}>
                        <motion.div
                            initial={{ scale: 0.8, rotateX: 20 }}
                            animate={{ scale: 1, rotateX: 0 }}
                            style={{
                                background: 'white',
                                padding: '40px',
                                borderRadius: '40px',
                                width: '450px',
                                textAlign: 'center',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '30px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#EF4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                                animation: 'shake 0.5s ease-in-out infinite alternate'
                            }}>
                                <Trash2 size={40} />
                            </div>

                            <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0F172A', marginBottom: '16px', letterSpacing: '-0.5px' }}>
                                Permanent Wipe Request
                            </h3>

                            <p style={{ color: '#64748B', lineHeight: '1.6', marginBottom: '32px', fontSize: '1.05rem' }}>
                                You are about to permanently delete <strong>{deletingItem.name}</strong>. This action is irreversible and will remove all associated meta-data.
                            </p>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button
                                    onClick={() => setDeletingItem(null)}
                                    style={{
                                        flex: 1,
                                        padding: '16px',
                                        borderRadius: '16px',
                                        background: '#F1F5F9',
                                        border: 'none',
                                        color: '#475569',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeletion}
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
                                    Confirm Wipe <ShieldCheck size={18} />
                                </button>
                            </div>

                            <style>{`
                                @keyframes shake {
                                    from { transform: translateY(-2px); }
                                    to { transform: translateY(2px); }
                                }
                            `}</style>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
