import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home, FacilityDetail} from './pages';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <>      
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* TODO: Add dynamic route for FacilityDetail */}
          {/* <Route path="/gym/:id" element={<FacilityDetail/>} /> */}
        </Routes>

        <Footer/>
      </>
    </Router>
  );
}

export default App;