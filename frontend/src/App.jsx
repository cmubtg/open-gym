import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, Home } from "pages";
import Footer from "components/footer/Footer";
import AuthProvider from "context/AuthContext";
import AdminRoute from "components/auth/AdminRoute";
import Layout from "pages/Layout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
