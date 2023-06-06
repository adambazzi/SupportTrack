import React, { useState, useEffect } from "react";
import { getTickets } from "../../store/tickets";
import AdminTicketComponent from "./AdminTicketComponent";

function AdminHomePage() {
  const [tickets, setTickets] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTickets();
      setTickets(data);
    };

    fetchData();
  }, []);

  return (
    <div className="homePage__admin">
      <div>
          {tickets && Object.values(tickets).length > 0 && Object.values(tickets).map((ticket) => (
            <AdminTicketComponent key={ticket.id} ticket={ticket} />
          ))}

      </div>
    </div>
  );
}

export default AdminHomePage;
