import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useLeads } from '../context/LeadsContext';
import { MoreHorizontal, DollarSign, Calendar } from 'lucide-react';

const statuses = ['New', 'Contacted', 'Qualified', 'Negotiation', 'Won', 'Lost'];

const LeadCard = ({ lead, index }) => {
  const { openModal } = useLeads();
  return (
    <Draggable draggableId={lead.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-3 hover:shadow-md transition-shadow
            ${snapshot.isDragging ? 'shadow-lg ring-2 ring-secondary rotate-1' : ''}`}
        >
          <div className="flex justify-between items-start mb-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium
              ${lead.priority === 'High' ? 'bg-red-100 text-red-700' : 
                lead.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                'bg-blue-100 text-blue-700'}`}>
              {lead.priority}
            </span>
            <button 
              onClick={() => openModal(lead)}
              className="text-gray-400 hover:text-secondary"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <h4 className="font-bold text-gray-900 mb-1">{lead.title}</h4>
          <p className="text-sm text-gray-500 mb-3">{lead.company}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-50">
            <div className="flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              {lead.value.toLocaleString()}
            </div>
            <div className="flex items-center">
               <div className="h-5 w-5 rounded-full bg-secondary text-white flex items-center justify-center text-[10px] mr-2">
                 {lead.assignee.split(' ').map(n => n[0]).join('')}
               </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const KanbanBoard = () => {
  const { leads, moveLead } = useLeads();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move lead to new status
    moveLead(draggableId, destination.droppableId);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Leads Board</h1>
      </div>
      
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex h-full space-x-6 min-w-max pb-4">
            {statuses.map((status) => {
              const statusLeads = leads.filter((l) => l.status === status);
              return (
                <div key={status} className="w-80 flex flex-col h-full rounded-xl bg-snow border border-gray-200">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-700">{status}</h3>
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                      {statusLeads.length}
                    </span>
                  </div>
                  
                  <Droppable droppableId={status}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 p-3 overflow-y-auto min-h-[100px] transition-colors
                          ${snapshot.isDraggingOver ? 'bg-gray-100' : ''}`}
                      >
                        {statusLeads.map((lead, index) => (
                          <LeadCard key={lead.id} lead={lead} index={index} />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
