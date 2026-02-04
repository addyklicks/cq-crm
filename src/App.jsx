import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import KanbanBoard from './pages/KanbanBoard';
import LeadsList from './pages/LeadsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="board" element={<KanbanBoard />} />
          <Route path="list" element={<LeadsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
