import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    Rocket,
    Trash2,
    Play,
    Plus,
    X,
    Cpu,
    Shield,
    Zap,
    CheckCircle2,
    Activity,
    Code,
    Sparkles,
    Terminal
} from 'lucide-react';

const GenAI = () => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: 'OCR & Intelligent Reply',
            desc: 'Advanced OCR system combined with a context-aware text-to-text response engine for processing rural forms.',
            type: 'NLP & Vision',
            status: 'Production',
            accuracy: '97%',
            code: `// OCR + Intelligent Reply Logic
const processForm = async (image) => {
  const text = await tesseract.recognize(image);
  const response = await llm.generateReply(text, { context: "CustomerSupport" });
  return { original: text, reply: response };
};`,
            demoType: 'ocr-reply'
        },
        {
            id: 2,
            name: 'VisionCraft AI',
            desc: 'High-fidelity image generation engine for rural branding and entertainment visualization.',
            type: 'Generative Vision',
            status: 'Beta',
            accuracy: 'SOTA',
            code: `// VisionCraft Image Generation
const generatePoster = async (prompt) => {
  const latent = diffusers.seed(42);
  const image = await stableDiffusionXL.generate(prompt, {
    steps: 50,
    style: "Cinematic"
  });
  return image;
};`,
            demoType: 'image-gen'
        }
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newProject, setNewProject] = useState({ name: '', desc: '', type: 'Agentic AI' });
    const [runningDemo, setRunningDemo] = useState(null);
    const [demoLogs, setDemoLogs] = useState([]);
    const [viewingCode, setViewingCode] = useState(null);
    const [interactiveDemo, setInteractiveDemo] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [demoOutput, setDemoOutput] = useState(null);

    const handleAdd = (e) => {
        e.preventDefault();
        const project = {
            ...newProject,
            id: Date.now(),
            status: 'Development',
            accuracy: '---'
        };
        setProjects([...projects, project]);
        setIsAdding(false);
        setNewProject({ name: '', desc: '', type: 'Agentic AI' });
    };

    const handleRemove = (id) => {
        if (window.confirm('Delete this AI Module?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const handleAction = (project) => {
        setRunningDemo(project);
        setDemoLogs(['> Initializing Neural Network...', '> Loading Weights...', '> Establishing Secure Tunnel...']);

        const messages = [
            `> Analyzing ${project.name} request...`,
            '> Context window established (8k tokens)',
            '> Reasoning module active...',
            '> Generating optimized solution...',
            '> Applied agentic cross-verification...',
            '> Output finalized. Launching Interactive Console.'
        ];

        messages.forEach((msg, i) => {
            setTimeout(() => {
                setDemoLogs(prev => [...prev, msg]);
                if (i === messages.length - 1) {
                    setTimeout(() => {
                        setInteractiveDemo(project);
                        setRunningDemo(null);
                    }, 1000);
                }
            }, (i + 1) * 600);
        });
    };

    const runInteractive = () => {
        setDemoOutput('Processing...');
        setTimeout(() => {
            if (interactiveDemo.demoType === 'ocr-reply') {
                setDemoOutput({
                    type: 'text',
                    content: `OCR Extracted: "Customer Query about Broadband"\nIntelligent Reply: "Hello, we have received your request regarding broadband connectivity in your village. Our technician will contact you within 24 hours."`
                });
            } else if (interactiveDemo.demoType === 'image-gen') {
                setDemoOutput({
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800',
                    caption: `Generated Visualization for: "${userInput || 'Rural Digital Future'}"`
                });
            } else {
                setDemoOutput({
                    type: 'text',
                    content: `Simulation complete for ${interactiveDemo.name}. System suggests 92% optimization based on input: ${userInput}.`
                });
            }
        }, 2000);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #63656fff 0%, #0F172A 100%)',
            color: 'white',
            padding: '120px 20px 80px',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Background Decorative Elements */}
            <div style={{ position: 'fixed', top: '10%', right: '5%', width: '400px', height: '400px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0 }}></div>
            <div style={{ position: 'fixed', bottom: '10%', left: '5%', width: '300px', height: '300px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header Area */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <span style={{
                            color: 'var(--secondary)',
                            fontWeight: '900',
                            letterSpacing: '5px',
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
                            display: 'block',
                            marginBottom: '20px'
                        }}>
                            Gen AI Laboratory
                        </span>
                        <h1 style={{ color: 'white', fontSize: '3.5rem', fontWeight: '900', marginBottom: '25px', letterSpacing: '-1px' }}>
                            Rural <span style={{ color: 'transparent', WebkitTextStroke: '1px white' }}>Intelligence</span> Matrix
                        </h1>
                        <p style={{ maxWidth: '700px', margin: '0 auto', color: '#94A3B8', fontSize: '1.2rem', lineHeight: '1.7' }}>
                            Managing the largest rural ecosystem of autonomous agents and generative models, driving impact through cutting-edge neural architecture.
                        </p>
                    </motion.div>
                </div>

                {/* Dashboard Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Cpu size={18} color="#60A5FA" />
                            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Active Nodes: {projects.length}</span>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Zap size={18} color="#F59E0B" />
                            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Throughput: 1.2k req/s</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="btn btn-primary"
                        style={{ padding: '12px 25px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '14px' }}
                    >
                        <Plus size={20} /> Deploy New Module
                    </button>
                </div>

                {/* Projects Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                    <AnimatePresence>
                        {projects.map((p) => (
                            <motion.div
                                key={p.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -5 }}
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '24px',
                                    padding: '35px',
                                    backdropFilter: 'blur(10px)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.1), transparent 70%)', zIndex: 0 }}></div>

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '14px',
                                            background: 'rgba(96, 165, 250, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#60A5FA'
                                        }}>
                                            <Sparkles size={24} />
                                        </div>
                                        <div style={{
                                            padding: '5px 12px',
                                            borderRadius: '8px',
                                            fontSize: '0.7rem',
                                            fontWeight: '800',
                                            background: p.status === 'Production' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                            color: p.status === 'Production' ? '#10B981' : '#F59E0B',
                                            textTransform: 'uppercase',
                                            border: '1px solid currentColor'
                                        }}>
                                            {p.status}
                                        </div>
                                    </div>

                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '15px' }}>{p.name}</h3>
                                    <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: '1.6', marginBottom: '25px', minHeight: '80px' }}>{p.desc}</p>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                                        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>Classification</div>
                                            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{p.type}</div>
                                        </div>
                                        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>Evaluation</div>
                                            <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#10B981' }}>{p.accuracy} Accuracy</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button
                                            onClick={() => handleAction(p)}
                                            style={{
                                                flex: 1,
                                                padding: '12px',
                                                background: '#3B82F6',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '12px',
                                                fontWeight: '700',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <Play size={16} fill="white" /> Launch
                                        </button>
                                        <button
                                            onClick={() => setViewingCode(p)}
                                            style={{
                                                padding: '12px',
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'white',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                cursor: 'pointer'
                                            }}
                                            title="View Source Code"
                                        >
                                            <Code size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleRemove(p.id)}
                                            style={{
                                                padding: '12px',
                                                background: 'rgba(239, 68, 68, 0.05)',
                                                color: '#EF4444',
                                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                                borderRadius: '12px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Add Project Modal */}
            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{ background: '#0F172A', padding: '40px', borderRadius: '32px', width: '450px', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>New AI Module Deployment</h3>
                                <button onClick={() => setIsAdding(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <form onSubmit={handleAdd}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '8px', display: 'block' }}>Module Identifier</label>
                                        <input required style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', color: 'white', outline: 'none' }} placeholder="Ex: NeuralFlow-1" value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '8px', display: 'block' }}>Architecture Brief</label>
                                        <textarea required style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', color: 'white', outline: 'none', minHeight: '100px', resize: 'none' }} placeholder="Describe the neural logic..." value={newProject.desc} onChange={e => setNewProject({ ...newProject, desc: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '8px', display: 'block' }}>System Category</label>
                                        <select style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', color: 'white', outline: 'none' }} value={newProject.type} onChange={e => setNewProject({ ...newProject, type: e.target.value })}>
                                            <option>Agentic AI</option>
                                            <option>Large Language Model</option>
                                            <option>Neural Vision</option>
                                            <option>Voice synthesis</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', borderRadius: '14px', marginTop: '10px' }}>Initialize Matrix</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Run Demo Terminal */}
            <AnimatePresence>
                {runningDemo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(15px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{ background: '#000', border: '1px solid #1E293B', borderRadius: '20px', width: '650px', overflow: 'hidden', boxShadow: '0 0 50px rgba(59, 130, 246, 0.2)' }}
                        >
                            <div style={{ background: '#0F172A', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1E293B' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Terminal size={18} color="#60A5FA" />
                                    <span style={{ fontSize: '0.9rem', fontWeight: '700', fontFamily: 'monospace', color: '#60A5FA' }}>neural-os // demo_${runningDemo.name.toLowerCase()}</span>
                                </div>
                                <button onClick={() => setRunningDemo(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}><X size={20} /></button>
                            </div>
                            <div style={{ padding: '30px', minHeight: '350px', maxHeight: '450px', overflowY: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', color: '#10B981', lineHeight: '1.6' }}>
                                {demoLogs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        style={{ marginBottom: '8px' }}
                                    >
                                        {log}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Source Code Modal */}
            <AnimatePresence>
                {viewingCode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{ background: '#0F172A', width: '80%', maxWidth: '800px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            <div style={{ padding: '20px 30px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1E293B' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Code size={20} color="#60A5FA" />
                                    <span style={{ fontWeight: '700' }}>{viewingCode.name} // source.js</span>
                                </div>
                                <button onClick={() => setViewingCode(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '30px', background: '#000', maxHeight: '500px', overflowY: 'auto' }}>
                                <pre style={{ margin: 0, color: '#f8f8f2', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', lineHeight: '1.6' }}>
                                    <code>{viewingCode.code || '// Source code not initialized for this module.'}</code>
                                </pre>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Interactive Demo UI */}
            <AnimatePresence>
                {interactiveDemo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(15px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{ background: '#0F172A', padding: '40px', borderRadius: '32px', width: '600px', border: '1px solid #3B82F6' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '5px' }}>{interactiveDemo.name}</h3>
                                    <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Project Execution Environment</p>
                                </div>
                                <button onClick={() => { setInteractiveDemo(null); setDemoOutput(null); setUserInput(''); }} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}><X size={24} /></button>
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '12px', display: 'block' }}>Enter Input for Neural Processing</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && runInteractive()}
                                        style={{ width: '100%', padding: '16px', paddingRight: '120px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
                                        placeholder="Type something to test the AI..."
                                    />
                                    <button
                                        onClick={runInteractive}
                                        style={{ position: 'absolute', right: '8px', top: '8px', bottom: '8px', background: '#3B82F6', border: 'none', color: 'white', padding: '0 20px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}
                                    >
                                        Execute
                                    </button>
                                </div>
                            </div>

                            {demoOutput && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ padding: '25px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#60A5FA' }}>
                                        <Activity size={20} />
                                        <span style={{ fontWeight: '800', textTransform: 'uppercase', fontSize: '0.8rem' }}>Neural Output</span>
                                    </div>
                                    {demoOutput.type === 'image' ? (
                                        <div>
                                            <img
                                                src={demoOutput.url}
                                                alt="Generated"
                                                style={{ width: '100%', borderRadius: '12px', marginBottom: '15px', border: '1px solid rgba(255,255,255,0.1)' }}
                                            />
                                            <p style={{ color: '#94A3B8', fontSize: '0.85rem', fontStyle: 'italic', textAlign: 'center' }}>{demoOutput.caption}</p>
                                        </div>
                                    ) : (
                                        <p style={{ color: 'white', margin: 0, lineHeight: '1.6', fontSize: '1rem', whiteSpace: 'pre-line' }}>
                                            {demoOutput.content || (typeof demoOutput === 'string' ? demoOutput : '')}
                                        </p>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default GenAI;
