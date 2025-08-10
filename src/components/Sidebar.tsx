import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  items: string[];
  selectedItem: string;
  onSelect: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, selectedItem, onSelect }) => {
  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar__list">
          {items.map((item) => (
            <li
              key={item}
              className={`sidebar__item ${selectedItem === item ? 'sidebar__item--active' : ''}`}
              onClick={() => onSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
