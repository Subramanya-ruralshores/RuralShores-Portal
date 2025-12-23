import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    Camera,
    Save,
    Building2,
    ShieldCheck,
    Globe,
    Linkedin,
    Twitter
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Initialize profile with user data from context
    const [profile, setProfile] = useState({
        displayName: user?.name || 'Jr.Executive',
        role: 'Senior Operations Analyst',
        employeeId: user?.id || 'emp-1',
        email: user?.email || 'emp@ruralshores.com',
        phone: '+91 98XXX XXXXX',
        department: 'Operations',
        location: 'Hubli, India',
        reportingManager: 'Subramanya M S',
        profileImage: null
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, profileImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        // In a real app, this would be an API call
        alert('Profile saved successfully to your session!');
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
            {/* Profile Header Card */}
            <div style={{
                background: 'white',
                borderRadius: '32px',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
                <div style={{ height: '160px', background: 'linear-gradient(135deg, #1E293B 0%, #3B82F6 100%)', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: '-50px', left: '40px', display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '32px',
                                background: '#F8FAFC',
                                border: '4px solid white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '3rem',
                                fontWeight: '800',
                                color: '#3B82F6',
                                overflow: 'hidden'
                            }}>
                                {profile.profileImage ? (
                                    <img src={profile.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    profile.displayName[0]
                                )}
                            </div>
                            <input
                                type="file"
                                id="profile-upload"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <button
                                onClick={() => document.getElementById('profile-upload').click()}
                                style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    right: '-5px',
                                    background: '#0F172A',
                                    color: 'white',
                                    border: '2px solid white',
                                    borderRadius: '10px',
                                    padding: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                <Camera size={16} />
                            </button>
                        </div>
                        <div style={{ paddingBottom: '50px' }}>
                            {isEditing ? (
                                <input
                                    style={{
                                        fontSize: '1.8rem',
                                        fontWeight: '800',
                                        color: '#0F172A',
                                        background: 'rgba(255,255,255,0.8)',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: '8px',
                                        padding: '4px 12px',
                                        marginBottom: '10px'
                                    }}
                                    value={profile.displayName}
                                    onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                />
                            ) : (
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffffff', marginBottom: '4px' }}>Jr.Executive</h2>
                            )}
                            <p style={{ color: '#ffffffff', fontWeight: '600' }}>Senior Operations Analyst • emp-1</p>
                        </div>
                    </div>
                </div>

                <div style={{ padding: '70px 40px 30px', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        style={{
                            background: isEditing ? '#10B981' : '#0F172A',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        {isEditing ? <><Save size={18} /> Save Changes</> : 'Edit Profile'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
                {/* Information Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* Professional Info */}
                    <div style={{ background: 'white', padding: '32px', borderRadius: '32px', border: '1px solid #E2E8F0' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Briefcase size={20} color="#3B82F6" /> Professional Details
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Department</label>
                                {isEditing ? (
                                    <input
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                                        value={profile.department}
                                        onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                                    />
                                ) : (
                                    <div style={{ fontSize: '1rem', fontWeight: '600' }}>{profile.department}</div>
                                )}
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Reporting Manager</label>
                                {isEditing ? (
                                    <input
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                                        value={profile.manager}
                                        onChange={(e) => setProfile({ ...profile, manager: e.target.value })}
                                    />
                                ) : (
                                    <div style={{ fontSize: '1rem', fontWeight: '600' }}>{profile.manager}</div>
                                )}
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Official Email</label>
                                <div style={{ fontSize: '1rem', fontWeight: '600' }}>{profile.email}</div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Location Hub</label>
                                {isEditing ? (
                                    <input
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                                        value={profile.location}
                                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                    />
                                ) : (
                                    <div style={{ fontSize: '1rem', fontWeight: '600' }}>{profile.location}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div style={{ background: 'white', padding: '32px', borderRadius: '32px', border: '1px solid #E2E8F0' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <User size={20} color="#F59E0B" /> Personal Information
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>About Me</label>
                                {isEditing ? (
                                    <textarea
                                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }}
                                        value={profile.bio}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                        rows="3"
                                    />
                                ) : (
                                    <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6' }}>{profile.bio}</p>
                                )}
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Phone Number</label>
                                {isEditing ? (
                                    <input
                                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }}
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    />
                                ) : (
                                    <div style={{ fontSize: '1rem', fontWeight: '600' }}>{profile.phone}</div>
                                )}
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Date of Joining</label>
                                <div style={{ fontSize: '1rem', fontWeight: '600' }}>{profile.joiningDate}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Side info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div style={{ background: '#0F172A', color: 'white', padding: '32px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.1)' }}>
                        <Building2 size={32} color="#3B82F6" style={{ marginBottom: '20px' }} />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px' }}>RuralShores Business Services</h3>
                        <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.6', marginBottom: '25px' }}>
                            Proudly transforming rural India through digital jobs and high-quality business services. You are part of the world's largest rural digital operations team.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Globe size={18} color="#94A3B8" />
                            <Linkedin size={18} color="#94A3B8" />
                            <Twitter size={18} color="#94A3B8" />
                        </div>
                    </div>

                    <div style={{ background: '#F0F9FF', padding: '32px', borderRadius: '32px', border: '1px solid #BAE6FD' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                            <ShieldCheck size={24} color="#0369A1" />
                            <h4 style={{ fontWeight: '800', color: '#0369A1' }}>Certification</h4>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#0369A1', fontWeight: '600' }}>Employee Identity Verified</p>
                        <p style={{ fontSize: '0.75rem', color: '#0EA5E9', marginTop: '5px' }}>Your account is linked with biometric access and corporate SSO.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
