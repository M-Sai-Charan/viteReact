import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
    username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        navigate('/');
    };
    return (
        <header className="header">
            <div className="header__logo">Vite + React + TS</div>
            <div className="header__user">
                Welcome, {username}
                <button
                    onClick={handleLogout}
                    aria-label="Logout"
                    className="header__logout-btn"
                    title="Logout"
                >
                    &#x23FB;
                </button>
            </div>
        </header>
    );
};

export default Header;
