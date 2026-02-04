import React from 'react';
import { useLeads } from '../context/LeadsContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, Users, TrendingUp, Activity } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-primary mt-2">{value}</h3>
      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
  </div>
);

const Dashboard = () => {
  const { leads } = useLeads();

  // Metrics
  const totalLeads = leads.length;
  const totalValue = leads.reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);
  const wonLeads = leads.filter((l) => l.status === 'Won').length;
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : 0;

  // Chart Data
  const stages = ['New', 'Contacted', 'Qualified', 'Negotiation', 'Won', 'Lost'];
  const chartData = stages.map((stage) => ({
    name: stage,
    count: leads.filter((l) => l.status === stage).length,
  }));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Last updated: Today</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Leads"
          value={totalLeads}
          icon={Users}
          color="bg-primary"
          subtext="+2 this week"
        />
        <StatCard
          title="Pipeline Value"
          value={formatCurrency(totalValue)}
          icon={DollarSign}
          color="bg-secondary"
          subtext="Projected revenue"
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={TrendingUp}
          color="bg-accent"
          subtext="Leads to Won"
        />
        <StatCard
          title="Active Negotiations"
          value={leads.filter(l => l.status === 'Negotiation').length}
          icon={Activity}
          color="bg-orange-500"
          subtext="Requires attention"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-primary mb-6">Leads by Stage</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis allowDecimals={false} />
                <Tooltip 
                  cursor={{fill: '#F9F9F9'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Won' ? '#00754A' : '#1E3932'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-primary mb-4">Recent Activity</h3>
          <div className="space-y-4">
             {leads.slice(0, 5).map((lead) => (
               <div key={lead.id} className="flex items-center justify-between p-3 hover:bg-snow rounded-md transition-colors border-b border-gray-50 last:border-0">
                 <div className="flex items-center space-x-3">
                   <div className="h-8 w-8 rounded-full bg-hummingbird flex items-center justify-center text-primary font-bold text-xs">
                     {lead.company.substring(0, 2).toUpperCase()}
                   </div>
                   <div>
                     <p className="text-sm font-medium text-gray-900">{lead.title}</p>
                     <p className="text-xs text-gray-500">{lead.company}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                     ${lead.status === 'Won' ? 'bg-green-100 text-green-800' : 
                       lead.status === 'Lost' ? 'bg-red-100 text-red-800' : 
                       'bg-blue-100 text-blue-800'}`}>
                     {lead.status}
                   </span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
