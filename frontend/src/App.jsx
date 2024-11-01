import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import { Home, FacilityDetail } from './pages';
import Footer from './components/footer/Footer';

function App() {
  return (
    <GoogleOAuthProvider clientId="935523924383-h3j9osncso40dml2iiltmq9kuc1nteh5.apps.googleusercontent.com">
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/facility/:id" element={<FacilityDetail />} />
          </Routes>
        </Router>
        <Footer />
      </>
    </GoogleOAuthProvider>
  );
}

export default App;
