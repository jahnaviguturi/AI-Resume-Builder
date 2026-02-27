import React, { useState, useEffect } from 'react';
import { Layout, Check, Download, Printer, AlertTriangle, FileText, Github, ExternalLink } from 'lucide-react';

const Preview = () => {
    // Load from localStorage
    const savedData = localStorage.getItem('resumeBuilderData');
    const data = savedData ? JSON.parse(savedData) : null;

    const savedTemplate = localStorage.getItem('resumeTemplate');
    const [template, setTemplate] = useState(savedTemplate || 'classic');
    const [copySuccess, setCopySuccess] = useState(false);

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

    return (
        <div className="preview-container" style={{ background: 'var(--bg-main)', minHeight: 'calc(100vh - 72px)', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Validation Warning */}
            {isIncomplete && (
                <div className="build-card glass" style={{ width: '100%', maxWidth: '210mm', marginBottom: '20px', borderLeft: '4px solid var(--error)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <AlertTriangle style={{ color: 'var(--error)' }} size={20} />
                    <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>Your resume may look incomplete. Add your name and at least one project/experience.</span>
                </div>
            )}

            {/* Export Toolbar */}
            <div className="build-card toolbar no-print" style={{ width: '100%', maxWidth: '210mm', marginBottom: '24px', padding: '16px' }}>
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
                        <button className="btn btn-primary" onClick={handlePrint}>
                            <Printer size={16} /> Print / Save PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Resume Sheet */}
            <div id="resume-to-print" className={`resume-sheet resume-${template}`} style={{ boxShadow: 'var(--shadow-lg)' }}>
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

                {data.skills && Object.values(data.skills).some(cat => cat?.length > 0) && (
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
                )}
            </div>

            <style>
                {`
                @media print {
                    @page {
                        margin: 15mm;
                    }
                    body {
                        background: white !important;
                    }
                    .no-print, .app-nav, .proof-footer {
                        display: none !important;
                    }
                    .preview-container {
                        padding: 0 !important;
                        background: transparent !important;
                    }
                    .resume-sheet {
                        box-shadow: none !important;
                        margin: 0 !important;
                        width: 100% !important;
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
