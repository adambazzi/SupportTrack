

export const getTickets = () => async dispatch => {
    const response = await fetch(`/api/tickets`);
    if (response.ok) {
      const payload = await response.json();
      return payload
    }
}
