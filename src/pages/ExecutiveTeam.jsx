import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, ChevronRight, Briefcase, GraduationCap, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const MemberCard = ({ member, index, isBoard }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-card"
            style={{
                padding: '0',
                display: 'grid',
                gridTemplateColumns: isEven ? '380px 1fr' : '1fr 380px',
                marginBottom: '50px',
                minHeight: '450px',
                background: 'var(--glass-gradient)'
            }}
        >
            {/* Image Section */}
            <div style={{
                position: 'relative',
                overflow: 'hidden',
                order: isEven ? 0 : 1,
                background: 'var(--soft-gradient)'
            }}>
                <img
                    src={member.image}
                    alt={member.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 10%',
                        transition: 'transform 1.5s cubic-bezier(0.2, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    alignItems: 'center',
                    left: isEven ? '30px' : 'auto',
                    right: isEven ? 'auto' : '30px',
                    background: isBoard ? 'var(--secondary)' : 'var(--primary)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '100px',
                    fontSize: '0.65rem',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(5px)'
                }}>
                    {isBoard ? 'Board Member' : 'Executive Management'}
                </div>
            </div>

            {/* Content Section */}
            <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '2.4rem', color: '#111827', marginBottom: '8px', fontWeight: '900', letterSpacing: '-1.5px' }}>{member.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ height: '2px', width: '30px', background: 'var(--secondary)' }}></div>
                        <p style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {member.role}
                        </p>
                    </div>
                </div>

                <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px', opacity: 0.9 }}>
                    {member.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', marginBottom: '30px' }}>
                    <div>
                        <h4 style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Star size={14} color="var(--secondary)" /> Expertise
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {member.expertise.map((exp, i) => (
                                <span key={i} style={{ background: 'var(--bg-soft)', color: 'var(--primary)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700', border: '1px solid rgba(10, 43, 85, 0.05)' }}>
                                    {exp}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Briefcase size={14} color="var(--secondary)" /> Background
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {member.experience.slice(0, 2).map((role, i) => (
                                <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                    <ChevronRight size={14} color="var(--secondary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                                    <span>{role}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '30px', paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
                    {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                            style={{
                                color: '#0077b5',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                textDecoration: 'none',
                                fontWeight: '900',
                                fontSize: '0.8rem',
                                letterSpacing: '1px'
                            }}
                        >
                            <Linkedin size={18} fill="#0077b5" color="white" />
                            <span>PROFESSIONAL BRIEF</span>
                        </a>
                    )}
                    {member.education && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: '600' }}>
                            <GraduationCap size={18} color="var(--secondary)" />
                            <span>{member.education}</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};


const ExecutiveTeam = () => {
    const boardMembers = [
        {
            name: 'Murali Vullaganti',
            role: 'Co-Founder, Director',
            image: 'https://www.ruralshores.com/pic/Murali%20Vullaganti.png',
            linkedin: 'https://www.linkedin.com/in/murali-vullaganti-a578371a/',
            description: 'Murali was formerly Managing Director of Xansa India and Regional Director, EDS Asia Pacific. Founder and Executive Chairman of PeopleShores Inc., USA.',
            expertise: ['IT & BPO Operations', 'Strategic Advisory', 'Social Entrepreneurship', 'Technology Leadership'],
            experience: ['Managing Director – Xansa India', 'Regional Director – EDS Asia Pacific', 'Executive Chairman – PeopleShores Inc., USA'],
            education: 'Masters from BIT Pilani and Post Graduate from IIT Kharagpur.'
        },
        {
            name: 'G Srinivasan',
            role: 'Co-Founder, Director',
            image: 'https://www.ruralshores.com/pic/G%20Srinivasan%201.png',
            linkedin: 'https://www.linkedin.com/in/srinivasan-g-6b1616/',
            description: 'Work experience of over 40 years in Finance, Planning and Marketing in Wimco, SRF and Wipro Finance. Partner in CDI Global Inc.',
            expertise: ['Strategic Financial Consulting', 'Investment Banking', 'M&A Advisory', 'Social Entrepreneurship'],
            experience: ['Co-Founder & Director - Dawn Consulting Group', 'Partner - CDI Global Inc.', 'Corporate Finance - Wimco, SRF, Wipro'],
            education: 'PGDM from IIM Ahmedabad. B.Com from Vivekananda College.'
        },
        {
            name: 'Mohamed Amersi',
            role: 'Director',
            image: 'https://www.ruralshores.com/pic/Mohamed%20Amersi.png',
            linkedin: 'https://www.linkedin.com/in/mohamed-amersi/',
            description: 'British businessman and philanthropist. Chairman of Inclusive Ventures Group and Founder Chairman of Amersi Foundation.',
            expertise: ['Business Leadership', 'Philanthropy', 'Corporate Governance', 'Strategic Investments'],
            experience: ['Chairman - Inclusive Ventures Group', 'Founder Chairman - Amersi Foundation'],
            education: 'Cambridge and Oxford Graduate.'
        },
        {
            name: 'Arshad Sayyad',
            role: 'Director',
            image: 'https://www.ruralshores.com/pic/ArshadCEO.jpeg',
            linkedin: 'https://www.linkedin.com/in/arshadsayyad/',
            description: 'Headed Fidelity Investments and Managing Director at Accenture. Leadership roles in Wipro, Cap Gemini and Cognizant.',
            expertise: ['Investment Management', 'Cloud Business', 'Technology Consulting', 'Strategic Management'],
            experience: ['Head - Fidelity Investments', 'Managing Director - Accenture', 'Leadership - Wipro, Cap Gemini'],
            education: 'Engineer and MBA from Carnegie Mellon University.'
        },
        {
            name: 'Shobhna Gupta',
            role: 'Director',
            image: 'https://www.ruralshores.com/pic/Shobhna%20Gupta.png',
            linkedin: 'https://www.linkedin.com/in/shobhna-gupta-99022310/',
            description: 'Served as CFO in Multinational Organisations such as FedEx Middle East for more than 25 years. Financial Advisor to large Social projects.',
            expertise: ['Financial Leadership', 'BPO Operations', 'Social Service Projects', 'International Finance'],
            experience: ['CFO - FedEx MEIA', 'CFO - Mezzan Group, Middle East'],
            education: 'Chartered Accountant (England & Wales) with KPMG London.'
        }
    ];

    const execTeam = [
        {
            name: 'Tarun Singhal',
            role: 'Group Chief Executive Officer',
            image: 'https://www.ruralshores.com/pic/Tarun%20Singhal%20(6).png',
            linkedin: 'https://www.linkedin.com/in/tarun-singhal-4625551/',
            description: 'High-energy leader with three decades of global experience in scaling businesses and transforming cost centers into profit centers.',
            expertise: ['Leadership', 'Integrated Sales & Operations', 'Business Transformation', 'Market Strategy'],
            experience: ['Leadership roles at Sopra Steria, HCL, and Perot Systems', 'Senior management at Oracle and CA Technologies'],
            education: 'MBA, Marketing. Chevening Scholar.'
        },
        {
            name: 'Ganesh Naidu',
            role: 'GM & Head of Administration',
            image: 'https://www.ruralshores.com/pic/Ganesh%20Naidu.png',
            linkedin: '',
            description: 'IIM Bangalore alumnus and Armed Forces veteran with 20+ years of expertise in administration, IT, and operational leadership.',
            expertise: ['Administration', 'Facilities Management', 'IT Operations', 'Compliance'],
            experience: ['General Manager – RuralShores', '20+ years in Indian Armed Forces'],
            education: 'Alumnus, IIM Bangalore.'
        },
        {
            name: 'Himansu',
            role: 'AVP & Head of IT',
            image: 'https://www.ruralshores.com/pic/Himansu.png',
            linkedin: '',
            description: 'Seasoned technology leader with 24+ years of experience in steering IT strategy, digital transformation, and operational excellence.',
            expertise: ['IT Governance', 'Cloud Adoption', 'Enterprise Architecture', 'Digital Transformation'],
            experience: ['AVP & Head of IT – RuralShores', 'Leadership - Hinduja Global Solutions', 'Leadership - Altruist Technologies'],
            education: 'MBA, KSOU.'
        },
        {
            name: 'Maharaja Gokulavasan',
            role: 'Executive Vice President, Operations',
            image: 'https://www.ruralshores.com/pic/Maharaja%20Gokulavasan.png',
            linkedin: 'https://www.linkedin.com/in/maharaja-gokulavasan-b0445743/',
            description: '34 years of experience, Maharaja has led operations in Karur Vysya Bank, IDBI, HDFC, TCS and Standard Chartered.',
            expertise: ['BPO & KPO Delivery', 'Banking & Financial', 'Service Excellence', 'Operations'],
            experience: ['EVP Operations - RuralShores', 'Roles - Standard Chartered & TCS'],
            education: 'Bachelor’s - Loyola College, Chennai.'
        },
        {
            name: 'Neeraj Agarwal',
            role: 'CEO - RuralShores Skill Academy',
            image: 'https://www.ruralshores.com/pic/Neeraj%20Agarwal.png',
            linkedin: 'https://www.linkedin.com/in/neeraj-agarwal-706343/',
            description: 'Over two decades at NIIT and an IIT Delhi education, Neeraj leads RSA in empowering rural youth with employability skills.',
            expertise: ['Skilling', 'Workforce Development', 'Corporate Partnerships', 'Rural Empowerment'],
            experience: ['CEO - RuralShores Skills Academy', 'Senior positions at NIIT Ltd'],
            education: 'Graduate of IIT Delhi.'
        },
        {
            name: 'Prem Aiyappa',
            role: 'VP Operations',
            image: 'https://www.ruralshores.com/pic/Prem%20Aiyappa.png',
            linkedin: 'https://www.linkedin.com/in/prem-aiyappa-85564323/',
            description: 'Over 25 years of expertise in client engagement and delivery across domestic and international processes.',
            expertise: ['Client Engagement', 'Rural Workforce Development', 'Account Management', 'Process Optimization'],
            experience: ['15 years at RuralShores', 'Domestic & International process leadership'],
            education: 'MBA - Welingkar Institute of Management.'
        },
        {
            name: 'Raj Kumar Daheriya',
            role: 'Head of Service Delivery – Insurance',
            image: 'https://www.ruralshores.com/pic/Raj%20Kumar%20Daheriya1.png',
            linkedin: 'https://www.linkedin.com/in/rajkumar-daheriya-a8019547/',
            description: 'Leads the Insurance vertical, driving operational excellence and elevating customer experience with 15+ years experience.',
            expertise: ['Service Delivery', 'Insurance Domain', 'Customer Experience', 'Organizational Development'],
            experience: ['15+ years with RuralShores since inception', 'Insurance Vertical Lead'],
            education: 'MBA, Sri Sathya Sai Institute of Higher Learning.'
        },
        {
            name: 'Rajesh Tiwari',
            role: 'Associate Vice President',
            image: 'https://www.ruralshores.com/pic/Rajesh%20Tiwari.png',
            linkedin: '',
            description: '20+ years of experience in managing BPO operations across E-commerce, Telecom, and Healthcare.',
            expertise: ['BPO Operations', 'Process Excellence', 'Customer Experience', 'Training'],
            experience: ['Leadership roles at Digical', 'Senior management at Aegis'],
            education: 'Bachelor of Arts - IGNOU.'
        },
        {
            name: 'Shobhit Sharma',
            role: 'Head of Branding & Marketing',
            image: 'https://www.ruralshores.com/pic/Shobhit%20Sharma.png',
            linkedin: '',
            description: 'Visionary leader with 20+ years of experience in strategy, operations, HR, and social impact across India and the US.',
            expertise: ['Branding Strategy', 'Social Impact', 'Business Transformation', 'Marketing'],
            experience: ['Leadership roles in corporates and startups', 'P&L ownership across mission-driven ventures'],
            education: 'Bachelor of Commerce - Delhi University.'
        },
        {
            name: 'Sindhu Girish',
            role: 'AVP & Head of Human Resources',
            image: 'https://www.ruralshores.com/pic/Sindhu%20Girish.png',
            linkedin: 'https://www.linkedin.com/in/sindhu-girish-8a739346/',
            description: '20+ years of expertise in talent management, workforce planning, and organizational design.',
            expertise: ['Talent Management', 'Workforce Planning', 'Diversity & Inclusion', 'HR Strategy'],
            experience: ['AVP & Head of HR – RuralShores (10+ years)', 'HR leadership Roles'],
            education: 'Bachelor of Science. Diploma in HR.'
        },
        {
            name: 'Syed Hyder Mehdi',
            role: 'Head of Compliance and Quality',
            image: 'https://www.ruralshores.com/pic/Syed%20Hyder%20Mehdi.png',
            linkedin: '',
            description: 'Accomplished IT Service Management consultant with deep expertise in ITIL® alignment, process training, and audit management.',
            expertise: ['ITSM', 'Quality Assurance', 'Compliance', 'Audit Management'],
            experience: ['ITSM Consultant', 'Audit Leader', 'Process Trainer'],
            education: 'Certified in ITIL®.'
        },
        {
            name: 'Vijay Krishna',
            role: 'Head of Finance',
            image: 'https://www.ruralshores.com/pic/Vijay%20Krishna%20(2).png',
            linkedin: '',
            description: 'Finance professional specializing in Accounts Payable with a focus on reporting and compliance.',
            expertise: ['Financial Reporting', 'Accounts Payable', 'Compliance', 'Oracle ERP'],
            experience: ['Finance Manager – RuralShores', 'Manager - Bharti Airtel'],
            education: 'Finance Professional.'
        }
    ];

    return (
        <div style={{ background: '#FFFFFF' }}>
            {/* Minimalist Corporate Hero */}
            <section className="hero" style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'var(--primary-gradient)',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at center, rgba(231, 76, 60, 0.1) 0%, transparent 70%)',
                    zIndex: 0
                }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.75rem' }}>Pedigree & Experience</span>
                        <h1 style={{ color: 'white', marginTop: '15px' }}>
                            Our Strategic <br />
                            <span style={{ color: 'var(--accent)' }}>Leadership.</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '800px', margin: '25px auto 0', lineHeight: '1.6' }}>
                            A team of industry veterans bridging the gap between global corporate standards and rural potential.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="section">
                <div className="container">
                    {/* Board Section */}
                    <div style={{ marginBottom: '140px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                            <span style={{ color: 'var(--secondary)', fontWeight: '900', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase' }}>The Stewards</span>
                            <h2 style={{ color: 'var(--primary)', marginTop: '10px' }}>Board of Directors</h2>
                        </div>
                        <div>
                            {boardMembers.map((member, i) => (
                                <MemberCard key={i} member={member} index={i} isBoard={true} />
                            ))}
                        </div>
                    </div>

                    {/* Executive Section */}
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: '900', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase' }}>The Operators</span>
                            <h2 style={{ color: 'var(--primary)', marginTop: '10px' }}>Executive Management</h2>
                        </div>
                        <div>
                            {execTeam.map((member, i) => (
                                <MemberCard key={i} member={member} index={i + boardMembers.length} isBoard={false} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <section style={{ padding: '100px 0', background: 'var(--bg-soft)', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ marginBottom: '25px' }}>Inspired by Our Mission?</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '40px', maxWidth: '750px', margin: '0 auto 40px', lineHeight: '1.6' }}>
                        Join a company that values expertise as much as it values social impact.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Link to="/contact" className="btn btn-primary">Connect with Us</Link>
                        <Link to="/about" className="btn" style={{ background: 'white', border: '1px solid var(--border)', color: 'var(--primary)' }}>Our Full Story</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExecutiveTeam;

