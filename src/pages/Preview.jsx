import React from 'react';

const Preview = () => {
    // In a real app, we'd pull from state/store. For now, we'll demonstrate the clean layout.
    const sample = {
        personal: { name: 'JAHNAVI GUTURI', email: 'jahnavi@example.com', phone: '+91 98765 43210', location: 'Bangalore, India' },
        summary: 'Strategic Software Engineer with extensive experience in architecting scalable web solutions. Proven track record of delivering premium user experiences through meticulous design and robust engineering practices.',
        experience: [
            { company: 'Global Tech Solutions', position: 'Senior Frontend Developer', duration: '2022 - PRESENT', desc: 'Leading the development of a flagship SaaS platform. Improved performance by 40% through code optimization and modern state management.' },
            { company: 'Creative Digital Agency', position: 'Web Developer', duration: '2020 - 2022', desc: 'Developed high-performance websites for international clients. Focused on accessibility and responsive design.' }
        ],
        education: [
            { school: 'National Institute of Technology', degree: 'Bachelor of Technology in Computer Science', year: '2020' }
        ],
        skills: 'React.js, TypeScript, Next.js, Node.js, GraphQL, Tailwind CSS, PostgreSQL, AWS, Docker, Git'
    };

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: 'calc(100vh - 72px)', padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
            <div className="resume-sheet" style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                <header className="resume-header" style={{ borderBottom: '3px solid #000' }}>
                    <h1 className="resume-name" style={{ fontSize: '3rem', letterSpacing: '-0.05em' }}>{sample.personal.name}</h1>
                    <div className="resume-contact" style={{ fontWeight: 600, color: '#000', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem' }}>
                        <span>{sample.personal.email}</span>
                        <span>•</span>
                        <span>{sample.personal.phone}</span>
                        <span>•</span>
                        <span>{sample.personal.location}</span>
                    </div>
                </header>

                <div className="resume-section">
                    <h2 className="resume-section-title" style={{ fontSize: '0.85rem', color: '#000' }}>Executive Summary</h2>
                    <p style={{ fontSize: '1rem', color: '#333', textAlign: 'justify' }}>{sample.summary}</p>
                </div>

                <div className="resume-section">
                    <h2 className="resume-section-title" style={{ fontSize: '0.85rem', color: '#000' }}>Professional Experience</h2>
                    {sample.experience.map((exp, i) => (
                        <div key={i} className="resume-item" style={{ marginBottom: i === sample.experience.length - 1 ? 0 : '20px' }}>
                            <div className="resume-item-header">
                                <span className="resume-item-title" style={{ fontSize: '1.1rem' }}>{exp.company}</span>
                                <span className="resume-item-date">{exp.duration}</span>
                            </div>
                            <div className="resume-item-subtitle" style={{ color: '#000', fontWeight: 600, fontStyle: 'normal', textTransform: 'uppercase', fontSize: '0.8rem' }}>{exp.position}</div>
                            <p style={{ fontSize: '0.95rem', color: '#444', marginTop: '6px' }}>{exp.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="resume-section">
                    <h2 className="resume-section-title" style={{ fontSize: '0.85rem', color: '#000' }}>Academic Background</h2>
                    {sample.education.map((edu, i) => (
                        <div key={i} className="resume-item">
                            <div className="resume-item-header">
                                <span className="resume-item-title">{edu.school}</span>
                                <span className="resume-item-date">{edu.year}</span>
                            </div>
                            <div className="resume-item-subtitle">{edu.degree}</div>
                        </div>
                    ))}
                </div>

                <div className="resume-section" style={{ marginBottom: 0 }}>
                    <h2 className="resume-section-title" style={{ fontSize: '0.85rem', color: '#000' }}>Technical Proficiency</h2>
                    <p style={{ fontSize: '1rem', color: '#333', fontWeight: 500 }}>{sample.skills}</p>
                </div>
            </div>
        </div>
    );
};

export default Preview;
