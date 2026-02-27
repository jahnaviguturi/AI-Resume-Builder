import React, { useState, useEffect, useMemo } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Globe, Plus, Trash2, Database, Zap, AlertCircle, CheckCircle2, Layout, Sparkles, Wand2 } from 'lucide-react';

const ACTION_VERBS = ['built', 'developed', 'designed', 'implemented', 'led', 'improved', 'created', 'optimized', 'automated'];

const Builder = () => {
    const initialState = {
        personal: { name: '', email: '', phone: '', location: '' },
        summary: '',
        education: [],
        experience: [],
        projects: [],
        skills: '',
        links: { github: '', linkedin: '' }
    };

    // 1) Auto-save data
    const savedData = localStorage.getItem('resumeBuilderData');
    const [data, setData] = useState(savedData ? JSON.parse(savedData) : initialState);

    // 5) Persist Template Choice
    const savedTemplate = localStorage.getItem('resumeTemplate');
    const [template, setTemplate] = useState(savedTemplate || 'classic');

    useEffect(() => {
        localStorage.setItem('resumeBuilderData', JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        localStorage.setItem('resumeTemplate', template);
    }, [template]);

    const loadSampleData = () => {
        setData({
            personal: { name: 'Jahnavi Guturi', email: 'jahnavi@example.com', phone: '+91 98765 43210', location: 'Bangalore, India' },
            summary: 'Ambitious Software Engineer with a passion for building elegant, user-centric applications. Expert in React and modern CSS. Over the last 4 years, I have delivered over 15 high-impact web solutions for various clients across the globe.',
            education: [{ school: 'KodNest Institute', degree: 'Full Stack Development', year: '2025' }],
            experience: [{ company: 'Tech Innovators', position: 'Frontend Intern', duration: '2024 - Present', desc: 'Developed premium UI components. Improved load times by 20%.' }],
            projects: [
                { title: 'AI Resume Builder', desc: 'Designed a premium tool for building ATS-friendly resumes with 100% accuracy.' },
                { title: 'Job Notification System', desc: 'Automated real-time job alerts delivered to over 500 users weekly.' }
            ],
            skills: 'React, Javascript, CSS, Node.js, Git, TypeScript, SQL, AWS',
            links: { github: 'github.com/jahnaviguturi', linkedin: 'linkedin.com/in/jahnaviguturi' }
        });
    };

    const updatePersonal = (field, val) => {
        setData({ ...data, personal: { ...data.personal, [field]: val } });
    };

    const addItem = (type) => {
        const newItem = type === 'education' ? { school: '', degree: '', year: '' } :
            type === 'experience' ? { company: '', position: '', duration: '', desc: '' } :
                { title: '', desc: '' };
        setData({ ...data, [type]: [...data[type], newItem] });
    };

    const updateItem = (type, index, field, val) => {
        const newList = [...data[type]];
        newList[index][field] = val;
        setData({ ...data, [type]: newList });
    };

    const removeItem = (type, index) => {
        const newList = data[type].filter((_, i) => i !== index);
        setData({ ...data, [type]: newList });
    };

    // 2) Bullet Structure Guidance helper
    const getBulletGuidance = (text) => {
        if (!text) return null;
        const suggestions = [];
        const words = text.trim().split(/\s+/);
        const firstWord = words[0]?.toLowerCase().replace(/[^a-z]/g, '');

        if (!ACTION_VERBS.includes(firstWord)) {
            suggestions.push("Start with a strong action verb.");
        }
        if (!/\d/.test(text)) {
            suggestions.push("Add measurable impact (numbers).");
        }
        return suggestions;
    };

    // 3) Improvement Panel Logic (ATS Score v1 intact)
    const { score, topImprovements } = useMemo(() => {
        let currentScore = 0;
        let improvements = [];

        // Summary length 40-120 words
        const summaryWords = data.summary.trim() ? data.summary.trim().split(/\s+/).length : 0;
        if (summaryWords >= 40 && summaryWords <= 120) {
            currentScore += 15;
        } else {
            if (summaryWords < 40) improvements.push("Expand your summary to at least 40 words for better impact.");
            if (summaryWords > 120) improvements.push("Shorten your summary to under 120 words.");
        }

        if (data.projects.length < 2) {
            improvements.push("Add at least 2 technical projects to showcase your skills.");
        }
        if (data.projects.length >= 2) currentScore += 10;

        // Experience >= 1
        if (data.experience.length >= 1) {
            currentScore += 10;
        } else {
            improvements.push("Add internship or project work to your experience section.");
        }

        // Skills >= 8
        const skillsCount = data.skills.split(',').filter(s => s.trim().length > 0).length;
        if (skillsCount >= 8) {
            currentScore += 10;
        } else {
            improvements.push("List at least 8 relevant technical and soft skills.");
        }

        // Links exist
        if (data.links.github.trim() || data.links.linkedin.trim()) {
            currentScore += 10;
        }

        // Measureable impact (numbers)
        const hasNumbers = [...data.experience, ...data.projects].some(item =>
            (item.desc && /\d/.test(item.desc))
        );
        if (hasNumbers) {
            currentScore += 15;
        } else {
            improvements.push("Use numbers (%, X, k) to show the scale of your achievements.");
        }

        // Education complete
        const eduComplete = data.education.length > 0 && data.education.every(edu => edu.school && edu.degree && edu.year);
        if (eduComplete) {
            currentScore += 10;
        }

        if (data.personal.name && data.personal.email) currentScore += 20;

        return {
            score: Math.min(currentScore, 100),
            topImprovements: improvements.slice(0, 3)
        };
    }, [data]);

    return (
        <div className="builder-container">
            {/* Form Section */}
            <div className="builder-form">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Resume Details</h2>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn btn-outline" onClick={() => setData(initialState)} style={{ color: 'var(--error)' }}>
                            <Trash2 size={16} /> Clear All
                        </button>
                        <button className="btn btn-outline" onClick={loadSampleData}>
                            <Database size={16} /> Load Sample Data
                        </button>
                    </div>
                </div>

                {/* 1) Template Tabs UI */}
                <div className="template-tabs">
                    <button className={`template-tab ${template === 'classic' ? 'active' : ''}`} onClick={() => setTemplate('classic')}>Classic</button>
                    <button className={`template-tab ${template === 'modern' ? 'active' : ''}`} onClick={() => setTemplate('modern')}>Modern</button>
                    <button className={`template-tab ${template === 'minimal' ? 'active' : ''}`} onClick={() => setTemplate('minimal')}>Minimal</button>
                </div>

                {/* Personal Info */}
                <section className="form-section">
                    <h3 className="form-section-title"><User size={20} /> Personal Information</h3>
                    <div className="input-group">
                        <div className="input-wrapper">
                            <label className="label">Full Name</label>
                            <input className="input-field" placeholder="John Doe" value={data.personal.name} onChange={(e) => updatePersonal('name', e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <label className="label">Email Address</label>
                            <input className="input-field" placeholder="john@example.com" value={data.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <label className="label">Phone Number</label>
                            <input className="input-field" placeholder="+1 234 567 890" value={data.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <label className="label">Location</label>
                            <input className="input-field" placeholder="New York, USA" value={data.personal.location} onChange={(e) => updatePersonal('location', e.target.value)} />
                        </div>
                    </div>
                </section>

                {/* Summary */}
                <section className="form-section">
                    <h3 className="form-section-title"><Database size={20} /> Professional Summary</h3>
                    <textarea className="textarea-field" placeholder="Briefly describe your career goals and expertise..." value={data.summary} onChange={(e) => setData({ ...data, summary: e.target.value })} />
                    <p style={{ fontSize: '0.75rem', marginTop: '4px', color: 'var(--text-muted)' }}>
                        Word count: {data.summary.trim() ? data.summary.trim().split(/\s+/).length : 0} (Target: 40-120)
                    </p>
                </section>

                {/* Education */}
                <section className="form-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 className="form-section-title" style={{ marginBottom: 0 }}><GraduationCap size={20} /> Education</h3>
                        <button className="btn btn-outline" style={{ padding: '6px 12px' }} onClick={() => addItem('education')}>
                            <Plus size={16} /> Add
                        </button>
                    </div>
                    {data.education.map((item, i) => (
                        <div key={i} className="repeater-item">
                            <button onClick={() => removeItem('education', i)} style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                            <div className="input-group">
                                <div className="input-wrapper"><label className="label">School</label><input className="input-field" value={item.school} onChange={(e) => updateItem('education', i, 'school', e.target.value)} /></div>
                                <div className="input-wrapper"><label className="label">Degree</label><input className="input-field" value={item.degree} onChange={(e) => updateItem('education', i, 'degree', e.target.value)} /></div>
                            </div>
                            <div className="input-wrapper" style={{ marginTop: '12px' }}><label className="label">Year</label><input className="input-field" value={item.year} onChange={(e) => updateItem('education', i, 'year', e.target.value)} /></div>
                        </div>
                    ))}
                </section>

                {/* Experience */}
                <section className="form-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 className="form-section-title" style={{ marginBottom: 0 }}><Briefcase size={20} /> Experience</h3>
                        <button className="btn btn-outline" style={{ padding: '6px 12px' }} onClick={() => addItem('experience')}>
                            <Plus size={16} /> Add
                        </button>
                    </div>
                    {data.experience.map((item, i) => (
                        <div key={i} className="repeater-item">
                            <button onClick={() => removeItem('experience', i)} style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                            <div className="input-group">
                                <div className="input-wrapper"><label className="label">Company</label><input className="input-field" value={item.company} onChange={(e) => updateItem('experience', i, 'company', e.target.value)} /></div>
                                <div className="input-wrapper"><label className="label">Position</label><input className="input-field" value={item.position} onChange={(e) => updateItem('experience', i, 'position', e.target.value)} /></div>
                            </div>
                            <div className="input-wrapper" style={{ marginTop: '12px' }}><label className="label">Duration</label><input className="input-field" value={item.duration} onChange={(e) => updateItem('experience', i, 'duration', e.target.value)} /></div>
                            <div className="input-wrapper" style={{ marginTop: '12px' }}>
                                <label className="label">Description</label>
                                <textarea className="textarea-field" style={{ minHeight: '60px' }} value={item.desc} onChange={(e) => updateItem('experience', i, 'desc', e.target.value)} />
                                {getBulletGuidance(item.desc)?.map((s, idx) => (
                                    <div key={idx} className="guidance-msg"><Sparkles size={12} /> {s}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Projects */}
                <section className="form-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 className="form-section-title" style={{ marginBottom: 0 }}><Zap size={20} /> Projects</h3>
                        <button className="btn btn-outline" style={{ padding: '6px 12px' }} onClick={() => addItem('projects')}>
                            <Plus size={16} /> Add
                        </button>
                    </div>
                    {data.projects.map((item, i) => (
                        <div key={i} className="repeater-item">
                            <button onClick={() => removeItem('projects', i)} style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                            <div className="input-wrapper">
                                <label className="label">Project Title</label>
                                <input className="input-field" value={item.title} onChange={(e) => updateItem('projects', i, 'title', e.target.value)} />
                            </div>
                            <div className="input-wrapper" style={{ marginTop: '12px' }}>
                                <label className="label">Description</label>
                                <textarea className="textarea-field" style={{ minHeight: '60px' }} value={item.desc} onChange={(e) => updateItem('projects', i, 'desc', e.target.value)} />
                                {getBulletGuidance(item.desc)?.map((s, idx) => (
                                    <div key={idx} className="guidance-msg"><Sparkles size={12} /> {s}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Skills */}
                <section className="form-section">
                    <h3 className="form-section-title"><Code size={20} /> Skills</h3>
                    <div className="input-wrapper">
                        <label className="label">Comma Separated Skills</label>
                        <input className="input-field" placeholder="React, Python, AWS..." value={data.skills} onChange={(e) => setData({ ...data, skills: e.target.value })} />
                    </div>
                </section>

                {/* Links */}
                <section className="form-section" style={{ marginBottom: '80px' }}>
                    <h3 className="form-section-title"><Globe size={20} /> Links</h3>
                    <div className="input-group">
                        <div className="input-wrapper">
                            <label className="label">GitHub</label>
                            <input className="input-field" placeholder="github.com/profile" value={data.links.github} onChange={(e) => setData({ ...data, links: { ...data.links, github: e.target.value } })} />
                        </div>
                        <div className="input-wrapper">
                            <label className="label">LinkedIn</label>
                            <input className="input-field" placeholder="linkedin.com/in/profile" value={data.links.linkedin} onChange={(e) => setData({ ...data, links: { ...data.links, linkedin: e.target.value } })} />
                        </div>
                    </div>
                </section>
            </div>

            {/* Preview Section */}
            <div className="builder-preview" style={{ flexDirection: 'column', gap: '20px' }}>
                <div className="build-card glass" style={{ width: '100%', maxWidth: '210mm', marginBottom: '0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p className="build-card-title">ATS Readiness Score</p>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: score > 80 ? 'var(--accent)' : score > 50 ? 'var(--primary)' : 'var(--error)' }}>
                                    {score}
                                </span>
                                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>/ 100</span>
                            </div>
                        </div>
                        <div style={{ width: '120px', height: '12px', background: 'var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                            <div style={{ width: `${score}%`, height: '100%', background: score > 80 ? 'var(--accent)' : score > 50 ? 'var(--primary)' : 'var(--error)', transition: 'width 0.5s ease-out' }}></div>
                        </div>
                    </div>

                    {/* 3) Top 3 Improvements Panel */}
                    {topImprovements.length > 0 && (
                        <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Wand2 size={14} style={{ color: 'var(--primary)' }} /> Top 3 Improvements
                            </p>
                            <div className="improvement-list">
                                {topImprovements.map((imp, idx) => (
                                    <div key={idx} className="improvement-item">
                                        {imp}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {topImprovements.length === 0 && score === 100 && (
                        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 600 }}>
                            <CheckCircle2 size={16} /> Resume is ATS Optimized!
                        </div>
                    )}
                </div>

                {/* Live Preview with Template class */}
                <div className={`resume-sheet resume-preview-scale resume-${template}`} style={{ alignSelf: 'center' }}>
                    <header className="resume-header">
                        <h1 className="resume-name">{data.personal.name || 'Your Name'}</h1>
                        <div className="resume-contact">
                            {data.personal.email && <span>{data.personal.email}</span>}
                            {data.personal.phone && <span>{data.personal.phone}</span>}
                            {data.personal.location && <span>{data.personal.location}</span>}
                        </div>
                        {(data.links.github || data.links.linkedin) && (
                            <div className="resume-contact" style={{ marginTop: '4px' }}>
                                {data.links.github && <span>GitHub: {data.links.github}</span>}
                                {data.links.linkedin && <span>LinkedIn: {data.links.linkedin}</span>}
                            </div>
                        )}
                    </header>

                    {data.summary && (
                        <div className="resume-section">
                            <h2 className="resume-section-title">Summary</h2>
                            <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{data.summary}</p>
                        </div>
                    )}

                    {data.experience.length > 0 && (
                        <div className="resume-section">
                            <h2 className="resume-section-title">Experience</h2>
                            {data.experience.map((exp, i) => (
                                <div key={i} className="resume-item">
                                    <div className="resume-item-header">
                                        <span className="resume-item-title">{exp.company || 'Company'}</span>
                                        <span className="resume-item-date">{exp.duration}</span>
                                    </div>
                                    <div className="resume-item-subtitle">{exp.position || 'Position'}</div>
                                    <p style={{ fontSize: '0.85rem', marginTop: '4px', whiteSpace: 'pre-wrap' }}>{exp.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.projects.length > 0 && (
                        <div className="resume-section">
                            <h2 className="resume-section-title">Projects</h2>
                            {data.projects.map((proj, i) => (
                                <div key={i} className="resume-item">
                                    <div className="resume-item-header">
                                        <span className="resume-item-title">{proj.title || 'Project Title'}</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', marginTop: '2px' }}>{proj.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.education.length > 0 && (
                        <div className="resume-section">
                            <h2 className="resume-section-title">Education</h2>
                            {data.education.map((edu, i) => (
                                <div key={i} className="resume-item">
                                    <div className="resume-item-header">
                                        <span className="resume-item-title">{edu.school || 'University'}</span>
                                        <span className="resume-item-date">{edu.year}</span>
                                    </div>
                                    <div className="resume-item-subtitle">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.skills && (
                        <div className="resume-section">
                            <h2 className="resume-section-title">Skills</h2>
                            <p style={{ fontSize: '0.9rem' }}>{data.skills}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Builder;
