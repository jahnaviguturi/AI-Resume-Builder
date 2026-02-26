import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Layout as LayoutIcon, FileText, Eye, ShieldCheck } from 'lucide-react';

const RootLayout = () => {
    const location = useLocation();

    // Check if it's the home page or /rb route
    const isHome = location.pathname === '/';
    const isRb = location.pathname.startsWith('/rb');

    // Use the custom nav for the main app
    if (!isRb && !isHome) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <nav className="app-nav">
                    <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '1.25rem' }}>
                        <FileText size={24} /> AI Resume Builder
                    </NavLink>
                    <div className="nav-links">
                        <NavLink to="/builder" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Builder</NavLink>
                        <NavLink to="/preview" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Preview</NavLink>
                        <NavLink to="/proof" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Proof</NavLink>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div className="status-badge">Ver. 1.0</div>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-light)' }}></div>
                    </div>
                </nav>
                <main style={{ flex: 1 }}>
                    <Outlet />
                </main>
            </div>
        );
    }

    // For Home and /rb, just provide the outlet (or special home framing)
    return <Outlet />;
};

export default RootLayout;
