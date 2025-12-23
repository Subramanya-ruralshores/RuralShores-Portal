import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    Megaphone, Shield, Brain, Sparkles, Cpu, Phone,
    FileText, Code, Database, Calculator, ArrowRight, CheckCircle2, X, TrendingUp, Users, Clock, Award
} from 'lucide-react';

const Services = () => {
    const [flippedIndex, setFlippedIndex] = useState(null);
    const [activeServices, setActiveServices] = useState([]);
    const navigate = useNavigate();

    const iconMap = {
        Megaphone: <Megaphone size={28} />,
        Shield: <Shield size={28} />,
        Brain: <Brain size={28} />,
        Sparkles: <Sparkles size={28} />,
        Cpu: <Cpu size={28} />,
        Phone: <Phone size={28} />,
        FileText: <FileText size={28} />,
        Code: <Code size={28} />,
        Database: <Database size={28} />,
        Calculator: <Calculator size={28} />
    };

    const staticServices = [
        {
            title: 'Marketing as a Service (MaaS)',
            desc: 'End-to-end marketing solutions powered by our skilled rural workforce, blending creativity with purpose.',
            image: 'https://www.ruralshores.com/pic/MaaS.jpeg',
            icon: <Megaphone size={28} />,
            details: ['Creative Campaigns', 'Social Media', 'Content Creation', 'Brand Strategy'],
            fullDescription: 'Our Marketing as a Service (MaaS) offering combines the creativity and dedication of our rural workforce with cutting-edge marketing strategies. We deliver comprehensive marketing solutions that drive engagement, build brand awareness, and generate measurable results for businesses of all sizes.',
            keyBenefits: [
                'Cost-effective marketing campaigns with high ROI',
                'Dedicated team of trained marketing professionals',
                'Multi-channel marketing expertise (digital, social, content)',
                'Data-driven strategies and performance analytics'
            ],
            useCases: [
                'Social Media Management & Community Building',
                'Content Marketing & Blog Creation',
                'Email Marketing Campaigns',
                'Brand Strategy & Positioning'
            ],
            deliverables: ['Campaign Reports', 'Content Calendar', 'Performance Analytics', 'Brand Guidelines']
        },
        {
            title: 'Content Moderation & Social Media Monitoring',
            desc: 'Delivering end-to-end digital content integrity through human expertise and intelligent automation.',
            image: 'https://www.ruralshores.com/pic/Social%20Media%20Monitoring.jpeg',
            icon: <Shield size={28} />,
            details: ['24/7 Monitoring', 'Multi-language', 'Policy Compliance', 'Real-time Alerts'],
            fullDescription: 'Ensure brand safety and community standards with our comprehensive content moderation services. Our trained moderators work around the clock to review, filter, and manage digital content across multiple platforms and languages.',
            keyBenefits: [
                '24/7 content monitoring and moderation',
                'Multi-language support (12+ languages)',
                'Rapid response time (< 2 hours)',
                'Custom policy implementation and enforcement'
            ],
            useCases: [
                'Social Media Platform Moderation',
                'User-Generated Content Review',
                'Comment & Forum Monitoring',
                'Brand Reputation Management'
            ],
            deliverables: ['Moderation Reports', 'Policy Violation Logs', 'Trend Analysis', 'Escalation Protocols']
        },
        {
            title: 'Data Annotation (AI/ML)',
            desc: 'Data tagging of multiple formats for AI/ML applications.',
            image: 'https://www.ruralshores.com/pic/Data%20Annonation.png',
            icon: <Brain size={28} />,
            details: ['Image Labeling', 'Text Annotation', 'Video Tagging', 'Audio Transcription'],
            fullDescription: 'Power your AI and machine learning models with high-quality labeled data. Our expert annotation teams provide precise, consistent data labeling across images, text, video, and audio formats to train and improve your AI systems.',
            keyBenefits: [
                'High accuracy rates (99%+) for training data',
                'Scalable teams to handle large datasets',
                'Support for multiple annotation types and formats',
                'Quality assurance with multi-level review'
            ],
            useCases: [
                'Computer Vision Model Training',
                'Natural Language Processing (NLP)',
                'Autonomous Vehicle Development',
                'Medical AI & Diagnostics'
            ],
            deliverables: ['Annotated Datasets', 'Quality Reports', 'Annotation Guidelines', 'Model Training Support']
        },
        {
            title: 'Generative AI Services',
            desc: 'Empowering your business with secure and scalable AI solutions.',
            image: 'https://www.ruralshores.com/pic/Generative%20AI.jpeg',
            icon: <Sparkles size={28} />,
            details: ['AI Integration', 'Prompt Engineering', 'Model Training', 'AI Consulting'],
            fullDescription: 'Harness the power of generative AI with our comprehensive services. From integration to optimization, we help businesses leverage AI technologies like GPT, DALL-E, and custom models to automate processes, enhance creativity, and drive innovation.',
            keyBenefits: [
                'Expert AI integration and implementation',
                'Custom prompt engineering for optimal outputs',
                'Secure and compliant AI deployment',
                'Continuous model optimization and monitoring'
            ],
            useCases: [
                'AI-Powered Customer Service Chatbots',
                'Automated Content Generation',
                'Product Description Writing',
                'AI-Assisted Research & Analysis'
            ],
            deliverables: ['AI Implementation Roadmap', 'Prompt Libraries', 'Integration Documentation', 'Performance Metrics'],
            link: '/gen-ai'
        },
        {
            title: 'Robotic Process Automation (RPA)',
            desc: 'Automating repetitive workflows through intelligent bots.',
            image: 'https://www.ruralshores.com/pic/RPA.jpeg',
            icon: <Cpu size={28} />,
            details: ['Workflow Automation', 'Bot Development', 'Process Mining', 'Intelligent Automation'],
            fullDescription: 'Transform your business operations with intelligent automation. Our RPA solutions eliminate manual, repetitive tasks, reduce errors, and free up your team to focus on high-value activities. We design, develop, and maintain bots that work seamlessly with your existing systems.',
            keyBenefits: [
                'Up to 80% reduction in processing time',
                '99.9% accuracy in automated tasks',
                '24/7 bot operation with minimal supervision',
                'Quick ROI (typically within 6-12 months)'
            ],
            useCases: [
                'Invoice Processing & AP/AR Automation',
                'Data Entry & Migration',
                'Report Generation & Distribution',
                'Customer Onboarding Workflows'
            ],
            deliverables: ['RPA Bots', 'Process Documentation', 'Bot Performance Reports', 'Maintenance & Support']
        },
        {
            title: 'Voice Processes (Inbound & Outbound)',
            desc: 'Multilingual voice support for customer engagement.',
            image: 'https://www.ruralshores.com/pic/Voice%20Processes.jpeg',
            icon: <Phone size={28} />,
            details: ['Customer Support', 'Telemarketing', 'Lead Generation', '12+ Languages'],
            fullDescription: 'Deliver exceptional customer experiences with our voice process services. Our trained professionals provide empathetic, efficient support in 12+ languages, handling everything from customer inquiries to sales and lead generation.',
            keyBenefits: [
                'Multi-lingual support (English, Hindi, Tamil, Telugu, etc.)',
                'Flexible scaling based on call volume',
                'Advanced call routing and CRM integration',
                'Average handle time < 5 minutes'
            ],
            useCases: [
                'Customer Service & Technical Support',
                'Telemarketing & Sales Campaigns',
                'Lead Qualification & Nurturing',
                'Appointment Scheduling & Reminders'
            ],
            deliverables: ['Call Performance Reports', 'Quality Scorecards', 'Customer Feedback Analysis', 'Call Recordings']
        },
        {
            title: 'Document Digitization',
            desc: 'End-to-end digitization of global consignment notes.',
            image: 'https://www.ruralshores.com/pic/Document%20Digitization.jpeg',
            icon: <FileText size={28} />,
            details: ['OCR Processing', 'Data Extraction', 'Document Scanning', 'Archive Management'],
            fullDescription: 'Transform paper-based processes into digital workflows. Our document digitization services use advanced OCR technology combined with human verification to ensure accurate, searchable digital archives of your critical business documents.',
            keyBenefits: [
                '99.8% OCR accuracy with human verification',
                'Secure document handling and storage',
                'Fast turnaround times (24-48 hours)',
                'Support for multiple document types and formats'
            ],
            useCases: [
                'Invoice & Receipt Digitization',
                'Consignment Note Processing',
                'Medical Records Management',
                'Legal Document Archiving'
            ],
            deliverables: ['Digital Document Repository', 'Searchable PDF Files', 'Data Extraction Reports', 'Quality Audit Logs']
        },
        {
            title: 'Software Support Services',
            desc: 'Staffing and provisioning of software development talent.',
            image: 'https://www.ruralshores.com/pic/Software%20support%20service.jpeg',
            icon: <Code size={28} />,
            details: ['Development Teams', 'QA Testing', 'DevOps Support', 'Technical Staffing'],
            fullDescription: 'Access skilled software development talent on-demand. Our technical teams seamlessly integrate with your projects, providing expertise in development, testing, DevOps, and technical support to accelerate your software initiatives.',
            keyBenefits: [
                'Pre-vetted technical professionals',
                'Flexible engagement models (dedicated/shared)',
                'Wide technology stack expertise',
                'Cost savings up to 60% vs. in-house hiring'
            ],
            useCases: [
                'Web & Mobile App Development',
                'Quality Assurance & Testing',
                'DevOps & Cloud Infrastructure',
                'Technical Support & Maintenance'
            ],
            deliverables: ['Sprint Deliverables', 'Test Reports', 'Code Documentation', 'Deployment Support']
        },
        {
            title: 'Data Management & Validation',
            desc: 'Reliable data validation and capture services.',
            image: 'https://www.ruralshores.com/pic/Data%20Management%20and%20Validation.jpeg',
            icon: <Database size={28} />,
            details: ['Data Validation', 'Data Cleansing', 'Data Entry', 'Quality Assurance'],
            fullDescription: 'Ensure data integrity with our comprehensive data management services. From data entry to validation and cleansing, we help maintain accurate, consistent, and reliable data across your business systems.',
            keyBenefits: [
                '99.95% accuracy in data entry',
                'Multi-level quality control process',
                'Fast turnaround with scalable teams',
                'Support for various data formats and systems'
            ],
            useCases: [
                'CRM Data Cleansing & Enrichment',
                'Database Migration & Consolidation',
                'Product Catalog Management',
                'Customer Data Validation'
            ],
            deliverables: ['Cleaned Datasets', 'Validation Reports', 'Data Quality Metrics', 'Process Documentation']
        },
        {
            title: 'Finance & Accounting',
            desc: 'Comprehensive finance and accounting outsourcing services.',
            image: 'https://www.ruralshores.com/pic/Finance%20&%20Accounting.jpeg',
            icon: <Calculator size={28} />,
            details: ['AP/AR Processing', 'Reconciliation', 'Payroll Support', 'Financial Reporting'],
            fullDescription: 'Streamline your financial operations with our end-to-end finance and accounting services. Our certified professionals handle everything from accounts payable/receivable to reconciliation, reporting, and payroll support.',
            keyBenefits: [
                'Certified accounting professionals',
                'Compliance with accounting standards (GAAP/IFRS)',
                'Reduced processing costs up to 50%',
                'Month-end close in 3-5 business days'
            ],
            useCases: [
                'Accounts Payable & Receivable Management',
                'Bank & Credit Card Reconciliation',
                'Expense Report Processing',
                'Financial Reporting & Analysis'
            ],
            deliverables: ['Financial Statements', 'Reconciliation Reports', 'Audit Trails', 'Compliance Documentation']
        }
    ];

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get(API_ENDPOINTS.SERVICES.BASE);
                if (res.data.length > 0) {
                    // Filter: Show only active services
                    const activeOnly = res.data.filter(s => s.is_active !== false);

                    const formatted = activeOnly.map(s => ({
                        ...s,
                        desc: s.description,
                        image: s.image_url,
                        icon: iconMap[s.icon] || <Sparkles size={28} />,
                        keyBenefits: s.key_benefits || [],
                        useCases: s.use_cases || []
                    }));
                    setActiveServices(formatted);
                } else {
                    setActiveServices(staticServices);
                }
            } catch (err) {
                console.error("Failed to fetch services:", err);
                setActiveServices(staticServices); // Fallback
            }
        };
        fetchServices();
    }, []);

    const displayServices = activeServices.length > 0 ? activeServices : staticServices;

    return (
        <div style={{ background: 'var(--bg-main)' }}>
            {/* Hero Section */}
            <section className="hero" style={{
                paddingTop: '160px',
                paddingBottom: '80px',
                background: 'var(--primary-gradient)',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                    zIndex: 0
                }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.75rem' }}>Solutions Architecture</span>
                        <h1 style={{ color: 'white', marginTop: '15px' }}>
                            Future-Ready <br />
                            <span style={{ color: 'var(--accent)' }}>Business Services.</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '700px', margin: '20px auto 0', lineHeight: '1.6' }}>
                            Advanced enterprise solutions delivering unmatched operational excellence for the global digital economy.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section" style={{ background: 'var(--bg-soft)' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '40px'
                    }}>
                        {displayServices.map((service, i) => (
                            <div
                                key={i}
                                style={{ perspective: '1000px', height: '480px' }} // Fixed height container for flip context
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        rotateY: { duration: 1.0 }, // Medium speed flip
                                        opacity: { duration: 1.0, delay: i * 0.1 },
                                        y: { duration: 1.0, delay: i * 0.1 }
                                    }}
                                    animate={{ rotateY: flippedIndex === i ? 180 : 0 }}
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {/* --- FRONT FACE --- */}
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden',
                                        borderRadius: '20px',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border)',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        zIndex: 2
                                    }}>
                                        {/* Image Section */}
                                        <div style={{
                                            height: '240px',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)'
                                        }}>
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                top: '20px', left: '20px',
                                                background: 'rgba(255,255,255,0.95)',
                                                padding: '12px',
                                                borderRadius: '16px',
                                                color: 'var(--primary)',
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                                backdropFilter: 'blur(10px)'
                                            }}>
                                                {service.icon}
                                            </div>
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0, left: 0, right: 0,
                                                padding: '25px',
                                                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%)',
                                            }}>
                                                <h3 style={{ color: 'white', fontSize: '1.4rem', margin: 0, fontWeight: '800' }}>{service.title}</h3>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                                                {service.desc}
                                            </p>
                                            <button
                                                onClick={() => setFlippedIndex(i)}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    color: 'var(--secondary)',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    textDecoration: 'none',
                                                    fontWeight: '700',
                                                    fontSize: '0.9rem',
                                                    cursor: 'pointer',
                                                    padding: 0
                                                }}
                                            >
                                                View Details <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* --- BACK FACE --- */}
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)',
                                        borderRadius: '20px',
                                        background: 'var(--bg-main)', // Contrast bg
                                        border: '1px solid var(--secondary)',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        zIndex: 1
                                    }}>
                                        {/* Back Header */}
                                        <div style={{
                                            padding: '15px 20px',
                                            background: 'var(--bg-soft)',
                                            borderBottom: '1px solid var(--border)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Key Benefits
                                            </h4>
                                            <button
                                                onClick={() => setFlippedIndex(null)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>

                                        {/* Scrollable Content */}
                                        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
                                            <ul style={{ paddingLeft: '20px', margin: 0, marginBottom: '20px', color: 'var(--text-main)' }}>
                                                {service.keyBenefits.map((benefit, idx) => (
                                                    <li key={idx} style={{ marginBottom: '10px', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                                        {benefit}
                                                    </li>
                                                ))}
                                            </ul>

                                            <h4 style={{ fontSize: '0.95rem', color: 'var(--secondary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Users size={16} /> Use Cases
                                            </h4>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {service.useCases.slice(0, 3).map((useCase, idx) => (
                                                    <span key={idx} style={{
                                                        padding: '6px 12px',
                                                        background: 'var(--bg-soft)',
                                                        borderRadius: '8px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '600',
                                                        color: 'var(--text-light)'
                                                    }}>
                                                        {useCase}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Back Footer */}
                                        <div style={{ padding: '15px 20px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                                            <button
                                                onClick={() => {
                                                    if (service.link) {
                                                        navigate(service.link);
                                                    } else {
                                                        document.getElementById('contact-element')?.scrollIntoView({ behavior: 'smooth' });
                                                        // Fallback if no contact-element
                                                        if (!document.getElementById('contact-element')) {
                                                            navigate('/contact');
                                                        }
                                                    }
                                                }}
                                                className="btn btn-primary"
                                                style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem', padding: '10px' }}
                                            >
                                                Get Started
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '100px 0',
                background: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ marginBottom: '25px' }}>Ready to Transform Your Operations?</h2>
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--text-light)',
                            marginBottom: '40px',
                            maxWidth: '700px',
                            margin: '0 auto 40px',
                            lineHeight: '1.7'
                        }}>
                            Let's discuss how our services can drive efficiency and innovation for your business.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                            <Link to="/contact" className="btn btn-primary">
                                Get Started <ArrowRight size={20} />
                            </Link>
                            <Link to="/about" className="btn" style={{
                                background: 'var(--bg-soft)',
                                color: 'var(--primary)',
                                border: '1px solid var(--border)'
                            }}>
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style jsx>{`
                .glass-card:hover .hover-glow {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default Services;
