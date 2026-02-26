import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Step from './pages/Step';
import Proof from './pages/Proof';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/rb/01-problem" replace />} />

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

        <Route path="*" element={<Navigate to="/rb/01-problem" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
