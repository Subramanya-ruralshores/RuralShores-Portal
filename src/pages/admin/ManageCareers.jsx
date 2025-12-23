import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import { Plus, Edit, Trash, Eye } from 'lucide-react';

const ManageCareers = () => {
    const [careers, setCareers] = useState([]);

    useEffect(() => {
        axios.get(API_ENDPOINTS.CMS.CAREERS)
            .then(res => setCareers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1>Manage Careers</h1>
                <button className="btn btn-primary"><Plus size={20} /> Post New Job</button>
            </div>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '12px 0' }}>Job Title</th>
                            <th>Location</th>
                            <th>Apps</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {careers.map((career, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '16px 0', fontWeight: '500' }}>{career.title}</td>
                                <td>{career.location}</td>
                                <td>{career.applications?.length || 0}</td>
                                <td><span style={{ padding: '4px 8px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '12px' }}>{career.status}</span></td>
                                <td>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button style={{ background: 'none', border: 'none', color: 'var(--text-light)' }}><Eye size={18} /></button>
                                        <button style={{ background: 'none', border: 'none', color: 'var(--text-light)' }}><Edit size={18} /></button>
                                        <button style={{ background: 'none', border: 'none', color: '#ef4444' }}><Trash size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCareers;
