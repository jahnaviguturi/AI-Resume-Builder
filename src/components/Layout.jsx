import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    Copy,
    ExternalLink,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    ChevronLeft,
    Layout as LayoutIcon,
    ShieldCheck,
    Rocket
} from 'lucide-react';

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    // Extract step number from path (e.g., /rb/01-problem -> 1)
    const stepMatch = path.match(/\/rb\/(\d+)/);
    const currentStep = stepMatch ? parseInt(stepMatch[1], 10) : (path === '/rb/proof' ? 9 : 0);

    const stepTitles = {
        1: 'Identify the Core Problem',
        2: 'Analyze the Market',
        3: 'System Architecture',
        4: 'High Level Design',
        5: 'Low Level Design',
        6: 'The Build Phase',
        7: 'Quality Assurance',
        8: 'Shipping Ritual',
        9: 'Proof of Build'
    };

    const currentTitle = stepTitles[currentStep] || 'Project Overview';

    const handleCopy = () => {
        const text = document.getElementById('lovable-copy-area')?.value;
        if (text) {
            navigator.clipboard.writeText(text);
            alert('Copied to clipboard!');
        }
    };

    const isLastStep = currentStep === 8;
    const isProof = currentStep === 9;

    // Gating logic: Next disabled until artifact uploaded
    const artifactKey = `rb_step_${currentStep}_artifact`;
    const [hasArtifact, setHasArtifact] = React.useState(!!localStorage.getItem(artifactKey));

    React.useEffect(() => {
        // Check if previous steps are completed
        if (currentStep > 1 && currentStep <= 8) {
            for (let i = 1; i < currentStep; i++) {
                if (!localStorage.getItem(`rb_step_${i}_artifact`)) {
                    const prevStep = i.toString().padStart(2, '0');
                    const routes = [
                        '01-problem', '02-market', '03-architecture', '04-hld',
                        '05-lld', '06-build', '07-test', '08-ship'
                    ];
                    navigate(`/rb/${routes[i - 1]}`);
                    return;
                }
            }
        }

        // Check if all steps are completed before letting them into proof
        if (currentStep === 9) {
            for (let i = 1; i <= 8; i++) {
                if (!localStorage.getItem(`rb_step_${i}_artifact`)) {
                    const prevStep = i.toString().padStart(2, '0');
                    const routes = [
                        '01-problem', '02-market', '03-architecture', '04-hld',
                        '05-lld', '06-build', '07-test', '08-ship'
                    ];
                    navigate(`/rb/${routes[i - 1]}`);
                    return;
                }
            }
        }

        const checkArtifact = () => {
            setHasArtifact(!!localStorage.getItem(artifactKey));
        };
        window.addEventListener('storage', checkArtifact);
        const interval = setInterval(checkArtifact, 1000);
        return () => {
            window.removeEventListener('storage', checkArtifact);
            clearInterval(interval);
        };
    }, [currentStep, artifactKey, navigate]);

    const handleNext = () => {
        if (currentStep < 8) {
            const nextStep = (currentStep + 1).toString().padStart(2, '0');
            // Find next route
            const routes = [
                '01-problem', '02-market', '03-architecture', '04-hld',
                '05-lld', '06-build', '07-test', '08-ship'
            ];
            navigate(`/rb/${routes[currentStep]}`);
        } else if (currentStep === 8) {
            navigate('/rb/proof');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            const prevStepIndex = currentStep - 2;
            const routes = [
                '01-problem', '02-market', '03-architecture', '04-hld',
                '05-lld', '06-build', '07-test', '08-ship'
            ];
            navigate(`/rb/${routes[prevStepIndex]}`);
        }
    };

    return (
        <div className="premium-layout">
            {/* Top Bar */}
            <header className="top-bar">
                <div className="top-bar-left">
                    <LayoutIcon size={24} />
                    AI Resume Builder
                </div>
                <div className="top-bar-center">
                    {isProof ? 'Final Submission' : `Project 3 — Step ${currentStep} of 8`}
                </div>
                <div className="top-bar-right">
                    <div className="status-badge">
                        {isProof ? 'COMPLETE' : (hasArtifact ? 'READY' : 'IN PROGRESS')}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                </div>
            </header>

            {/* Context Header */}
            <div className="context-header">
                <h1 className="context-title">{currentTitle}</h1>
            </div>

            {/* Main Container */}
            <div className="main-container">
                {/* Workspace */}
                <main className="workspace">
                    <Outlet context={{ currentStep, setHasArtifact }} />
                </main>

                {/* Build Panel */}
                {!isProof && (
                    <aside className="build-panel">
                        <div className="build-card">
                            <p className="build-card-title">Lovable Integration</p>
                            <textarea
                                id="lovable-copy-area"
                                className="lovable-textarea"
                                placeholder="Content to copy into Lovable..."
                                readOnly
                                value={`I am building Project 3: AI Resume Builder. Current Step: ${currentStep}. Task: ${currentTitle}.`}
                            />
                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                <button className="btn btn-outline" onClick={handleCopy} style={{ flex: 1 }}>
                                    <Copy size={16} /> Copy
                                </button>
                                <button className="btn btn-primary" style={{ flex: 1.5 }}>
                                    <ExternalLink size={16} /> Build in Lovable
                                </button>
                            </div>
                        </div>

                        <div className="build-card">
                            <p className="build-card-title">Artifact Status</p>
                            {hasArtifact ? (
                                <div style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                                    <CheckCircle2 size={18} /> Artifact Uploaded
                                </div>
                            ) : (
                                <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <AlertCircle size={18} /> No Artifact Found
                                </div>
                            )}

                            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => {
                                        localStorage.setItem(artifactKey, 'uploaded');
                                        setHasArtifact(true);
                                    }}
                                >
                                    It Worked
                                </button>
                                <button className="btn btn-outline">Error / Help</button>
                                <button className="btn btn-outline">Add Screenshot</button>
                            </div>
                        </div>
                    </aside>
                )}
            </div>

            {/* Proof Footer */}
            {!isProof && (
                <footer className="proof-footer">
                    <button
                        className={`btn btn-outline ${currentStep === 1 ? 'btn-disabled' : ''}`}
                        onClick={handleBack}
                        disabled={currentStep === 1}
                    >
                        <ChevronLeft size={18} /> Previous
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                            <div
                                key={s}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: s === currentStep ? 'var(--primary)' : (localStorage.getItem(`rb_step_${s}_artifact`) ? 'var(--accent)' : 'var(--border)')
                                }}
                            />
                        ))}
                    </div>

                    <button
                        className={`btn btn-primary ${!hasArtifact ? 'btn-disabled' : ''}`}
                        onClick={handleNext}
                        disabled={!hasArtifact}
                    >
                        {isLastStep ? 'Go to Proof' : 'Next Step'} <ChevronRight size={18} />
                    </button>
                </footer>
            )}
        </div>
    );
};

export default Layout;
