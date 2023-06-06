import React, { useState, useEffect } from "react";
import { getTickets } from "../../store/tickets";
import AdminTicketComponent from "./AdminTicketComponent";
import './AdminHomePage.css'

function AdminHomePage() {
  const [tickets, setTickets] = useState([]);
  const [openTickets, setOpenTickets] = useState([]);
  const [inProgressTickets, setInProgressTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);
  const [currentView, setCurrentView] = useState('All');
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
      setOpenTickets(data.filter(el => el.ticket_status === 'Open'));
      setInProgressTickets(data.filter(el => el.ticket_status === 'In Progress'));
      setClosedTickets(data.filter(el => el.ticket_status === 'Closed'));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="homePage__admin">
        <div className="button-group">
        <button
        onClick={() => setCurrentView('All')}
        className={`ticket_button ${currentView === 'All' ? 'selected' : ''}`}
        >
        All
        </button>
        <button
        onClick={() => setCurrentView('Open Tickets')}
        className={`ticket_button ${currentView === 'Open Tickets' ? 'selected' : ''}`}
        >
        Open
        </button>
        <button
        onClick={() => setCurrentView('In Progress')}
        className={`ticket_button ${currentView === 'In Progress' ? 'selected' : ''}`}
        >
        In progress
        </button>
        <button
        onClick={() => setCurrentView('Closed Tickets')}
        className={`ticket_button ${currentView === 'Closed Tickets' ? 'selected' : ''}`}
        >
        Closed Tickets
        </button>

        </div>
        {currentView === 'All' && (
            <div className="allTickets">
                {tickets.length > 0 && tickets.map((ticket) => (
                    <AdminTicketComponent key={ticket.id} ticket={ticket} refreshTickets={fetchData} />
                ))}
            </div>
        )}
        {currentView === 'Open Tickets' && (
            <div className="openTickets">
                {openTickets.length > 0 && openTickets.map((ticket) => (
                    <AdminTicketComponent key={ticket.id} ticket={ticket} refreshTickets={fetchData} />
                ))}
            </div>
        )}
        {currentView === 'In Progress' && (
            <div className="inProgressTickets">
                {inProgressTickets.length > 0 && inProgressTickets.map((ticket) => (
                    <AdminTicketComponent key={ticket.id} ticket={ticket} refreshTickets={fetchData} />
                ))}
            </div>
        )}
        {currentView === 'Closed Tickets' && (
            <div className="closedTickets">
                {closedTickets.length > 0 && closedTickets.map((ticket) => (
                    <AdminTicketComponent key={ticket.id} ticket={ticket} refreshTickets={fetchData} />
                ))}
            </div>
        )}
    </div>
  );
}

export default AdminHomePage;
