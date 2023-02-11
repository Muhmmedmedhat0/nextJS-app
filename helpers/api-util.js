// getAllEvents
export async function getAllEvents() {
  const events = [];
  try {
    const reponse = await fetch(
      "https://nextjs-test-18425-default-rtdb.firebaseio.com/events.json",
    );
    const data = await reponse.json();

    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }
  } catch (error) {
    if (error) {
      return new Error("something went wrong!");
    }
  }
  return events;
}

// getFeaturedEvents
export async function getFeaturedEvents() {
  try {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
  } catch (error) {
    if (error) {
      return new Error("something went wrong!");
    }
  }
}

// getEventById
export async function getEventById(id) {
  try {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
  } catch (error) {
    if (error) {
      return new Error("something went wrong!");
    }
  }
}

// getFilteredEvents
export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
