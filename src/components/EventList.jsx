import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import EventData from "./EventData";

export default function EventList( { user } ) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  <EventData event={selectedEvent} onBack={() => setSelectedEvent(null)} user={user} />

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEvents(data);
    };
    fetchEvents();
  }, []);

  if (selectedEvent) {
    return (
      <EventData event={selectedEvent} 
        onBack={() => setSelectedEvent(null)} 
        user = {user}
      />
    );
  }

  return (
    <div className="event-list">
      <h2>All Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id} className="event-item" onClick={() => setSelectedEvent(event)}>
              <h3>{event.sport}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}