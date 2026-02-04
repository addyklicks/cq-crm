import React from 'react';
import { Search, Bell, User, Plus } from 'lucide-react';
import { useLeads } from '../context/LeadsContext';

const Header = () => {
  const { openModal } = useLeads();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center flex-1">
        <div className="relative w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-snow border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 bg-secondary text-white rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create
        </button>
        <div className="h-6 w-px bg-gray-200 mx-2"></div>
        <button className="text-gray-500 hover:text-secondary transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-2 border-l pl-4 border-gray-200">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white">
            <User className="h-5 w-5" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">Cyberquell HQ</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
