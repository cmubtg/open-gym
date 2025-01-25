import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, FacilityDetail } from "pages";
import Footer from "components/footer/Footer";
import { AuthProvider } from "context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facility/:id" element={<FacilityDetail />} />
        </Routes>
      </Router>

      <Footer />
    </AuthProvider>
  );
}

export default App;
