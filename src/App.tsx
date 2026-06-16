import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const LandingPage = lazy(() => import('@/features/home/components/LandingPage'));
const FormatSelection = lazy(() => import('@/features/templates/pages/FormatSelectionPage'));
const ResumeBuilder = lazy(() => import('@/features/builder/pages/ResumeBuilderPage'));
const ATSChecker = lazy(() => import('@/features/ats/pages/ATSCheckerPage'));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const SignUpPage = lazy(() => import('@/features/auth/pages/SignUpPage'));
const MyResumes = lazy(() => import('@/features/dashboard/pages/MyResumesPage'));

import { Toaster } from 'react-hot-toast';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen w-full">
    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Router>
          <div className="min-h-screen w-screen relative">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />

                {/* Protected Routes */}
                <Route path="/select-format" element={<ProtectedRoute><FormatSelection /></ProtectedRoute>} />
                <Route path="/builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
                <Route path="/ats-checker" element={<ProtectedRoute><ATSChecker /></ProtectedRoute>} />
                <Route path="/my-resumes" element={<ProtectedRoute><MyResumes /></ProtectedRoute>} />

                {/* 404 Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
