/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialLeads } from '../data/mockData';

const LeadsContext = createContext();

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return context;
};

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('crm_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    leadToEdit: null,
  });

  useEffect(() => {
    localStorage.setItem('crm_leads', JSON.stringify(leads));
  }, [leads]);

  const openModal = (lead = null) => {
    setModalState({ isOpen: true, leadToEdit: lead });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, leadToEdit: null });
  };

  const addLead = (lead) => {
    const newLead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLead = (id, updatedFields) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updatedFields } : lead))
    );
  };

  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const moveLead = (leadId, newStatus) => {
    updateLead(leadId, { status: newStatus });
  };

  return (
    <LeadsContext.Provider value={{ leads, addLead, updateLead, deleteLead, moveLead, modalState, openModal, closeModal }}>
      {children}
    </LeadsContext.Provider>
  );
};
