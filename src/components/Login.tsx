import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateUsername = (name: string) => /^[^\s]{3,}$/.test(name);
    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password: string) => password.length >= 6;

    useEffect(() => {
        if (username === '') {
            setUsernameError('');
        } else if (!validateUsername(username)) {
            setUsernameError('Username must be at least 3 characters with no spaces.');
        } else {
            setUsernameError('');
        }
    }, [username]);

    useEffect(() => {
        if (email === '') {
            setEmailError('');
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    }, [email]);

    useEffect(() => {
        if (password === '') {
            setPasswordError('');
        } else if (!validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters long.');
        } else {
            setPasswordError('');
        }
    }, [password]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateUsername(username)) {
            setUsernameError('Username must be at least 3 characters with no spaces.');
            return;
        }
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters long.');
            return;
        }
        login();
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        navigate('/todo')
    };

    const isFormValid =
        username !== '' &&
        email !== '' &&
        password !== '' &&
        !usernameError &&
        !emailError &&
        !passwordError;

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1 className="login-title">Welcome {username ? username : 'Back'}</h1>
                    <p className="login-subtitle">Please login to your account</p>

                    <label htmlFor="username" className="input-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className={`input-field ${usernameError ? 'input-error' : ''}`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        autoComplete="username"
                    />
                    {usernameError && <div className="error-text">{usernameError}</div>}

                    <label htmlFor="email" className="input-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className={`input-field ${emailError ? 'input-error' : ''}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                    />
                    {emailError && <div className="error-text">{emailError}</div>}

                    <label htmlFor="password" className="input-label">Password</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className={`input-field ${passwordError ? 'input-error' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className="show-password-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {passwordError && <div className="error-text">{passwordError}</div>}

                    <button type="submit" className="login-btn" >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
