import React, { useState, useEffect } from "react";
import { createTicket } from "../../store/tickets";
import { useModal } from "../../context/Modal";

function CreateTicketModal({ user, refreshTickets }) {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('')
  const { closeModal } = useModal();
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    if (heading.length < 1 || heading.length > 200 || description.length < 1 || description.length > 500)  setDisableButton(true)
    else setDisableButton(false)
  }, [description, heading])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userId: user.id,
      heading,
      description
    }

    try {
      await createTicket(data);
      await refreshTickets();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='create-ticket'>
      <h1 className='create-ticket__heading'>Create Ticket</h1>
      <form onSubmit={handleSubmit} className='create-ticket__form'>
        <label htmlFor="heading">Heading</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder='Heading'
          className="create-ticket_input"
          maxLength={200}
          id="heading"
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          className="create-ticket_input"
          maxLength={500}
          id="description"
        />
        <button
          type="submit"
          className="create-ticket__button"
          disabled={disableButton}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateTicketModal;
