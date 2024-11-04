import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, FacilityDetail } from "./pages";
import GoogleAuthProviderWrapper from "./components/misc/GoogleAuthProviderWrapper";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <GoogleAuthProviderWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facility/:id" element={<FacilityDetail />} />
        </Routes>
      </Router>

      <Footer />
    </GoogleAuthProviderWrapper>
  );
}

export default App;
