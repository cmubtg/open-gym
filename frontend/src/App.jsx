import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, FacilityDetail, Dashboard } from "pages";
import Footer from "components/footer/Footer";
import { AuthProvider, useAuth } from "context/AuthContext";
import { Navigate, useLocation } from 'react-router-dom';

// Protect Admin routes 
const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};


function App() {
  return (
    <AuthProvider>
      <Router>      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facility/:id" element={<FacilityDetail />} />
          <Route 
            path="/dashboard" 
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            } 
          />
        </Routes>
      </Router>
      <Footer />
    </AuthProvider>
  );
}

export default App;
