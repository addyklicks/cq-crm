import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Kanban, Table2, Settings, Shield } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Kanban, label: 'Leads Board', path: '/board' },
    { icon: Table2, label: 'Leads List', path: '/list' },
  ];

  return (
    <aside className="w-64 bg-primary text-white flex flex-col h-full shadow-lg">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-3" />
        <span className="font-bold text-lg tracking-wide">Cyberquell CRM</span>
      </div>

      <nav className="flex-1 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-secondary text-white border-r-4 border-white'
                  : 'text-gray-300 hover:bg-secondary/50 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-primary/20">
        <button className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 hover:text-white w-full transition-colors">
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
