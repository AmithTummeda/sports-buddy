import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreateEvent() {
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), {
        sport,
        location,
        time,
        createdBy: "testuser@gmail.com",
        slots: Number(slots),
        enrolledUsers: [],
        timestamp: serverTimestamp(),
      });
      alert("Event created successfully!");
      setSport("");
      setLocation("");
      setTime("");
      setDate("");
      setSlots("");
    } catch (err) {
      console.error(err);
      alert("Error creating event");
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Sport"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input
          type="integer"
          placeholder="Slots Available"
          value={slots}
          onChange={(e) => setSlots(e.target.value)}
          required
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}