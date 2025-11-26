import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import EventData from "./EventData";

export default function MatchList( { user } ) {
  const [matches, setMatches] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  <EventData event={selectedEvent} onBack={() => setSelectedEvent(null)} user={user} />
  const currentUser = "testuser@gmail.com"; // replace later with auth email

  useEffect(() => {
    const fetchMatches = async () => {
      const q = query(collection(db, "events"), where("createdBy", "==", currentUser));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMatches(data);
    };
    fetchMatches();
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
    <div className="match-list">
      <h2>My Matches</h2>
      {matches.length === 0 ? (
        <p>No events created yet.</p>
      ) : (
        <ul>
          {matches.map(match => (
            <li className="match-card" key={match.id} onClick={() => setSelectedEvent(match)}>
              <h3>{match.sport}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}