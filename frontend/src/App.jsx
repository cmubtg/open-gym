import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, FacilityDetail, Dashboard } from "pages";
import Footer from "components/footer/Footer";
import { AuthProvider } from "context/AuthContext";

function App() {
  const subdomain = window.location.hostname.split('.')[0];


  return (
    <AuthProvider>
      <Router>
          {/* Admin dashboard subdomain */}
          {subdomain === 'dashboard' ? (
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/facility/:id" element={<FacilityDetail />} />
            </Routes>
          )}
      </Router>

      <Footer />
    </AuthProvider>
  );
}

export default App;
