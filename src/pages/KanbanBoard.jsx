import React, { useMemo, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { DollarSign, Filter, Mail, MoreHorizontal, Search, Settings2, UserRound } from 'lucide-react';
import { useLeads } from '../context/LeadsContext';
import { statuses } from '../data/mockData';

const wipLimits = {
  New: 10,
  '1st Followup': 8,
  '2nd Followup': 6,
  Negotiation: 5,
  Won: null,
  Lost: null,
};

const priorityStyles = {
  High: 'border-l-red-500 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300',
  Medium: 'border-l-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300',
  Low: 'border-l-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300',
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

const LeadCard = ({ lead, index }) => {
  const { openModal } = useLeads();
  const initials = lead.assignee
    .split(' ')
    .map((name) => name[0])
    .join('');

  return (
    <Draggable draggableId={lead.id} index={index}>
      {(provided, snapshot) => (
        <article
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-2.5 border-l-4 bg-white border border-gray-200 border-l-secondary px-3 py-2.5 shadow-sm transition-colors hover:border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:border-l-hummingbird dark:hover:border-gray-600 ${
            snapshot.isDragging ? 'ring-2 ring-secondary shadow-lg' : ''
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <button
              type="button"
              onClick={() => openModal(lead)}
              className="min-w-0 text-left"
            >
              <h3 className="truncate text-sm font-semibold text-gray-900 hover:text-secondary dark:text-gray-100 dark:hover:text-hummingbird">
                {lead.title}
              </h3>
              <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">{lead.company}</p>
            </button>
            <button
              type="button"
              onClick={() => openModal(lead)}
              aria-label={`Open ${lead.title}`}
              className="shrink-0 text-gray-400 hover:text-secondary dark:text-gray-500 dark:hover:text-hummingbird"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-2 grid gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5 text-gray-400" />
              <span className="truncate">{lead.contact}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-gray-400" />
              <span className="truncate">{lead.email || 'No email added'}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-800">
            <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${priorityStyles[lead.priority]}`}>
              {lead.priority}
            </span>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <DollarSign className="h-3 w-3" />
                {formatCurrency(lead.value).replace('$', '')}
              </span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-white">
                {initials}
              </span>
            </div>
          </div>
        </article>
      )}
    </Draggable>
  );
};

const KanbanBoard = () => {
  const { leads, moveLead, openModal } = useLeads();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return leads;
    }

    return leads.filter((lead) =>
      [lead.title, lead.company, lead.contact, lead.email, lead.assignee, lead.priority]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [leads, searchTerm]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    moveLead(draggableId, destination.droppableId);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 border-b border-gray-200 pb-4 dark:border-gray-800">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Leads Board</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Track fresh leads through 1st Followup, 2nd Followup, negotiation, and close.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search board"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="h-8 w-full rounded border border-gray-300 bg-white pl-8 pr-3 text-sm text-gray-800 outline-none transition focus:border-secondary focus:ring-1 focus:ring-secondary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>
            <button className="flex h-8 items-center gap-1.5 rounded border border-gray-300 px-2.5 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex h-8 items-center gap-1.5 rounded border border-gray-300 px-2.5 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
              <Settings2 className="h-4 w-4" />
              Board settings
            </button>
            <button
              onClick={() => openModal()}
              className="h-8 rounded bg-secondary px-3 text-sm font-semibold text-white hover:bg-opacity-90"
            >
              New Lead
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex h-full min-w-max gap-3 pb-4">
            {statuses.map((status) => {
              const statusLeads = filteredLeads.filter((lead) => lead.status === status);
              const wipLimit = wipLimits[status];
              const isOverLimit = wipLimit !== null && statusLeads.length > wipLimit;

              return (
                <section
                  key={status}
                  className="flex h-full w-72 flex-col border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="border-b border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{status}</h2>
                      <span
                        className={`rounded px-1.5 py-0.5 text-xs font-semibold ${
                          isOverLimit
                            ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {wipLimit === null ? statusLeads.length : `${statusLeads.length} / ${wipLimit}`}
                      </span>
                    </div>
                  </div>

                  <Droppable droppableId={status}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 overflow-y-auto p-2.5 transition-colors ${
                          snapshot.isDraggingOver ? 'bg-hummingbird/40 dark:bg-gray-800' : ''
                        }`}
                      >
                        {statusLeads.length === 0 && (
                          <button
                            type="button"
                            onClick={() => openModal()}
                            className="flex min-h-28 w-full items-center justify-center border border-dashed border-gray-300 bg-white/60 px-3 text-center text-xs font-medium text-gray-500 hover:border-secondary hover:text-secondary dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-500 dark:hover:border-hummingbird dark:hover:text-hummingbird"
                          >
                            Create a lead
                          </button>
                        )}
                        {statusLeads.map((lead, index) => (
                          <LeadCard key={lead.id} lead={lead} index={index} />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </section>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
