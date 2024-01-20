import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, FacilityDetail } from './pages';
import Footer from './components/footer/Footer';

function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/facility/:id" element={<FacilityDetail/>} />
          </Routes>
        </Router> 
        <Footer/>
      </>
  );
}

export default App;