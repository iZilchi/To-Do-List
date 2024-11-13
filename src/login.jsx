import { useState, useEffect } from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';  

import './styles/login.css';

export function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);  
    const [errorMessage, setErrorMessage] = useState("");  
    const [loading, setLoading] = useState(false);  
    const [user, setUser] = useState(null);  // To track if a user is logged in
    const navigate = useNavigate();  

    // Validate email format
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    // Validate password length
    const validatePasswordLength = (password) => password.length >= 6;

    // Validate password format
    const validatePasswordFormat = (password) => /[a-zA-Z]/.test(password) && /[0-9]/.test(password) && /^[a-zA-Z0-9._%+-]*$/.test(password);

    // Handle Sign Up
    const handleSignUp = async () => {
        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        if (!validatePasswordLength(password)) {
            setErrorMessage("Password must be at least 6 characters.");
            return;
        }
        if (!validatePasswordFormat(password)) {
            setErrorMessage("Password must contain the following characters: Letters (A-Z or a-z) AND Numbers (0-9) with OPTIONAL dot (.).");
            return;
        }
        setLoading(true); // Set loading state
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully");
            navigate('/todo');  // Redirect to ToDo list page after successful sign-up
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage("This email is already associated with an account. Please sign in.");
            } else if (error.code === 'auth/weak-password') {
                setErrorMessage("Password should be at least 6 characters.");
            } else if (error.code === 'auth/invalid-email') {
                setErrorMessage("Invalid email address.");
            } else {
                setErrorMessage(error.message);  // Display other errors
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Handle Login
    const handleLogin = async () => {
        setLoading(true); // Set loading state
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login Successfully!")
            navigate('/todo');  // Redirect to ToDo list page after successful login
        } catch (error) {
            if (error.code === 'auth/invalid-email'){
                setErrorMessage("Invalid email. Please input correct email and try again.");
            } else if (error.code === 'auth/missing-password'){
                setErrorMessage("Missing password input. Please enter your password.");
            } else if (error.code === 'auth/invalid-credential'){
                setErrorMessage("Invalid credentials. Please check your email and password.");
            } else {
                setErrorMessage("Login failed. Please try again.");
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Handle Google Login
    const handleGoogleLogin = async () => {
        setLoading(true); 
        try {
            await signInWithPopup(auth, googleProvider);
            alert("Signed in with Google");
            navigate('/todo');  
        } catch (error) {
            setErrorMessage(error.message);  
        } finally {
            setLoading(false); 
        }
    };

    // Handle Forgot Password
    const handleForgotPassword = async () => {
        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent.");
        } catch (error) {
            setErrorMessage(error.message);  
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        try {
            await signOut(auth);  // Sign out the user
            setUser(null);  // Clear user state
            console.log("Logged out successfully");
            navigate('/');  // Redirect to the homepage after logout
        } catch (error) {
            setErrorMessage(error.message);  // Handle any errors
        }
    };

    // Redirect to /todo if the user is already logged in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);  // Set the logged-in user
                navigate('/todo');
            } else {
                setUser(null);  // Set user to null if logged out
            }
        });

        return () => unsubscribe();  
    }, [navigate]);

    return (
        <div className="sign-in-container">
            <h3>{isSignUp ? "Create Account" : "Sign In"}</h3>

            {/* Email Input */}
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="text"
                placeholder="EMAIL"
                className="username-textbox"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage("");  
                }}
            />

            {/* Password Input */}
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                placeholder="PASSWORD"
                className="password-textbox"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage("");  
                }}
            />

            {/* Error Message Display */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Sign Up / Sign In Button */}
            <button
                className="sign-in-button"
                onClick={isSignUp ? handleSignUp : handleLogin}
                disabled={loading}  // Disable button while loading
            >
                {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
            </button>

            <h4>OR SIGN IN WITH</h4>
            <button className="google-button" onClick={handleGoogleLogin} disabled={loading}>
                {loading ? "Signing in..." : <img src="src/Assets/GLogo.png" alt="Google Button" className="g-button" />}
            </button>

            {/* Forgot Password Button */}
            <button className="forgot-password" onClick={handleForgotPassword} disabled={loading}>
                FORGOT PASSWORD?
            </button>

            {/* Toggle between Sign In and Sign Up */}
            <button
                className="toggle-sign-up"
                onClick={() => {
                    setIsSignUp(prev => !prev);
                    setErrorMessage("");  
                }}
            >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Create Account"}
            </button>

            {/* Logout Button (only visible if user is logged in) */}
            {user && (
                <button className="logout-button" onClick={handleLogout}>
                    LOGOUT
                </button>
            )}
        </div>
    );
}

export default Auth;
