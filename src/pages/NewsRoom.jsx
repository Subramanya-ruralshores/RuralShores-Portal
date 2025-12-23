import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Newspaper, ArrowRight, Search, Filter } from 'lucide-react';

const NewsRoom = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const newsItems = [
        { title: "Women at the forefront: Changing the face of rural employment", source: "The Daily Guardian", link: "#" },
        { title: "Rural Employment Models That Strengthen India’s Economic Backbone", source: "Entrepreneur India", link: "#" },
        { title: "Why Lifelong Learning, Not Degrees, Will Define Careers by 2035", source: "The Sunday Guardian", link: "#" },
        { title: "Tarun Singhal named Group CEO of RuralShores", source: "BW People", link: "#" },
        { title: "Monitoring is not just compliance—it’s a campaign enabler", source: "MediaBrief", link: "#" },
        { title: "Assam CM Himanta Biswa Sarma Visits RuralShores Center", source: "The Economic Times", link: "#" },
        { title: "Bolstered by IBPS, Jaleswar centre is transforming lives", source: "Orissa Diary", link: "#" },
        { title: "BPOs looking to take services to smaller cities", source: "LiveMint", link: "#" },
        { title: "Making their voices heard", source: "Outlook Business", link: "#" }
    ];

    const blogs = [
        {
            title: "From Villages to Value: Rural Workforces Win",
            date: "18 Aug 2025",
            category: "Insights",
            desc: "Rural talent is emerging as a strategic edge for businesses seeking agility and scale.",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
        },
        {
            title: "Brand Marketing – Making Field Ops Worthwhile",
            date: "13 Aug 2025",
            category: "Insights",
            desc: "Real-time insights and measurable outcomes transform rural brand experiences from roulette to results.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
        },
        {
            title: "We’re Featured on Medianews4u",
            date: "01 Jul 2025",
            category: "Press Release",
            desc: "Coverage on elevating rural campaign effectiveness with better design and data.",
            image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
        },
        {
            title: "Kamlesh’s Role in Shaping Careers",
            date: "30 Jun 2025",
            category: "People",
            desc: "Meet Kamlesh, a BFSI Trainer preparing rural youth for careers with a blend of core skills and confidence-building.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
        }
    ];

    const filteredBlogs = blogs.filter(blog =>
        (selectedCategory === 'All' || blog.category === selectedCategory) &&
        (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.desc.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <section className="hero" style={{
                paddingTop: '140px',
                paddingBottom: '60px',
                background: 'var(--royal-gradient)',
                color: 'white',
                textAlign: 'center',
                position: 'relative'
            }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span style={{ color: 'var(--secondary-light)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.75rem' }}>Media Center</span>
                        <h1 style={{ color: 'white', marginTop: '15px', marginBottom: '15px' }}>News<span style={{ color: 'var(--secondary)' }}>Room</span></h1>
                        <p style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>Stay informed about our latest coverage, press releases, and insights.</p>
                    </motion.div>
                </div>
            </section>

            <div className="container" style={{ padding: '60px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '50px' }}>

                    {/* Left Column: In the News List */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '30px', borderBottom: '2px solid var(--secondary)', paddingBottom: '10px', display: 'inline-block' }}>In the News</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {newsItems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    style={{
                                        padding: '20px',
                                        background: 'var(--bg-card)',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
                                >
                                    <h3 style={{ fontSize: '1rem', marginBottom: '10px', lineHeight: '1.4', color: 'var(--text-main)' }}>{item.title}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontStyle: 'italic' }}>- {item.source}</span>
                                        <a href={item.link} style={{ color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none' }}>Read</a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Latest Blogs */}
                    <div>
                        <div style={{ marginBottom: '40px' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--primary)' }}>Latest Blogs</h2>
                            <p style={{ color: 'var(--text-light)' }}>Stay informed about our milestones, partnerships, and community impact.</p>

                            {/* Search & Filter Bar */}
                            <div style={{
                                marginTop: '30px',
                                display: 'flex',
                                gap: '15px',
                                flexWrap: 'wrap',
                                background: 'var(--bg-soft)',
                                padding: '20px',
                                borderRadius: '16px'
                            }}>
                                <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
                                    <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                    <input
                                        type="text"
                                        placeholder="Search news..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '12px 12px 12px 45px',
                                            borderRadius: '100px',
                                            border: '1px solid var(--border)',
                                            background: 'var(--bg-card)',
                                            color: 'var(--text-main)',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                                    {['All', 'Insights', 'Press Release', 'People'].map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            style={{
                                                padding: '10px 20px',
                                                borderRadius: '100px',
                                                border: 'none',
                                                background: selectedCategory === cat ? 'var(--secondary)' : 'var(--bg-card)',
                                                color: selectedCategory === cat ? 'white' : 'var(--text-light)',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                transition: 'all 0.2s',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                            {filteredBlogs.map((blog, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="glass-card"
                                    style={{
                                        border: '1px solid var(--border)',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        background: 'var(--bg-card)',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <div style={{ height: '180px', overflow: 'hidden' }}>
                                        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '10px' }}>
                                            {blog.date} • <span style={{ color: 'var(--secondary)', fontWeight: '600' }}>{blog.category}</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--primary)' }}>{blog.title}</h3>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>{blog.desc}</p>
                                        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--secondary)', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem' }}>
                                            Read More <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsRoom;

