import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Dashboard, FacilityDetail, Home} from "pages";
import Footer from "components/footer/Footer";
import AuthProvider from "context/AuthContext";
import AdminRoute from "components/auth/AdminRoute";

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
