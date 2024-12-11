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
    const [user, setUser] = useState(null); 
    const navigate = useNavigate();  

    // EMAIL FORMAT
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    // PASSWORD LENGTH
    const validatePasswordLength = (password) => password.length >= 6;

    // PASSWORD FORMAT
    const validatePasswordFormat = (password) => /[a-zA-Z]/.test(password) && /[0-9]/.test(password) && /^[a-zA-Z0-9._%+-]*$/.test(password);

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
        setLoading(true); 
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully");
            navigate('/todo');  
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage("This email is already associated with an account. Please sign in.");
            } else if (error.code === 'auth/weak-password') {
                setErrorMessage("Password should be at least 6 characters.");
            } else if (error.code === 'auth/invalid-email') {
                setErrorMessage("Invalid email address.");
            } else {
                setErrorMessage(error.message);  
            }
        } finally {
            setLoading(false); 
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login Successfully!")
            navigate('/todo');  
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
            setLoading(false); 
        }
    };

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

    const handleLogout = async () => {
        try {
            await signOut(auth);  
            setUser(null); 
            console.log("Logged out successfully");
            navigate('/');  
        } catch (error) {
            setErrorMessage(error.message);  
        }
    };

    // SAVE LOGIN STATUS
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);  
                navigate('/todo');
            } else {
                setUser(null);  
            }
        });

        return () => unsubscribe();  
    }, [navigate]);

    return (
        <div className="sign-in-background">
            <div className="sign-in-container">
                <h3>{isSignUp ? "Create Account" : "Sign In"}</h3>
                <form>
                    <label htmlFor="email"
                    className="email-text">
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Enter your email"
                        className={`username-textbox ${errorMessage ? 'error' : ''}`}  
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorMessage(""); 
                        }}
                    />
                    <label htmlFor="password"
                    className="password-text">
                    Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className={`password-textbox ${errorMessage ? 'error' : ''}`}  
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrorMessage("");  
                        }}
                    />

                    {errorMessage && <p className="error-message show">{errorMessage}</p>}
                
                    <button
                        className="sign-in-button"
                        onClick={isSignUp ? handleSignUp : handleLogin}
                        disabled={loading}  
                    >
                        {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
                    </button>
                </form>

                <h4>OR SIGN IN WITH</h4>
                <button className="google-button" onClick={handleGoogleLogin} disabled={loading}>
                    {loading ? "Signing in..." : <img src="src/Assets/GLogo.png" alt="Google Button" className="g-button" />}
                </button>

                <button className="forgot-password" onClick={handleForgotPassword} disabled={loading}>
                    FORGOT PASSWORD?
                </button>

                <button
                    className="toggle-sign-up"
                    onClick={() => {
                        setIsSignUp(prev => !prev);
                        setErrorMessage("");  
                    }}
                >
                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Create Account"}
                </button>

                {user && (
                    <button className="logout-button" onClick={handleLogout}>
                        LOGOUT
                    </button>
                )}
            </div>
        </div>
    );
}

export default Auth;
