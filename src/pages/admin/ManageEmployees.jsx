import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, User, Edit } from 'lucide-react';

const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '', email: '', password: 'welcome123',
        department: '', designation: '', salary: '', dateOfJoining: ''
    });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('mock_employees')) || [
            { id: 1, fullName: 'John Doe', employeeId: 'RS001', designation: 'Senior Associate', department: 'Operations', dateOfJoining: '2022-01-01' }
        ];
        setEmployees(saved);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmp = {
            ...formData,
            id: Date.now(),
            employeeId: 'RS' + Math.floor(Math.random() * 1000).toString().padStart(3, '0')
        };
        const updated = [...employees, newEmp];
        setEmployees(updated);
        localStorage.setItem('mock_employees', JSON.stringify(updated));
        alert('Employee Added Successfully');
        setShowForm(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1>Manage Employees</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    <Plus size={20} /> Add New Employee
                </button>
            </div>

            {showForm && (
                <div className="card" style={{ marginBottom: '32px' }}>
                    <h3 style={{ marginBottom: '20px' }}>New Employee Details</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <input className="input" placeholder="Full Name" required onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                        <input className="input" type="email" placeholder="Email" required onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        <input className="input" placeholder="Department" required onChange={e => setFormData({ ...formData, department: e.target.value })} />
                        <input className="input" placeholder="Designation" required onChange={e => setFormData({ ...formData, designation: e.target.value })} />
                        <input className="input" type="number" placeholder="Salary" required onChange={e => setFormData({ ...formData, salary: e.target.value })} />
                        <input className="input" type="date" required onChange={e => setFormData({ ...formData, dateOfJoining: e.target.value })} />
                        <button className="btn btn-primary" style={{ gridColumn: 'span 2' }}>Create Employee Account</button>
                    </form>
                </div>
            )}

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '12px 0' }}>Name</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '500' }}>{emp.fullName}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>{emp.employeeId}</div>
                                    </div>
                                </td>
                                <td>{emp.designation}</td>
                                <td>{emp.department}</td>
                                <td>{new Date(emp.dateOfJoining).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn" style={{ padding: '4px', color: 'var(--text-light)' }}><Edit size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageEmployees;
