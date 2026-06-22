import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, User, Plus, Moon, Sun } from 'lucide-react';
import { useLeads } from '../context/LeadsContext';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { openModal } = useLeads();
  const { isDark, toggleTheme } = useTheme();
  const navItems = [
    { label: 'Board', path: '/' },
    { label: 'List', path: '/list' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 shadow-sm transition-colors dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center gap-5 min-w-0">
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">CyberQuell CRM</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Sales pipeline</p>
        </div>
        <nav className="flex h-8 items-center rounded-md border border-gray-200 bg-gray-50 p-0.5 dark:border-gray-700 dark:bg-gray-950">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  isActive
                    ? 'bg-white text-secondary shadow-sm dark:bg-gray-800 dark:text-hummingbird'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          onClick={() => openModal()}
          className="flex items-center px-3 py-1.5 bg-secondary text-white rounded text-sm font-medium hover:bg-opacity-90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Lead
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          className="h-8 w-8 rounded border border-gray-200 text-gray-500 hover:text-secondary hover:bg-snow transition-colors flex items-center justify-center dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-hummingbird"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <div className="h-6 w-px bg-gray-200 mx-2 dark:bg-gray-700"></div>
        <button className="text-gray-500 hover:text-secondary transition-colors relative dark:text-gray-300 dark:hover:text-hummingbird">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-2 border-l pl-4 border-gray-200 dark:border-gray-700">
          <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-white">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Cyberquell HQ</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
