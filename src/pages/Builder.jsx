import React, { useState, useEffect, useMemo } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Globe, Plus, Trash2, Database, Zap, AlertCircle, CheckCircle2, Layout, Sparkles, Wand2, X, ChevronDown, ChevronUp, Github, ExternalLink } from 'lucide-react';

const ACTION_VERBS = ['built', 'developed', 'designed', 'implemented', 'led', 'improved', 'created', 'optimized', 'automated'];

// Tag Input Component
const TagInput = ({ tags, setTags, placeholder }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            if (!tags.includes(input.trim())) {
                setTags([...tags, input.trim()]);
            }
            setInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="tags-container">
            {tags.map((tag, idx) => (
                <span key={idx} className="tag-pill">
                    {tag}
                    <X size={14} className="tag-remove" onClick={() => removeTag(tag)} />
                </span>
            ))}
            <input
                className="tag-input"
                placeholder={placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

const Builder = () => {
    const initialState = {
        personal: { name: '', email: '', phone: '', location: '' },
        summary: '',
        education: [],
        experience: [],
        projects: [],
        skills: {
            technical: [],
            soft: [],
            tools: []
        },
        links: { github: '', linkedin: '' }
    };

    const savedData = localStorage.getItem('resumeBuilderData');
    const [data, setData] = useState(savedData ? JSON.parse(savedData) : initialState);
    const [template, setTemplate] = useState(localStorage.getItem('resumeTemplate') || 'classic');
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [expandedProject, setExpandedProject] = useState(0);

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
                { title: 'AI Resume Builder', desc: 'Designed a premium tool for building ATS-friendly resumes with 100% accuracy.', techStack: ['React', 'Vite', 'Lucide-React'], liveUrl: 'https://resume-builder.ai', githubUrl: 'https://github.com/jahnaviguturi/AI-Resume-Builder' },
                { title: 'Portfolio Site', desc: 'High-performance portfolio using Next.js and Tailwind CSS.', techStack: ['Next.js', 'Tailwind', 'Framer Motion'], liveUrl: 'https://jahnavi.dev', githubUrl: '' }
            ],
            skills: {
                technical: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
                soft: ['Team Leadership', 'Problem Solving'],
                tools: ['Git', 'VS Code', 'Figma']
            },
            links: { github: 'github.com/jahnaviguturi', linkedin: 'linkedin.com/in/jahnaviguturi' }
        });
    };

    const suggestSkills = () => {
        setIsSuggesting(true);
        setTimeout(() => {
            setData(prev => ({
                ...prev,
                skills: {
                    technical: [...new Set([...prev.skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])],
                    soft: [...new Set([...prev.skills.soft, "Team Leadership", "Problem Solving"])],
                    tools: [...new Set([...prev.skills.tools, "Git", "Docker", "AWS"])]
                }
            }));
            setIsSuggesting(false);
        }, 1000);
    };

    const updatePersonal = (field, val) => setData({ ...data, personal: { ...data.personal, [field]: val } });

    const addItem = (type) => {
        let newItem;
        if (type === 'education') newItem = { school: '', degree: '', year: '' };
        else if (type === 'experience') newItem = { company: '', position: '', duration: '', desc: '' };
        else if (type === 'projects') newItem = { title: '', desc: '', techStack: [], liveUrl: '', githubUrl: '' };

        setData({ ...data, [type]: [...data[type], newItem] });
        if (type === 'projects') setExpandedProject(data.projects.length);
    };

    const updateItem = (type, index, field, val) => {
        const newList = [...data[type]];
        newList[index] = { ...newList[index], [field]: val };
        setData({ ...data, [type]: newList });
    };

    const removeItem = (type, index) => {
        const newList = data[type].filter((_, i) => i !== index);
        setData({ ...data, [type]: newList });
    };

    const getBulletGuidance = (text) => {
        if (!text) return null;
        const suggestions = [];
        const words = text.trim().split(/\s+/);
        const firstWord = words[0]?.toLowerCase().replace(/[^a-z]/g, '');
        if (!ACTION_VERBS.includes(firstWord)) suggestions.push("Start with a strong action verb.");
        if (!/\d/.test(text)) suggestions.push("Add measurable impact (numbers).");
        return suggestions;
    };

    const { score, topImprovements } = useMemo(() => {
        let currentScore = 0;
        let improvements = [];

        const summaryWords = data.summary.trim() ? data.summary.trim().split(/\s+/).length : 0;
        if (summaryWords >= 40 && summaryWords <= 120) currentScore += 15;
        else {
            if (summaryWords < 40) improvements.push("Expand your summary to at least 40 words.");
            if (summaryWords > 120) improvements.push("Shorten your summary to under 120 words.");
        }

        if (data.projects.length >= 2) currentScore += 10;
        else improvements.push("Add at least 2 technical projects.");

        if (data.experience.length >= 1) currentScore += 10;
        else improvements.push("Add internship or project work to experience.");

        const skillsCount = (data.skills?.technical?.length || 0) + (data.skills?.soft?.length || 0) + (data.skills?.tools?.length || 0);
        if (skillsCount >= 8) currentScore += 10;
        else improvements.push("List at least 8 relevant skills.");

        if (data.links.github.trim() || data.links.linkedin.trim()) currentScore += 10;

        const hasNumbers = [...data.experience, ...data.projects].some(item => (item.desc && /\d/.test(item.desc)));
        if (hasNumbers) currentScore += 15;
        else improvements.push("Use numbers (%, X, k) to show scale of achievements.");

        const eduComplete = data.education.length > 0 && data.education.every(edu => edu.school && edu.degree && edu.year);
        if (eduComplete) currentScore += 10;

        if (data.personal.name && data.personal.email) currentScore += 20;

        return { score: Math.min(currentScore, 100), topImprovements: improvements.slice(0, 3) };
    }, [data]);

    return (
        <div className="builder-container">
            <div className="builder-form">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Resume Details</h2>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn btn-outline" onClick={() => setData(initialState)} style={{ color: 'var(--error)' }}><Trash2 size={16} /> Clear</button>
                        <button className="btn btn-outline" onClick={loadSampleData}><Database size={16} /> Load Sample</button>
                    </div>
                </div>

                <div className="template-tabs">
                    {['classic', 'modern', 'minimal'].map(t => (
                        <button key={t} className={`template-tab ${template === t ? 'active' : ''}`} onClick={() => setTemplate(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                    ))}
                </div>

                <section className="form-section">
                    <h3 className="form-section-title"><User size={20} /> Personal Info</h3>
                    <div className="input-group">
                        <div className="input-wrapper"><label className="label">Name</label><input className="input-field" value={data.personal.name} onChange={(e) => updatePersonal('name', e.target.value)} /></div>
                        <div className="input-wrapper"><label className="label">Email</label><input className="input-field" value={data.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} /></div>
                        <div className="input-wrapper"><label className="label">Phone</label><input className="input-field" value={data.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} /></div>
                        <div className="input-wrapper"><label className="label">Location</label><input className="input-field" value={data.personal.location} onChange={(e) => updatePersonal('location', e.target.value)} /></div>
                    </div>
                </section>

                <section className="form-section">
                    <h3 className="form-section-title"><Database size={20} /> Summary</h3>
                    <textarea className="textarea-field" value={data.summary} onChange={(e) => setData({ ...data, summary: e.target.value })} />
                </section>

                <section className="form-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 className="form-section-title" style={{ marginBottom: 0 }}><Code size={20} /> Skills</h3>
                        <button className={`btn btn-primary ${isSuggesting ? 'loading-shimmer' : ''}`} disabled={isSuggesting} onClick={suggestSkills}>
                            <Sparkles size={16} /> {isSuggesting ? 'Suggesting...' : 'Suggest Skills'}
                        </button>
                    </div>
                    {(['technical', 'soft', 'tools']).map((cat) => (
                        <div key={cat} style={{ marginBottom: '16px' }}>
                            <label className="label" style={{ marginBottom: '8px', display: 'block' }}>
                                {cat === 'technical' ? 'Technical Skills' : cat === 'soft' ? 'Soft Skills' : 'Tools & Technologies'}
                                ({data.skills[cat]?.length || 0})
                            </label>
                            <TagInput
                                tags={data.skills[cat] || []}
                                setTags={(newTags) => setData({ ...data, skills: { ...data.skills, [cat]: newTags } })}
                                placeholder={`Type and press Enter to add to ${cat}...`}
                            />
                        </div>
                    ))}
                </section>

                <section className="form-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 className="form-section-title" style={{ marginBottom: 0 }}><Zap size={20} /> Projects</h3>
                        <button className="btn btn-outline" onClick={() => addItem('projects')}><Plus size={16} /> Add Project</button>
                    </div>
                    {data.projects.map((item, i) => (
                        <div key={i} className="accordion-item">
                            <div className="accordion-header" onClick={() => setExpandedProject(expandedProject === i ? -1 : i)}>
                                <span className="accordion-title">{item.title || 'Untitled Project'}</span>
                                {expandedProject === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                            {expandedProject === i && (
                                <div className="accordion-content">
                                    <div className="input-wrapper" style={{ marginBottom: '12px' }}>
                                        <label className="label">Project Title</label>
                                        <input className="input-field" value={item.title} onChange={(e) => updateItem('projects', i, 'title', e.target.value)} />
                                    </div>
                                    <div className="input-wrapper" style={{ marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <label className="label">Description</label>
                                            <span style={{ fontSize: '0.65rem' }}>{item.desc?.length || 0}/200</span>
                                        </div>
                                        <textarea className="textarea-field" style={{ minHeight: '60px' }} maxLength={200} value={item.desc} onChange={(e) => updateItem('projects', i, 'desc', e.target.value)} />
                                        {getBulletGuidance(item.desc)?.map((s, idx) => (
                                            <div key={idx} className="guidance-msg"><Sparkles size={12} /> {s}</div>
                                        ))}
                                    </div>
                                    <div className="input-wrapper" style={{ marginBottom: '12px' }}>
                                        <label className="label">Tech Stack</label>
                                        <TagInput tags={item.techStack || []} setTags={(tags) => updateItem('projects', i, 'techStack', tags)} placeholder="React, Vite..." />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-wrapper"><label className="label">Live URL</label><input className="input-field" value={item.liveUrl} onChange={(e) => updateItem('projects', i, 'liveUrl', e.target.value)} /></div>
                                        <div className="input-wrapper"><label className="label">GitHub URL</label><input className="input-field" value={item.githubUrl} onChange={(e) => updateItem('projects', i, 'githubUrl', e.target.value)} /></div>
                                    </div>
                                    <button className="btn" onClick={() => removeItem('projects', i)} style={{ marginTop: '12px', color: 'var(--error)', width: '100%' }}><Trash2 size={16} /> Delete Project</button>
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                <section className="form-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 className="form-section-title" style={{ marginBottom: 0 }}><Briefcase size={20} /> Experience</h3>
                        <button className="btn btn-outline" onClick={() => addItem('experience')}><Plus size={16} /> Add</button>
                    </div>
                    {data.experience.map((item, i) => (
                        <div key={i} className="repeater-item">
                            <button onClick={() => removeItem('experience', i)} style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--error)', border: 'none', background: 'none' }}><Trash2 size={16} /></button>
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

                <section className="form-section" style={{ marginBottom: '100px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 className="form-section-title" style={{ marginBottom: 0 }}><GraduationCap size={20} /> Education</h3>
                        <button className="btn btn-outline" onClick={() => addItem('education')}><Plus size={16} /> Add</button>
                    </div>
                    {data.education.map((item, i) => (
                        <div key={i} className="repeater-item">
                            <button onClick={() => removeItem('education', i)} style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--error)', border: 'none', background: 'none' }}><Trash2 size={16} /></button>
                            <input className="input-box" placeholder="School" value={item.school} onChange={(e) => updateItem('education', i, 'school', e.target.value)} />
                            <input className="input-box" placeholder="Degree" value={item.degree} onChange={(e) => updateItem('education', i, 'degree', e.target.value)} />
                        </div>
                    ))}
                </section>
            </div>

            <div className="builder-preview">
                <div className={`resume-sheet resume-preview-scale resume-${template}`}>
                    <header className="resume-header">
                        <h1 className="resume-name">{data.personal.name || 'Your Name'}</h1>
                        <div className="resume-contact">
                            {data.personal.email && <span>{data.personal.email}</span>}
                            {data.personal.phone && <span>{data.personal.phone}</span>}
                        </div>
                    </header>

                    {data.summary && (
                        <div className="resume-section">
                            <h2 className="resume-section-title">Summary</h2>
                            <p className="resume-text">{data.summary}</p>
                        </div>
                    )}

                    {data.skills && Object.values(data.skills).some(cat => cat?.length > 0) && (
                        <div className="resume-section">
                            <h2 className="resume-section-title">Skills</h2>
                            {Object.entries(data.skills).map(([cat, tags]) => tags?.length > 0 && (
                                <div key={cat}>
                                    <div className="skill-group-title">{cat === 'technical' ? 'Technical' : cat === 'soft' ? 'Soft Skills' : 'Tools'}</div>
                                    <div className="skill-pills">
                                        {tags.map((tag, idx) => <span key={idx} className="skill-pill">{tag}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.projects.length > 0 && (
                        <div className="resume-section">
                            <h2 className="resume-section-title">Projects</h2>
                            {data.projects.map((proj, i) => (
                                <div key={i} className="project-preview-card">
                                    <div className="project-preview-header">
                                        <span className="resume-item-title">{proj.title || 'Project Title'}</span>
                                        <div className="project-links">
                                            {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="project-link-icon"><Github size={14} /></a>}
                                            {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="project-link-icon"><ExternalLink size={14} /></a>}
                                        </div>
                                    </div>
                                    <p className="resume-text" style={{ fontSize: '0.8rem' }}>{proj.desc}</p>
                                    <div className="tech-pills">
                                        {proj.techStack?.map((tech, idx) => <span key={idx} className="tech-pill">{tech}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Minimalist preview for others */}
                    {data.experience.length > 0 && (
                        <div className="resume-section">
                            <h2 className="resume-section-title">Experience</h2>
                            {data.experience.map((exp, i) => (
                                <div key={i} className="resume-item">
                                    <div className="resume-item-header">
                                        <span className="resume-item-title">{exp.company}</span>
                                        <span className="resume-item-date">{exp.duration}</span>
                                    </div>
                                    <p className="resume-text">{exp.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Score panel floating/sticky */}
                <div className="build-card glass" style={{ position: 'fixed', top: '100px', right: '40px', width: '300px' }}>
                    <p className="build-card-title">ATS Score</p>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>{score}</div>
                    <div className="improvement-list">
                        {topImprovements.map((imp, idx) => <div key={idx} className="improvement-item">{imp}</div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Builder;
