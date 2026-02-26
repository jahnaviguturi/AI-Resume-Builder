import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import RootLayout from './components/RootLayout';
import Step from './pages/Step';
import Proof from './pages/Proof';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Preview from './pages/Preview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          {/* Main App Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/proof" element={<div style={{ padding: '80px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Project Proof</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>Artifacts and build evidence will be listed here.</p>
          </div>}
          />

          {/* Developer Track (Project 3 Build System) */}
          <Route path="/rb" element={<Layout />}>
            <Route path="01-problem" element={<Step />} />
            <Route path="02-market" element={<Step />} />
            <Route path="03-architecture" element={<Step />} />
            <Route path="04-hld" element={<Step />} />
            <Route path="05-lld" element={<Step />} />
            <Route path="06-build" element={<Step />} />
            <Route path="07-test" element={<Step />} />
            <Route path="08-ship" element={<Step />} />
            <Route path="proof" element={<Proof />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
