
export const getTickets = async () => {
    const response = await fetch(`/api/tickets/tickets-users`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const payload = await response.json();
    return payload;
}

export const editTicket = async (data) => {
    const response = await fetch(`/api/tickets/${data.ticketId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const payload = await response.json();
    return payload;
}

export const createTicket = async (data) => {
  const response = await fetch(`/api/tickets`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

    const payload = await response.json();
    return payload
}

export const getUserTickets = async (userId) => {
  const response = await fetch(`/api/tickets/user/${userId}`);

  if (!response.ok) {
      throw new Error('Network response was not ok');
  }

  const payload = await response.json();
  return payload;
}
