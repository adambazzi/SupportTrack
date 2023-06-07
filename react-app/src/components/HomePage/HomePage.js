import React, { useState, useEffect, useRef } from "react";
import { getTickets } from "../../store/tickets";
import TicketComponent from "./TicketComponent";
import './HomePage.css'
import CreateTicketModal from "../CreateTicketModal";
import OpenModalButton from "../OpenModalButton";
import { useSelector } from "react-redux";
import { getUserTickets } from "../../store/tickets";

function HomePage() {
  const [tickets, setTickets] = useState([]);
  const [openTickets, setOpenTickets] = useState([]);
  const [inProgressTickets, setInProgressTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);
  const [currentView, setCurrentView] = useState('All');
  const [error, setError] = useState(null);
  const sessionUser = useSelector(state => state.session.user);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();


  useEffect(() => {
      if (!showMenu) return;

      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      document.addEventListener("click", closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const fetchData = async () => {
    try {
      const userId = sessionUser.id
      const data = sessionUser.admin ? await getTickets() : await getUserTickets(userId)
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
    <>
      <div className="modal-button-container">
          <OpenModalButton
            buttonText="Create Ticket"
            onItemClick={closeMenu}
            modalComponent={<CreateTicketModal user={sessionUser} refreshTickets={fetchData}/>}
            className="modal-button"
          />
      </div>

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
                      <TicketComponent key={ticket.id} ticket={ticket} refreshTickets={fetchData} user={sessionUser} />
                  ))}
              </div>
          )}
          {currentView === 'Open Tickets' && (
              <div className="openTickets">
                  {openTickets.length > 0 && openTickets.map((ticket) => (
                      <TicketComponent key={ticket.id} ticket={ticket} refreshTickets={fetchData} user={sessionUser} />
                  ))}
              </div>
          )}
          {currentView === 'In Progress' && (
              <div className="inProgressTickets">
                  {inProgressTickets.length > 0 && inProgressTickets.map((ticket) => (
                      <TicketComponent key={ticket.id} ticket={ticket} refreshTickets={fetchData} user={sessionUser} />
                  ))}
              </div>
          )}
          {currentView === 'Closed Tickets' && (
              <div className="closedTickets">
                  {closedTickets.length > 0 && closedTickets.map((ticket) => (
                      <TicketComponent key={ticket.id} ticket={ticket} refreshTickets={fetchData} user={sessionUser} />
                  ))}
              </div>
          )}
      </div>
    </>
  );
}

export default HomePage;
