import React from 'react';
import { CheckCircle2, Circle, Link as LinkIcon, Github, Globe, Copy, Rocket } from 'lucide-react';

const Proof = () => {
    const [links, setLinks] = React.useState({
        lovable: '',
        github: '',
        deploy: ''
    });

    const steps = [
        { id: 1, name: 'Problem' },
        { id: 2, name: 'Market' },
        { id: 3, name: 'Architecture' },
        { id: 4, name: 'HLD' },
        { id: 5, name: 'LLD' },
        { id: 6, name: 'Build' },
        { id: 7, name: 'Test' },
        { id: 8, name: 'Ship' }
    ];

    const getStatus = (id) => {
        return !!localStorage.getItem(`rb_step_${id}_artifact`);
    };

    const handleCopySubmission = () => {
        const text = `Final Submission - AI Resume Builder\n\nLovable: ${links.lovable}\nGitHub: ${links.github}\nDeploy: ${links.deploy}\n\nSteps Completed: ${steps.filter(s => getStatus(s.id)).length}/8`;
        navigator.clipboard.writeText(text);
        alert('Submission details copied!');
    };

    const isComplete = steps.every(s => getStatus(s.id));

    return (
        <div className="step-content">
            <div style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>
                    Review your progress across all build phases and submit your final links to complete Step 9.
                </p>
            </div>

            <div className="step-status-grid">
                {steps.map(step => (
                    <div key={step.id} className="step-status-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>STEP {step.id}</span>
                            {getStatus(step.id) ? (
                                <div style={{ color: 'var(--accent)' }}><CheckCircle2 size={20} /></div>
                            ) : (
                                <div style={{ color: 'var(--border)' }}><Circle size={20} /></div>
                            )}
                        </div>
                        <p style={{ fontWeight: 700, marginTop: '4px' }}>{step.name}</p>
                    </div>
                ))}
            </div>

            <div className="build-card" style={{ marginTop: '40px' }}>
                <p className="build-card-title">Project Submission Links</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-muted)' }}>
                            Lovable Project Link
                        </label>
                        <div style={{ position: 'relative' }}>
                            <LinkIcon size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                className="input-box"
                                style={{ paddingLeft: '40px', marginBottom: 0 }}
                                placeholder="https://lovable.dev/projects/..."
                                value={links.lovable}
                                onChange={(e) => setLinks({ ...links, lovable: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-muted)' }}>
                            GitHub Repository
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Github size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                className="input-box"
                                style={{ paddingLeft: '40px', marginBottom: 0 }}
                                placeholder="https://github.com/username/repo"
                                value={links.github}
                                onChange={(e) => setLinks({ ...links, github: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-muted)' }}>
                            Live Deployment URL
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Globe size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                className="input-box"
                                style={{ paddingLeft: '40px', marginBottom: 0 }}
                                placeholder="https://ai-resume-builder.vercel.app"
                                value={links.deploy}
                                onChange={(e) => setLinks({ ...links, deploy: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
                    <button
                        className={`btn btn-primary`}
                        style={{ flex: 1, padding: '16px' }}
                        disabled={!isComplete}
                        onClick={handleCopySubmission}
                    >
                        <Copy size={20} /> Copy Final Submission
                    </button>
                    <button
                        className={`btn btn-success`}
                        style={{ flex: 1, padding: '16px', background: 'var(--primary)', boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.4)' }}
                        disabled={!isComplete || !links.lovable || !links.github || !links.deploy}
                    >
                        <Rocket size={20} /> Final Ship Project
                    </button>
                </div>

                {!isComplete && (
                    <p style={{ color: 'var(--error)', fontSize: '0.75rem', fontWeight: 700, marginTop: '12px', textAlign: 'center' }}>
                        * Complete all 8 steps to unlock final submission.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Proof;
