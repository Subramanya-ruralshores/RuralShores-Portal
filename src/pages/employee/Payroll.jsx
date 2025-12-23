import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard,
    Download,
    Eye,
    ChevronRight,
    Building2,
    User,
    Calendar,
    Printer,
    CheckCircle2,
    X,
    FileText,
    Wallet
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Payroll = () => {
    const { user } = useAuth();
    const [selectedSlip, setSelectedSlip] = useState(null);

    const mockSlips = [
        { id: 1, month: 'December', year: 2025, base: 45000, hra: 18000, da: 9000, special: 3000, pf: 5400, tax: 2500, status: 'Paid', date: 'Dec 31, 2025' },
        { id: 2, month: 'November', year: 2025, base: 45000, hra: 18000, da: 9000, special: 3000, pf: 5400, tax: 2500, status: 'Paid', date: 'Nov 30, 2025' },
        { id: 3, month: 'October', year: 2025, base: 45000, hra: 18000, da: 9000, special: 3000, pf: 5400, tax: 2500, status: 'Paid', date: 'Oct 31, 2025' },
        { id: 4, month: 'September', year: 2025, base: 42000, hra: 16800, da: 8400, special: 2000, pf: 5040, tax: 2000, status: 'Paid', date: 'Sep 30, 2025' },
    ];

    const calculateNet = (slip) => {
        const earnings = slip.base + slip.hra + slip.da + slip.special;
        const deductions = slip.pf + slip.tax;
        return earnings - deductions;
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Payroll & Payslips</h1>
                    <p style={{ color: '#64748B' }}>Access your monthly earnings breakdown and download tax documents.</p>
                </div>
                <div style={{ background: '#F0F9FF', padding: '12px 20px', borderRadius: '16px', border: '1px solid #BAE6FD', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Wallet color="#0369A1" size={24} />
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0369A1', textTransform: 'uppercase' }}>Current Salary</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A' }}>₹ 75,000.00 <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '500' }}>/ month</span></div>
                    </div>
                </div>
            </div>

            {/* Payslip History Table */}
            <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
                    <FileText size={20} color="#3B82F6" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Payment History</h3>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #F1F5F9' }}>
                                <th style={{ padding: '16px', color: '#64748B', fontWeight: '600', fontSize: '0.85rem' }}>MONTH / YEAR</th>
                                <th style={{ padding: '16px', color: '#64748B', fontWeight: '600', fontSize: '0.85rem' }}>GROSS SALARY</th>
                                <th style={{ padding: '16px', color: '#64748B', fontWeight: '600', fontSize: '0.85rem' }}>NET PAYABLE</th>
                                <th style={{ padding: '16px', color: '#64748B', fontWeight: '600', fontSize: '0.85rem' }}>STATUS</th>
                                <th style={{ padding: '16px', color: '#64748B', fontWeight: '600', fontSize: '0.85rem', textAlign: 'right' }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockSlips.map((slip) => (
                                <tr key={slip.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A' }}>{slip.month}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{slip.year}</div>
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: '600', color: '#475569' }}>
                                        ₹ {(slip.base + slip.hra + slip.da + slip.special).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: '800', color: '#10B981' }}>
                                        ₹ {calculateNet(slip).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803D', fontSize: '0.85rem', fontWeight: '700', background: '#DCFCE7', padding: '6px 12px', borderRadius: '20px', width: 'fit-content' }}>
                                            <CheckCircle2 size={14} /> {slip.status}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <button
                                            onClick={() => setSelectedSlip(slip)}
                                            style={{ background: '#F1F5F9', border: 'none', padding: '10px 16px', borderRadius: '10px', color: '#3B82F6', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                                            <Eye size={16} /> View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payslip Detail Modal */}
            <AnimatePresence>
                {selectedSlip && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="no-print"
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{
                                background: 'white', width: '90%', maxWidth: '900px', maxHeight: '90vh',
                                borderRadius: '32px', padding: '40px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                                overflowY: 'auto'
                            }}
                        >
                            <div className="printable-content">
                                {/* Payslip Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #F1F5F9', paddingBottom: '30px', marginBottom: '30px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <Building2 size={40} color="#3B82F6" />
                                        <div>
                                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A' }}>RuralShores Business Services</h2>
                                            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Maruthi Industrial Estate, Kanakapura Road, Bangalore</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#3B82F6' }}>PAYSLIP</h3>
                                        <p style={{ fontWeight: '700', color: '#0F172A' }}>{selectedSlip.month} {selectedSlip.year}</p>
                                    </div>
                                </div>

                                {/* Employee Details Section */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '40px', background: '#F8FAFC', padding: '24px', borderRadius: '20px' }}>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' }}>Employee Name</label>
                                        <div style={{ fontWeight: '800', color: '#0F172A' }}>{user?.name || 'Employee Executive'}</div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' }}>Employee ID</label>
                                        <div style={{ fontWeight: '800', color: '#0F172A' }}>RS-2025-042</div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' }}>Location</label>
                                        <div style={{ fontWeight: '800', color: '#0F172A' }}>Bangalore Hub</div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' }}>Designation</label>
                                        <div style={{ fontWeight: '800', color: '#0F172A' }}>Senior Analyst</div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' }}>Bank Account</label>
                                        <div style={{ fontWeight: '800', color: '#0F172A' }}>XXXX XXXX 8291</div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' }}>Payment Date</label>
                                        <div style={{ fontWeight: '800', color: '#0F172A' }}>{selectedSlip.date}</div>
                                    </div>
                                </div>

                                {/* Salary Table */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
                                    {/* Earnings */}
                                    <div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '800', borderBottom: '2px solid #3B82F6', paddingBottom: '10px', marginBottom: '20px' }}>Earnings</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#475569', fontWeight: '600' }}>Basic Salary</span>
                                                <span style={{ fontWeight: '700' }}>₹ {selectedSlip.base.toLocaleString()}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#475569', fontWeight: '600' }}>House Rent Allowance (HRA)</span>
                                                <span style={{ fontWeight: '700' }}>₹ {selectedSlip.hra.toLocaleString()}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#475569', fontWeight: '600' }}>Dearness Allowance (DA)</span>
                                                <span style={{ fontWeight: '700' }}>₹ {selectedSlip.da.toLocaleString()}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#475569', fontWeight: '600' }}>Special Performance Bonus</span>
                                                <span style={{ fontWeight: '700' }}>₹ {selectedSlip.special.toLocaleString()}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #E2E8F0' }}>
                                                <span style={{ fontWeight: '800', color: '#0F172A' }}>Gross Earnings</span>
                                                <span style={{ fontWeight: '800', color: '#0F172A' }}>₹ {(selectedSlip.base + selectedSlip.hra + selectedSlip.da + selectedSlip.special).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Deductions */}
                                    <div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '800', borderBottom: '2px solid #EF4444', paddingBottom: '10px', marginBottom: '20px' }}>Deductions</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#475569', fontWeight: '600' }}>Provident Fund (PF)</span>
                                                <span style={{ fontWeight: '700', color: '#EF4444' }}>₹ {selectedSlip.pf.toLocaleString()}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#475569', fontWeight: '600' }}>Income Tax (TDS)</span>
                                                <span style={{ fontWeight: '700', color: '#EF4444' }}>₹ {selectedSlip.tax.toLocaleString()}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #E2E8F0' }}>
                                                <span style={{ fontWeight: '800', color: '#0F172A' }}>Total Deductions</span>
                                                <span style={{ fontWeight: '800', color: '#EF4444' }}>₹ {(selectedSlip.pf + selectedSlip.tax).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary Footer */}
                                <div style={{ background: '#0F172A', color: 'white', padding: '30px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', opacity: 0.7, fontWeight: '600', textTransform: 'uppercase' }}>Net Payable Amount</div>
                                        <div style={{ fontSize: '2rem', fontWeight: '800' }}>₹ {calculateNet(selectedSlip).toLocaleString()}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.85rem', opacity: 0.7, fontWeight: '600' }}>Computer Generated Document</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                                            <CheckCircle2 size={16} color="#10B981" /> Verified Secure
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div className="no-print" style={{ display: 'flex', gap: '15px', marginTop: '40px', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => setSelectedSlip(null)}
                                    style={{ background: '#F1F5F9', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', color: '#64748B' }}>
                                    Close
                                </button>
                                <button
                                    onClick={handlePrint}
                                    style={{ background: '#3B82F6', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Printer size={18} /> Print / Download PDF
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Print Styling */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    .no-print { display: none !important; }
                    body { visibility: hidden; }
                    .printable-content { 
                        visibility: visible; 
                        position: absolute; 
                        left: 0; 
                        top: 0; 
                        width: 100%;
                        padding: 20px;
                    }
                }
            `}} />
        </motion.div>
    );
};

export default Payroll;
