require("dotenv").config();
const pool = require("./db");


const services = [
    {
        title: 'Marketing as a Service (MaaS)',
        description: 'End-to-end marketing solutions powered by our skilled rural workforce, blending creativity with purpose.',
        image_url: 'https://www.ruralshores.com/pic/MaaS.jpeg',
        icon: 'Megaphone',
        key_benefits: ['Cost-effective marketing campaigns', 'Dedicated team of professionals', 'Multi-channel expertise', 'Data-driven strategies'],
        use_cases: ['Social Media Management', 'Content Marketing', 'Email Campaigns', 'Brand Strategy'],
        deliverables: ['Campaign Reports', 'Content Calendar', 'Performance Analytics', 'Brand Guidelines']
    },
    {
        title: 'Data Annotation (AI/ML)',
        description: 'Data tagging of multiple formats for AI/ML applications.',
        image_url: 'https://www.ruralshores.com/pic/Data%20Annonation.png',
        icon: 'Brain',
        key_benefits: ['High accuracy rates (99%+)', 'Scalable teams', 'Support for multiple formats', 'Quality assurance'],
        use_cases: ['Computer Vision Training', 'NLP', 'Autonomous Vehicles', 'Medical AI'],
        deliverables: ['Annotated Datasets', 'Quality Reports', 'Guidelines', 'Training Support']
    },
    {
        title: 'Generative AI Services',
        description: 'Empowering your business with secure and scalable AI solutions.',
        image_url: 'https://www.ruralshores.com/pic/Generative%20AI.jpeg',
        icon: 'Sparkles',
        link: '/gen-ai',
        key_benefits: ['Expert AI integration', 'Prompt engineering', 'Secure deployment', 'Continuous optimization'],
        use_cases: ['AI Chatbots', 'Automated Content', 'Product Descriptions', 'AI Research'],
        deliverables: ['Implementation Roadmap', 'Prompt Libraries', 'Documentation', 'Metrics']
    }
];

const seed = async () => {
    try {
        console.log("Seeding services...");
        for (const s of services) {
            await pool.query(
                "INSERT INTO services (title, description, image_url, icon, link, key_benefits, use_cases, deliverables) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                [s.title, s.description, s.image_url, s.icon, s.link || null, s.key_benefits, s.use_cases, s.deliverables]
            );
        }
        console.log("Seeding complete!");
        process.exit();
    } catch (err) {
        console.error("Error seeding data:", err);
        process.exit(1);
    }
};

seed();
