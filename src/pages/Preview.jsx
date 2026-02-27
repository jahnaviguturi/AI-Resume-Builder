import React, { useState, useEffect } from 'react';
import { Layout, Check, Download, Printer } from 'lucide-react';

const Preview = () => {
    // Load from localStorage
    const savedData = localStorage.getItem('resumeBuilderData');
    const data = savedData ? JSON.parse(savedData) : null;

    const savedTemplate = localStorage.getItem('resumeTemplate');
    const [template, setTemplate] = useState(savedTemplate || 'classic');

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

    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: 'calc(100vh - 72px)', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Template Selector for Preview */}
            <div className="build-card" style={{ width: '100%', maxWidth: '210mm', marginBottom: '24px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="template-tabs" style={{ marginBottom: 0, width: '300px' }}>
                        <button className={`template-tab ${template === 'classic' ? 'active' : ''}`} onClick={() => setTemplate('classic')}>Classic</button>
                        <button className={`template-tab ${template === 'modern' ? 'active' : ''}`} onClick={() => setTemplate('modern')}>Modern</button>
                        <button className={`template-tab ${template === 'minimal' ? 'active' : ''}`} onClick={() => setTemplate('minimal')}>Minimal</button>
                    </div>
                    <button className="btn btn-primary" onClick={handlePrint}>
                        <Printer size={16} /> Print / Save PDF
                    </button>
                </div>
            </div>

            {/* Resume Sheet */}
            <div className={`resume-sheet resume-${template}`} style={{ boxShadow: 'var(--shadow-lg)' }}>
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

            <style>
                {`
                @media print {
                    body * { visibility: hidden; }
                    .resume-sheet, .resume-sheet * { visibility: visible; }
                    .resume-sheet { 
                        position: absolute; 
                        left: 0; 
                        top: 0; 
                        width: 210mm;
                        box-shadow: none;
                        padding: 0;
                        margin: 0;
                    }
                    .build-card, .app-nav { display: none !important; }
                }
                `}
            </style>
        </div>
    );
};

export default Preview;
