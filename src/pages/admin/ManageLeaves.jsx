import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X } from 'lucide-react';

const ManageLeaves = () => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('mock_leaves')) || [
            { id: 1, employee: { fullName: 'John Doe' }, startDate: '2024-01-10', endDate: '2024-01-12', type: 'Casual', reason: 'Family function', status: 'Pending' }
        ];
        setLeaves(saved);
    }, []);

    const updateStatus = (id, status) => {
        const updated = leaves.map(l => l.id === id ? { ...l, status } : l);
        setLeaves(updated);
        localStorage.setItem('mock_leaves', JSON.stringify(updated));
    };

    return (
        <div>
            <h1>Leave Requests</h1>
            <div className="card" style={{ marginTop: '32px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '12px 0' }}>Employee</th>
                            <th>Dates</th>
                            <th>Type</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '16px 0', fontWeight: '500' }}>
                                    {leave.employee?.fullName || 'Unknown'}
                                </td>
                                <td>
                                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                </td>
                                <td>{leave.type}</td>
                                <td>{leave.reason}</td>
                                <td>
                                    <span style={{
                                        padding: '4px 8px', borderRadius: '4px', fontSize: '12px',
                                        background: leave.status === 'Approved' ? '#dcfce7' : leave.status === 'Rejected' ? '#fee2e2' : '#fef9c3',
                                        color: leave.status === 'Approved' ? '#166534' : leave.status === 'Rejected' ? '#991b1b' : '#854d0e'
                                    }}>
                                        {leave.status}
                                    </span>
                                </td>
                                <td>
                                    {leave.status === 'Pending' && (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button onClick={() => updateStatus(leave.id, 'Approved')} className="btn" style={{ background: '#16a34a', color: 'white', padding: '6px' }}><Check size={16} /></button>
                                            <button onClick={() => updateStatus(leave.id, 'Rejected')} className="btn" style={{ background: '#dc2626', color: 'white', padding: '6px' }}><X size={16} /></button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageLeaves;
