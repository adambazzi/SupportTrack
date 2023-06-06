import React, { useState, useRef, useEffect } from "react";
import './AdminTicketComponent.css'
import AdminEditTicketModal from "./AdminEditTicketModal";
import OpenModalButton from "../OpenModalButton";


function AdminTicketComponent({ ticket, refreshTickets }) {
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
        <div>Ticket Id: {ticket.id}</div>
        <div>Heading: {ticket.ticket_heading}</div>
        <div>Description: {ticket.ticket_description}</div>
        <div>User First Name: {ticket.user_first_name}</div>
        <div>User Last Name: {ticket.user_last_name}</div>
        <div>User Email{ticket.user_email}</div>
        <OpenModalButton
                buttonText="Edit"
                onItemClick={closeMenu}
                modalComponent={<AdminEditTicketModal ticket={ticket} refreshTickets={refreshTickets} />}
        />

    </div>
  );
}

export default AdminTicketComponent;
