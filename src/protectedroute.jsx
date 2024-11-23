import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './Firebase'; // Assuming Firebase is properly initialized

// ProtectedRoute component checks if the user is authenticated
const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if the user is authenticated when the component mounts
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user); // Set authenticated state
            setLoading(false); // Done loading
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    // If still loading, show a loading screen or component
    if (loading) {
        return <div>Loading...</div>;
    }

    // If authenticated, allow access to the protected route, otherwise redirect to login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
