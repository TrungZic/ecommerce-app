import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { AdminProvider } from './context/AdminContext';
import { NotificationProvider } from './context/NotificationContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import { LoadingSpinner } from './components/shared';
import './css/App.css';

// Lazy load components for code splitting
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Cart = lazy(() => import('./components/Cart'));
const Account = lazy(() => import('./components/Account'));
const AdminPortal = lazy(() => import('./components/AdminPortal'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword'));
// const LiveChat = lazy(() => import('./components/LiveChat')); // Disabled

// Fallback component for loading states
const SuspenseFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
    <LoadingSpinner size="large" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <OrderProvider>
                <NotificationProvider>
                  <Header />

                  <Suspense fallback={<SuspenseFallback />}>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/admin" element={<AdminPortal />} />
                      <Route path="/AdminDashboard" element={<AdminDashboard />} />
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/account" element={<Account />} />
                    </Routes>
                  </Suspense>

                  {/* LiveChat disabled temporarily */}
                  {/* <Suspense fallback={null}>
                    <LiveChat />
                  </Suspense> */}
                </NotificationProvider>
              </OrderProvider>
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;


