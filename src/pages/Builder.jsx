import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Globe, Plus, Trash2, Database } from 'lucide-react';

const Builder = () => {
    const [data, setData] = useState({
        personal: { name: '', email: '', phone: '', location: '' },
        summary: '',
        education: [],
        experience: [],
        projects: [],
        skills: '',
        links: { github: '', linkedin: '' }
    });

    const loadSampleData = () => {
        setData({
            personal: { name: 'Jahnavi Guturi', email: 'jahnavi@example.com', phone: '+91 98765 43210', location: 'Bangalore, India' },
            summary: 'Ambitious Software Engineer with a passion for building elegant, user-centric applications. Expert in React and modern CSS.',
            education: [{ school: 'KodNest Institute', degree: 'Full Stack Development', year: '2025' }],
            experience: [{ company: 'Tech Innovators', position: 'Frontend Intern', duration: '2024 - Present', desc: 'Working on premium UI components.' }],
            projects: [{ title: 'AI Resume Builder', desc: 'A premium tool for building ATS-friendly resumes.' }],
            skills: 'React, Javascript, CSS, Node.js, Git',
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

    return (
        <div className="builder-container">
            {/* Form Section */}
            <div className="builder-form">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Resume Details</h2>
                    <button className="btn btn-outline" onClick={loadSampleData}>
                        <Database size={16} /> Load Sample Data
                    </button>
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
                            <div className="input-wrapper" style={{ marginTop: '12px' }}><label className="label">Description</label><textarea className="textarea-field" style={{ minHeight: '60px' }} value={item.desc} onChange={(e) => updateItem('experience', i, 'desc', e.target.value)} /></div>
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
            <div className="builder-preview">
                <div className="resume-sheet resume-preview-scale">
                    <header className="resume-header">
                        <h1 className="resume-name">{data.personal.name || 'Your Name'}</h1>
                        <div className="resume-contact">
                            {data.personal.email && <span>{data.personal.email}</span>}
                            {data.personal.phone && <span>{data.personal.phone}</span>}
                            {data.personal.location && <span>{data.personal.location}</span>}
                        </div>
                    </header>

                    {data.summary && (
                        <div className="resume-section">
                            <h2 className="resume-section-title">Professional Summary</h2>
                            <p style={{ fontSize: '0.95rem' }}>{data.summary}</p>
                        </div>
                    )}

                    {data.experience.length > 0 && (
                        <div className="resume-section">
                            <h2 className="resume-section-title">Experience</h2>
                            {data.experience.map((exp, i) => (
                                <div key={i} className="resume-item">
                                    <div className="resume-item-header">
                                        <span className="resume-item-title">{exp.company}</span>
                                        <span className="resume-item-date">{exp.duration}</span>
                                    </div>
                                    <div className="resume-item-subtitle">{exp.position}</div>
                                    <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>{exp.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.skills && (
                        <div className="resume-section">
                            <h2 className="resume-section-title">Skills</h2>
                            <p style={{ fontSize: '0.95rem' }}>{data.skills}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Builder;
