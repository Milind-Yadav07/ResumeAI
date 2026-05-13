import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';

const LandingPage = lazy(() => import('./pages/home page/LandingPage'));
const FormatSelection = lazy(() => import('./pages/template page/FormatSelection'));
const ResumeBuilder = lazy(() => import('./pages/builder page/ResumeBuilder'));
const ATSChecker = lazy(() => import('./pages/ats page/ATSChecker'));


function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="min-h-screen w-screen relative">
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen w-full"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/select-format" element={<FormatSelection />} />
              <Route path="/builder" element={<ResumeBuilder />} />
              <Route path="/ats-checker" element={<ATSChecker />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;
