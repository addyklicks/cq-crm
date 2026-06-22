import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import LeadModal from './LeadModal';
import { useLeads } from '../context/LeadsContext';

const Layout = () => {
  const { modalState, closeModal, addLead, updateLead } = useLeads();

  const handleSaveLead = (leadData) => {
    if (modalState.leadToEdit) {
        updateLead(modalState.leadToEdit.id, leadData);
    } else {
        addLead(leadData);
    }
  };

  return (
    <div className="flex h-screen bg-snow overflow-hidden transition-colors dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent dark:scrollbar-thumb-gray-700">
          <Outlet />
        </main>
      </div>
      {modalState.isOpen && (
        <LeadModal 
          isOpen={modalState.isOpen} 
          onClose={closeModal} 
          onSave={handleSaveLead}
          leadToEdit={modalState.leadToEdit}
        />
      )}
    </div>
  );
};

export default Layout;
