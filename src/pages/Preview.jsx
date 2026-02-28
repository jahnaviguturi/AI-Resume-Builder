import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Check, Download, Printer, AlertTriangle, FileText, Github, Linkedin, ExternalLink, CheckCircle2, Award, Zap } from 'lucide-react';

const ACTION_VERBS = ['built', 'developed', 'designed', 'implemented', 'led', 'improved', 'created', 'optimized', 'automated'];

const Preview = () => {
    // Load from localStorage
    const getInitialData = () => {
        const saved = localStorage.getItem('resumeBuilderData');
        if (!saved) return null;
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse saved data:", e);
            return null;
        }
    };

    const [savedData, setSavedData] = useState(localStorage.getItem('resumeBuilderData'));
    const data = getInitialData();

    const savedTemplate = localStorage.getItem('resumeTemplate');
    const [template, setTemplate] = useState(savedTemplate || 'classic');
    const color = localStorage.getItem('resumeColor') || 'hsl(168, 60%, 40%)';
    const [copySuccess, setCopySuccess] = useState(false);
    const [toast, setToast] = useState('');

    useEffect(() => {
        const handleStorage = () => {
            setSavedData(localStorage.getItem('resumeBuilderData'));
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const { score, topImprovements } = useMemo(() => {
        if (!data) return { score: 0, topImprovements: [] };
        let currentScore = 0;
        let improvements = [];

        if (data.personal.name?.trim()) currentScore += 10;
        else improvements.push({ text: "Add your full name", points: 10 });
        if (data.personal.email?.trim()) currentScore += 10;
        else improvements.push({ text: "Add your email address", points: 10 });
        if (data.personal.phone?.trim()) currentScore += 5;
        else improvements.push({ text: "Add your phone number", points: 5 });
        if (data.links?.linkedin?.trim()) currentScore += 5;
        else improvements.push({ text: "Include LinkedIn", points: 5 });
        if (data.links?.github?.trim()) currentScore += 5;
        else improvements.push({ text: "Include GitHub", points: 5 });
        const summaryText = data.summary?.trim() || '';
        if (summaryText.length > 50) currentScore += 10;
        else improvements.push({ text: "Summary > 50 chars", points: 10 });
        if (ACTION_VERBS.some(v => summaryText.toLowerCase().includes(v))) currentScore += 10;
        else improvements.push({ text: "Use action verbs in summary", points: 10 });
        if (data.experience?.length > 0 && data.experience.some(e => e.desc?.trim())) currentScore += 15;
        else improvements.push({ text: "Experience with bullets", points: 15 });
        if (data.education?.length > 0) currentScore += 10;
        else improvements.push({ text: "Education background", points: 10 });
        const totalSkills = (data.skills?.technical?.length || 0) + (data.skills?.soft?.length || 0) + (data.skills?.tools?.length || 0);
        if (totalSkills >= 5) currentScore += 10;
        else improvements.push({ text: "Add 5+ skills", points: 10 });
        if (data.projects?.length > 0) currentScore += 10;
        else improvements.push({ text: "Add a project", points: 10 });

        return { score: Math.min(currentScore, 100), topImprovements: improvements.slice(0, 3) };
    }, [data]);

    const getScoreTier = () => {
        if (score <= 40) return { label: 'Needs Work', class: 'tier-red', color: '#ef4444' };
        if (score <= 70) return { label: 'Getting There', class: 'tier-amber', color: '#f59e0b' };
        return { label: 'Strong Resume', class: 'tier-green', color: '#10b981' };
    };

    const tier = getScoreTier();
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;

    useEffect(() => {
        localStorage.setItem('resumeTemplate', template);
    }, [template]);

    if (!data) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>No resume data found.</h2>
                <p>Please go to the builder and enter your details.</p>
            </div>
        );
    }

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    // 1) Validation Hardening
    const isIncomplete = !data.personal.name || (data.projects.length === 0 && data.experience.length === 0);

    const handlePrint = () => {
        window.print();
    };

    // 2) Copy Plain Text
    const handleCopyText = () => {
        let text = `${data.personal.name || 'NAME'}\n`;
        text += `${data.personal.email} | ${data.personal.phone} | ${data.personal.location}\n`;
        if (data.links.github || data.links.linkedin) {
            text += `${data.links.github ? 'GitHub: ' + data.links.github : ''} ${data.links.linkedin ? ' | LinkedIn: ' + data.links.linkedin : ''}\n`;
        }

        text += `\nSUMMARY\n${data.summary}\n`;

        if (data.experience.length > 0) {
            text += `\nEXPERIENCE\n`;
            data.experience.forEach(exp => {
                text += `${exp.company} | ${exp.position} | ${exp.duration}\n${exp.desc}\n\n`;
            });
        }

        if (data.projects.length > 0) {
            text += `\nPROJECTS\n`;
            data.projects.forEach(proj => {
                text += `${proj.title}\n${proj.desc}\n`;
                if (proj.techStack?.length > 0) text += `Tech Stack: ${proj.techStack.join(', ')}\n`;
                if (proj.liveUrl) text += `Live: ${proj.liveUrl}\n`;
                if (proj.githubUrl) text += `GitHub: ${proj.githubUrl}\n`;
                text += `\n`;
            });
        }

        if (data.education.length > 0) {
            text += `\nEDUCATION\n`;
            data.education.forEach(edu => {
                text += `${edu.school} | ${edu.degree} | ${edu.year}\n`;
            });
        }

        if (data.skills) {
            text += `\nSKILLS\n`;
            Object.entries(data.skills).forEach(([cat, tags]) => {
                if (tags?.length > 0) {
                    text += `${cat.toUpperCase()}: ${tags.join(', ')}\n`;
                }
            });
        }

        navigator.clipboard.writeText(text);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const renderContact = () => (
        <div className="resume-contact">
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.phone && <span>{data.personal.phone}</span>}
            {data.personal.location && <span>{data.personal.location}</span>}
            <div className="social-links-preview">
                {data.links.linkedin && <a href={data.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={12} /> LinkedIn</a>}
                {data.links.github && <a href={data.links.github} target="_blank" rel="noreferrer"><Github size={12} /> GitHub</a>}
            </div>
        </div>
    );

    const renderSkills = () => (
        data.skills && Object.values(data.skills).some(cat => cat?.length > 0) && (
            <div className="resume-section">
                <h2 className="resume-section-title">Skills</h2>
                {Object.entries(data.skills).map(([cat, tags]) => tags?.length > 0 && (
                    <div key={cat} className="avoid-break">
                        <div className="skill-group-title">{cat === 'technical' ? 'Technical' : cat === 'soft' ? 'Soft Skills' : 'Tools'}</div>
                        <div className="skill-pills">
                            {tags.map((tag, idx) => <span key={idx} className="skill-pill">{tag}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        )
    );

    const renderContent = () => (
        <>
            {data.summary && (
                <div className="resume-section">
                    <h2 className="resume-section-title">Summary</h2>
                    <p className="resume-text">{data.summary}</p>
                </div>
            )}
            {data.experience.length > 0 && (
                <div className="resume-section">
                    <h2 className="resume-section-title">Experience</h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="resume-item avoid-break">
                            <div className="resume-item-header">
                                <span className="resume-item-title">{exp.company || 'Company'}</span>
                                <span className="resume-item-date">{exp.duration}</span>
                            </div>
                            <div className="resume-item-subtitle">{exp.position || 'Position'}</div>
                            <p className="resume-text" style={{ whiteSpace: 'pre-wrap' }}>{exp.desc}</p>
                        </div>
                    ))}
                </div>
            )}
            {data.projects.length > 0 && (
                <div className="resume-section">
                    <h2 className="resume-section-title">Projects</h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="project-preview-card avoid-break">
                            <div className="project-preview-header">
                                <span className="resume-item-title">{proj.title || 'Project Title'}</span>
                                <div className="project-links no-print">
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
            {data.education.length > 0 && (
                <div className="resume-section">
                    <h2 className="resume-section-title">Education</h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="resume-item avoid-break">
                            <div className="resume-item-header">
                                <span className="resume-item-title">{edu.school || 'University'}</span>
                                <span className="resume-item-date">{edu.year}</span>
                            </div>
                            <div className="resume-item-subtitle">{edu.degree}</div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );

    return (
        <div className="preview-container" style={{ background: 'var(--bg-main)', minHeight: 'calc(100vh - 72px)', padding: '40px 20px', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '30px', alignItems: 'flex-start' }}>

            <div style={{ width: '100%', maxWidth: '210mm', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Validation Warning */}
                {isIncomplete && (
                    <div className="build-card glass" style={{ width: '100%', marginBottom: '20px', borderLeft: '4px solid var(--error)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AlertTriangle style={{ color: 'var(--error)' }} size={20} />
                        <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>Your resume may look incomplete. Add your name and at least one project/experience.</span>
                    </div>
                )}

                {/* Export Toolbar */}
                <div className="build-card toolbar no-print" style={{ width: '100%', marginBottom: '24px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                        <div className="template-tabs" style={{ marginBottom: 0, width: '280px' }}>
                            <button className={`template-tab ${template === 'classic' ? 'active' : ''}`} onClick={() => setTemplate('classic')}>Classic</button>
                            <button className={`template-tab ${template === 'modern' ? 'active' : ''}`} onClick={() => setTemplate('modern')}>Modern</button>
                            <button className={`template-tab ${template === 'minimal' ? 'active' : ''}`} onClick={() => setTemplate('minimal')}>Minimal</button>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn btn-outline" onClick={handleCopyText}>
                                {copySuccess ? <Check size={16} /> : <FileText size={16} />}
                                {copySuccess ? 'Copied!' : 'Copy as Text'}
                            </button>
                            <button className="btn btn-primary" onClick={handlePrint} style={{ marginRight: '8px' }}>
                                <Printer size={16} /> Print
                            </button>
                            <button className="btn btn-primary" onClick={() => showToast('PDF export ready! Check your downloads.')}>
                                <Download size={16} /> Download PDF
                            </button>
                        </div>
                    </div>
                </div>

                {/* Resume Sheet */}
                <div id="resume-to-print" className={`resume-sheet resume-${template}`} style={{ boxShadow: 'var(--shadow-lg)', '--accent-resume': color }}>
                    {template === 'modern' ? (
                        <div className="resume-modern">
                            <aside className="modern-sidebar">
                                <header>
                                    <h1 className="resume-name" style={{ color: 'white', fontSize: '1.5rem' }}>{data.personal.name || 'Your Name'}</h1>
                                    {renderContact()}
                                </header>
                                {renderSkills()}
                            </aside>
                            <main className="modern-main">
                                {renderContent()}
                            </main>
                        </div>
                    ) : (
                        <>
                            <header className="resume-header">
                                <h1 className="resume-name">{data.personal.name || 'Your Name'}</h1>
                                {renderContact()}
                            </header>
                            {template === 'classic' && renderSkills()}
                            {renderContent()}
                            {template === 'minimal' && renderSkills()}
                        </>
                    )}
                </div>
            </div>

            {/* ATS Score Sidebar */}
            <div className="build-card glass no-print" style={{ position: 'sticky', top: '40px', width: '300px', padding: '24px', flexShrink: 0 }}>
                <h3 className="build-card-title" style={{ textAlign: 'center', marginBottom: '20px' }}><Award size={20} /> ATS Score</h3>

                <div className="score-circle-container">
                    <svg className="score-circle-svg" viewBox="0 0 100 100">
                        <circle className="score-circle-bg" cx="50" cy="50" r="45" />
                        <circle
                            className="score-circle-progress"
                            cx="50"
                            cy="50"
                            r="45"
                            stroke={tier.color}
                            style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
                        />
                    </svg>
                    <div className="score-text-center">
                        <span className="score-number" style={{ color: tier.color }}>{score}</span>
                        <span className="score-percent">/100</span>
                    </div>
                </div>

                <div className={`score-tier-label ${tier.class}`}>{tier.label}</div>

                <div className="improvement-list">
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Top Suggestions</p>
                    {topImprovements.length > 0 ? topImprovements.map((imp, idx) => (
                        <div key={idx} className="improvement-item">
                            <span>{imp.text}</span>
                            <span className="improvement-points">+{imp.points}</span>
                        </div>
                    )) : (
                        <div className="improvement-item" style={{ borderColor: '#d1fae5', background: '#f0fdf4' }}>
                            <CheckCircle2 size={14} color="#10b981" />
                            <span>Your resume is ATS-optimized!</span>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '24px', padding: '12px', background: 'rgba(255,255,255,0.5)', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '8px' }}>
                        <Zap size={14} /> Higher scores improve your chances with automated screening systems.
                    </p>
                </div>
            </div>

            {toast && (
                <div className="toast-container">
                    <div className="toast">
                        <CheckCircle2 size={20} color="var(--accent)" />
                        {toast}
                    </div>
                </div>
            )}

            <style>
                {`
                @media print {
                    @page {
                        margin: 0;
                    }
                    body {
                        background: white !important;
                    }
                    .no-print, .app-nav, .proof-footer, .toolbar, .toast-container {
                        display: none !important;
                    }
                    .preview-container {
                        padding: 0 !important;
                        background: transparent !important;
                    }
                    .resume-sheet {
                        box-shadow: none !important;
                        margin: 0 !important;
                        width: 210mm !important;
                        height: 297mm !important;
                        border: none !important;
                        padding: 0 !important;
                    }
                    .avoid-break {
                        page-break-inside: avoid;
                    }
                    .project-links {
                        display: none !important;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default Preview;
