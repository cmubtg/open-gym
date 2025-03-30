import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from 'context/AuthContext';

// Protect Admin routes
const AdminRoute = ({ children }) => {
    const { isAdmin } = useAuth();
    const location = useLocation();

    if (!isAdmin) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminRoute;