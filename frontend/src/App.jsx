import React from 'react';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ProvideBusinessDetails from './pages/ProvideBusinessDetails';
import ProvideBrandStory from './components/BusinessDetails/ProvideBrandStory';
import ProvideBusinessLocation from './components/BusinessDetails/ProvideBusinessLocation';
import TemplateHomePage from './Templates/FashionStoreOne/HomePage';
import TemplateProducts from './Templates/FashionStoreOne/ProductsPage';
import ErrorPage from './pages/Error404/ErrorPage';
import ForgetPassword from './pages/ForgetPassword'; 
import WebsiteGenerationScreen from './components/BusinessDetails/WebsiteGenerationScreen';
import CustomizeTemplateHeader from './pages/ViewTemplate';
import CustomizeWebsiteScreen from './pages/CustomizeWebsite/CustomizeWebsiteScreen';
import AppRouter from './dashboard/Router';
import ProtectedRoute from './pages/ProtectedRoute'; 

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>

        {/* Accessible routes to user without logging in */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/dashboard" />} />
        <Route path="/forget-password" element={<ForgetPassword />} /> 

        {/* Protected routes */}
        <Route path="/provide-business-details" element={<ProtectedRoute element={<ProvideBusinessDetails />} />} />
        <Route path="/provide-brand-story" element={<ProtectedRoute element={<ProvideBrandStory />} />} />
        <Route path="/provide-business-location" element={<ProtectedRoute element={<ProvideBusinessLocation />} />} />
        <Route path="/template-home" element={<ProtectedRoute element={<TemplateHomePage />} />} />
        <Route path="/template-products" element={<ProtectedRoute element={<TemplateProducts />} />} />
        <Route path="/template-gen-screen" element={<ProtectedRoute element={<WebsiteGenerationScreen />} />} />
        <Route path="/template-view" element={<ProtectedRoute element={<CustomizeTemplateHeader />} />} />
        <Route path="/customize-website-screen" element={<ProtectedRoute element={<CustomizeWebsiteScreen />} />} />
        <Route path="/dashboard/*" element={<ProtectedRoute element={<AppRouter />} />} />

        {/* Catch-all for undefined routes */}
        <Route path="/*" element={<ErrorPage />} />

      </Routes>
    </Router>
  );
}

export default App;
