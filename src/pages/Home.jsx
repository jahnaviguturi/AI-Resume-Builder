import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, Github, Linkedin, Plus, Trash2, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Globe, Download, Eye, Layout } from 'lucide-react';

const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
            <div className="status-badge" style={{ marginBottom: '24px' }}>AI-Powered Precision</div>
            <h1 style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '24px', maxWidth: '800px' }}>
                Build a Resume That <span style={{ color: 'var(--primary)' }}>Gets Read.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '40px', lineHeight: 1.6 }}>
                Experience the KodNest standard. Clean, professional, and optimized for both human recruiters and ATS systems.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
                <NavLink to="/builder" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
                    Start Building
                </NavLink>
                <button className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
                    View Examples
                </button>
            </div>
            <div style={{ marginTop: '80px', display: 'flex', gap: '40px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} /> ATS Optimized</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} /> Premium Fonts</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} /> Live Export</div>
            </div>
        </div>
    );
};

const CheckCircle2 = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
);

export default LandingPage;
