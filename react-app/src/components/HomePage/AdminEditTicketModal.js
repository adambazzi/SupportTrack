import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editTicket } from "../../store/tickets";
import { useModal } from "../../context/Modal";

function AdminEditTicketModal({ ticket }) {
  const [status, setStatus] = useState(ticket.status);
  const [statusSummary, setStatusSummary] = useState(ticket.status_summary || '')
  const { closeModal } = useModal();
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    if (statusSummary.length < 1 || statusSummary.length > 200)  setDisableButton(true)
    else setDisableButton(false)
  }, [statusSummary])





  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      status,
      statusSummary,
      ticketId: ticket.id
    }

    await editTicket(data);

    closeModal();

  };

  return (
  <div className='edit-ticket'>
    <h1 className='edit-ticket__heading'>Edit Ticket</h1>
    <form onSubmit={handleSubmit} className='edit-ticket__form'>
        <label for="dropdown">Select an option:</label>
        <select id="dropdown" name="dropdown" onChange={(e) => setStatus(e.target.value)}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>
      <input
        type="text"
        value={statusSummary}
        onChange={(e) => setStatusSummary(e.target.value)}
        placeholder='Ticket Status Description'
        className="edit-ticket_input"
        maxLength={200}
      />
      <button
        type="submit"
        className="edit-ticket__button"
        disabled={disableButton}
      >
        Save
      </button>
    </form>
  </div>
  );
}

export default AdminEditTicketModal;
