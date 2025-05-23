import './i18n'; 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './components/AuthProvider.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';
import App from './App.jsx';
import Layout from './Layout.jsx';
import Cert from './Cert.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.css';
import CertDetail from './CertDetail.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import About from './About.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import UserDashboard from './UserDashboard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout context={{}} />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'cert',
        element: <Cert />,
      },
      {
        path: 'cert/:certId',
        element: <CertDetail />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'user',
        element: <ProtectedRoute requiredRole="User" />,
        children: [{ index: true, element: <UserDashboard /> }],
      },
      {
        path: 'admin',
        element: <ProtectedRoute requiredRole="Admin" />,
        children: [{ index: true, element: <AdminDashboard /> }],  
       
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
