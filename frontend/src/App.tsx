import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Layout/Navbar';

// Lazy-loaded components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const SignIn = lazy(() => import('./components/Auth/SignIn'));
const SignUp = lazy(() => import('./components/Auth/SignUp'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const ResumeBuilder = lazy(() => import('./components/ResumeBuilder/ResumeBuilder'));
const ResumePreview = lazy(() => import('./components/ResumeBuilder/ResumePreview'));
const TemplatesPage = lazy(() => import('./pages/TemplatesPage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? <>{children}</> : <Navigate to="/signin" />;
};

// Public Route Component (redirects to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return !user ? <>{children}</> : <Navigate to="/dashboard" />;
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          
          {/* Auth Routes */}
          <Route 
            path="/signin" 
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/builder" 
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/builder/:id" 
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/preview/:id" 
            element={
              <ProtectedRoute>
                <ResumePreview />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;