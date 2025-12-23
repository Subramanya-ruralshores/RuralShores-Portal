require("dotenv").config();
const pool = require("./db");

const fullServices = [
    {
        title: 'Marketing as a Service (MaaS)',
        description: 'End-to-end marketing solutions powered by our skilled rural workforce, blending creativity with purpose.',
        image_url: 'https://www.ruralshores.com/pic/MaaS.jpeg',
        icon: 'Megaphone',
        key_benefits: ['Cost-effective marketing campaigns with high ROI', 'Dedicated team of trained marketing professionals', 'Multi-channel marketing expertise (digital, social, content)', 'Data-driven strategies and performance analytics'],
        use_cases: ['Social Media Management & Community Building', 'Content Marketing & Blog Creation', 'Email Marketing Campaigns', 'Brand Strategy & Positioning'],
        deliverables: ['Campaign Reports', 'Content Calendar', 'Performance Analytics', 'Brand Guidelines']
    },
    {
        title: 'Content Moderation & Social Media Monitoring',
        description: 'Delivering end-to-end digital content integrity through human expertise and intelligent automation.',
        image_url: 'https://www.ruralshores.com/pic/Social%20Media%20Monitoring.jpeg',
        icon: 'Shield',
        key_benefits: ['24/7 content monitoring and moderation', 'Multi-language support (12+ languages)', 'Rapid response time (< 2 hours)', 'Custom policy implementation and enforcement'],
        use_cases: ['Social Media Platform Moderation', 'User-Generated Content Review', 'Comment & Forum Monitoring', 'Brand Reputation Management'],
        deliverables: ['Moderation Reports', 'Policy Violation Logs', 'Trend Analysis', 'Escalation Protocols']
    },
    {
        title: 'Data Annotation (AI/ML)',
        description: 'Data tagging of multiple formats for AI/ML applications.',
        image_url: 'https://www.ruralshores.com/pic/Data%20Annonation.png',
        icon: 'Brain',
        key_benefits: ['High accuracy rates (99%+) for training data', 'Scalable teams to handle large datasets', 'Support for multiple annotation types and formats', 'Quality assurance with multi-level review'],
        use_cases: ['Computer Vision Model Training', 'Natural Language Processing (NLP)', 'Autonomous Vehicle Development', 'Medical AI & Diagnostics'],
        deliverables: ['Annotated Datasets', 'Quality Reports', 'Annotation Guidelines', 'Model Training Support']
    },
    {
        title: 'Generative AI Services',
        description: 'Empowering your business with secure and scalable AI solutions.',
        image_url: 'https://www.ruralshores.com/pic/Generative%20AI.jpeg',
        icon: 'Sparkles',
        link: '/gen-ai',
        key_benefits: ['Expert AI integration and implementation', 'Custom prompt engineering for optimal outputs', 'Secure and compliant AI deployment', 'Continuous model optimization and monitoring'],
        use_cases: ['AI-Powered Customer Service Chatbots', 'Automated Content Generation', 'Product Description Writing', 'AI-Assisted Research & Analysis'],
        deliverables: ['AI Implementation Roadmap', 'Prompt Libraries', 'Integration Documentation', 'Performance Metrics']
    },
    {
        title: 'Robotic Process Automation (RPA)',
        description: 'Automating repetitive workflows through intelligent bots.',
        image_url: 'https://www.ruralshores.com/pic/RPA.jpeg',
        icon: 'Cpu',
        key_benefits: ['Up to 80% reduction in processing time', '99.9% accuracy in automated tasks', '24/7 bot operation with minimal supervision', 'Quick ROI (typically within 6-12 months)'],
        use_cases: ['Invoice Processing & AP/AR Automation', 'Data Entry & Migration', 'Report Generation & Distribution', 'Customer Onboarding Workflows'],
        deliverables: ['RPA Bots', 'Process Documentation', 'Bot Performance Reports', 'Maintenance & Support']
    },
    {
        title: 'Voice Processes (Inbound & Outbound)',
        description: 'Multilingual voice support for customer engagement.',
        image_url: 'https://www.ruralshores.com/pic/Voice%20Processes.jpeg',
        icon: 'Phone',
        key_benefits: ['Multi-lingual support (English, Hindi, Tamil, Telugu, etc.)', 'Flexible scaling based on call volume', 'Advanced call routing and CRM integration', 'Average handle time < 5 minutes'],
        use_cases: ['Customer Service & Technical Support', 'Telemarketing & Sales Campaigns', 'Lead Qualification & Nurturing', 'Appointment Scheduling & Reminders'],
        deliverables: ['Call Performance Reports', 'Quality Scorecards', 'Customer Feedback Analysis', 'Call Recordings']
    },
    {
        title: 'Document Digitization',
        description: 'End-to-end digitization of global consignment notes.',
        image_url: 'https://www.ruralshores.com/pic/Document%20Digitization.jpeg',
        icon: 'FileText',
        key_benefits: ['99.8% OCR accuracy with human verification', 'Secure document handling and storage', 'Fast turnaround times (24-48 hours)', 'Support for multiple document types and formats'],
        use_cases: ['Invoice & Receipt Digitization', 'Consignment Note Processing', 'Medical Records Management', 'Legal Document Archiving'],
        deliverables: ['Digital Document Repository', 'Searchable PDF Files', 'Data Extraction Reports', 'Quality Audit Logs']
    },
    {
        title: 'Software Support Services',
        description: 'Staffing and provisioning of software development talent.',
        image_url: 'https://www.ruralshores.com/pic/Software%20support%20service.jpeg',
        icon: 'Code',
        key_benefits: ['Pre-vetted technical professionals', 'Flexible engagement models (dedicated/shared)', 'Wide technology stack expertise', 'Cost savings up to 60% vs. in-house hiring'],
        use_cases: ['Web & Mobile App Development', 'Quality Assurance & Testing', 'DevOps & Cloud Infrastructure', 'Technical Support & Maintenance'],
        deliverables: ['Sprint Deliverables', 'Test Reports', 'Code Documentation', 'Deployment Support']
    },
    {
        title: 'Data Management & Validation',
        description: 'Reliable data validation and capture services.',
        image_url: 'https://www.ruralshores.com/pic/Data%20Management%20and%20Validation.jpeg',
        icon: 'Database',
        key_benefits: ['99.95% accuracy in data entry', 'Multi-level quality control process', 'Fast turnaround with scalable teams', 'Support for various data formats and systems'],
        use_cases: ['CRM Data Cleansing & Enrichment', 'Database Migration & Consolidation', 'Product Catalog Management', 'Customer Data Validation'],
        deliverables: ['Cleaned Datasets', 'Validation Reports', 'Data Quality Metrics', 'Process Documentation']
    },
    {
        title: 'Finance & Accounting',
        description: 'Comprehensive finance and accounting outsourcing services.',
        image_url: 'https://www.ruralshores.com/pic/Finance%20&%20Accounting.jpeg',
        icon: 'Calculator',
        key_benefits: ['Certified accounting professionals', 'Compliance with accounting standards (GAAP/IFRS)', 'Reduced processing costs up to 50%', 'Month-end close in 3-5 business days'],
        use_cases: ['Accounts Payable & Receivable Management', 'Bank & Credit Card Reconciliation', 'Expense Report Processing', 'Financial Reporting & Analysis'],
        deliverables: ['Financial Statements', 'Reconciliation Reports', 'Audit Trails', 'Compliance Documentation']
    }
];

const restore = async () => {
    try {
        console.log("Adding UNIQUE constraint to services(title) if it doesn't exist...");
        await pool.query("ALTER TABLE services ADD CONSTRAINT unique_service_title UNIQUE (title)");
    } catch (err) {
        console.log("Constraint already exists or could not be added. Continuing...");
    }

    try {
        console.log("Restoring original services...");
        for (const s of fullServices) {
            await pool.query(`
                INSERT INTO services (title, description, image_url, icon, link, key_benefits, use_cases, deliverables)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                ON CONFLICT (title) DO UPDATE SET
                    description = EXCLUDED.description,
                    image_url = EXCLUDED.image_url,
                    icon = EXCLUDED.icon,
                    link = EXCLUDED.link,
                    key_benefits = EXCLUDED.key_benefits,
                    use_cases = EXCLUDED.use_cases,
                    deliverables = EXCLUDED.deliverables
            `, [s.title, s.description, s.image_url, s.icon, s.link || null, s.key_benefits, s.use_cases, s.deliverables]);
            console.log(`Restored: ${s.title}`);
        }
        console.log("Restore complete!");
        process.exit();
    } catch (err) {
        console.error("Error restoring data:", err);
        process.exit(1);
    }
};

restore();
