import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import KanbanBoard from './pages/KanbanBoard';
import LeadsList from './pages/LeadsList';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="board" element={<KanbanBoard />} />
          <Route path="list" element={<LeadsList />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
