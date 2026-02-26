import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Upload, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

const Step = () => {
    const { currentStep, setHasArtifact } = useOutletContext();

    const artifactKey = `rb_step_${currentStep}_artifact`;
    const [fileContent, setFileContent] = React.useState(localStorage.getItem(artifactKey) || '');

    const handleUpload = () => {
        const dummyContent = `Artifact for Step ${currentStep} - Generated ${new Date().toISOString()}`;
        localStorage.setItem(artifactKey, dummyContent);
        setFileContent(dummyContent);
        setHasArtifact(true);
    };

    const stepsDescriptions = {
        1: 'Define the specific problem our AI Resume Builder will solve for job seekers.',
        2: 'Identify the target audience and competitive landscape.',
        3: 'Outline the core components and flow of the application.',
        4: 'Map out the page structures and data schemas.',
        5: 'Define individual function logic and API endpoints.',
        6: 'Implement the core features using the chosen tech stack.',
        7: 'Conduct rigorous testing to ensure stability and accuracy.',
        8: 'Prepare the application for production deployment.'
    };

    return (
        <div className="step-content">
            <div style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', fontWeight: 400, lineHeight: 1.6 }}>
                    {stepsDescriptions[currentStep]}
                </p>
            </div>

            <div style={{ padding: '40px', border: '2px dashed var(--border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', background: 'var(--bg-main)' }}>
                {fileContent ? (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                            <CheckCircle2 size={32} />
                        </div>
                        <p style={{ fontWeight: 700, fontSize: '1.125rem' }}>Artifact Uploaded Successfully!</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '4px' }}>{fileContent}</p>
                        <button
                            className="btn btn-outline"
                            style={{ marginTop: '24px' }}
                            onClick={() => {
                                localStorage.removeItem(artifactKey);
                                setFileContent('');
                                setHasArtifact(false);
                            }}
                        >
                            Reset Step
                        </button>
                    </div>
                ) : (
                    <>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Upload size={24} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontWeight: 700, fontSize: '1.125rem' }}>Upload Artifact to Continue</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Next step will be enabled once artifact is confirmed.</p>
                        </div>
                        <button className="btn btn-primary" onClick={handleUpload}>
                            Simulate Upload
                        </button>
                    </>
                )}
            </div>

            <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                <div className="build-card">
                    <p className="build-card-title">Guidelines</p>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '4px', height: '4px', background: 'var(--primary)', borderRadius: '50%' }}></div>
                            Ensure all requirements are met.
                        </li>
                        <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '4px', height: '4px', background: 'var(--primary)', borderRadius: '50%' }}></div>
                            Verify architecture consistency.
                        </li>
                    </ul>
                </div>
                <div className="build-card">
                    <p className="build-card-title">Resources</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>Documentation Guide</a>
                        <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>Example Artifacts</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step;
