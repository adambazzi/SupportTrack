import React, { useState, useRef, useEffect } from "react";
import './TicketComponent.css'
import EditTicketModal from "./EditTicketModal";
import OpenModalButton from "../OpenModalButton";


function TicketComponent({ ticket, refreshTickets, user }) {
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

    return (
    <div className="admin_ticket">
        <div>Ticket Id: {ticket.ticket_id}</div>
        <div>Updated At: {ticket.updated_at}</div>
        <div>Created At: {ticket.created_at}</div>
        <div>Heading: {ticket.ticket_heading}</div>
        <div>Description: {ticket.ticket_description}</div>
        <div>User First Name: {ticket.user_first_name}</div>
        <div>User Last Name: {ticket.user_last_name}</div>
        <div>User Email: {ticket.user_email}</div>
        <div>Status Update: {ticket.ticket_status_summary}</div>
        {user.admin &&
          <OpenModalButton
                  buttonText="Process Ticket"
                  onItemClick={closeMenu}
                  modalComponent={<EditTicketModal ticket={ticket} refreshTickets={refreshTickets} />}
          />
        }

    </div>
  );
}

export default TicketComponent;
