import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './protectedroute';
import Auth from './Login'; 
import ToDoList from './ToDoList'; 

function App() {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/todo" element={<ToDoList />} />
                </Route>

                {/* Default route */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;