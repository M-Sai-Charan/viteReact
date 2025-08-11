import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './MainContent.css';

const todoMenuItems = [
    { label: 'To-Do App', path: 'todo' },
    { label: 'Shopping App', path: 'shopping' },
    { label: 'Weather App', path: 'weather' },
    { label: 'Recipes App', path: 'recipes' },
];

const MainContent: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const username = localStorage.getItem('username') || 'Guest';
    const selectedItem = todoMenuItems.find(item => location.pathname.endsWith(item.path))?.label || todoMenuItems[0].label;

    const handleSelect = (label: string) => {
        const item = todoMenuItems.find(i => i.label === label);
        if (item) {
            navigate(`/${item.path}`);
        }
    };

    return (
        <div className="main-layout">
            <Header username={username} />
            <div className="main-body">
                <Sidebar
                    items={todoMenuItems.map(i => i.label)}
                    selectedItem={selectedItem}
                    onSelect={handleSelect}
                />
                <section className="content-area">
                    <Outlet />
                </section>
            </div>
        </div>
    );
};

export default MainContent;
