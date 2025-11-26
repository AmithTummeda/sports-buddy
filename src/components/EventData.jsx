import React, { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export default function EventData({ event, onBack, user }) {
  const [currentEvent, setCurrentEvent] = useState(event);
  const [enrolling, setEnrolling] = useState(false);

  const isFull = currentEvent.enrolledUsers?.length >= currentEvent.slots;
  const alreadyEnrolled = currentEvent.enrolledUsers?.includes(user?.uid);

  const handleEnroll = async () => {
    if (!user) return alert("You must be logged in to enroll.");
    if (isFull) return alert("Sorry, slots are full.");
    if (alreadyEnrolled) return alert("You are already enrolled.");

    try {
      setEnrolling(true);
      const eventRef = doc(db, "events", currentEvent.id);

      await updateDoc(eventRef, {
        enrolledUsers: arrayUnion(user.uid),
      });

      setCurrentEvent((prev) => ({
        ...prev,
        enrolledUsers: [...(prev.enrolledUsers || []), user.uid],
      }));

      alert("Enrolled successfully!");
    } catch (err) {
      console.error(err);
      alert("Error enrolling in event.");
    } finally {
      setEnrolling(false);
    }
  };

  const remainingSlots =
    currentEvent.slots - (currentEvent.enrolledUsers?.length || 0);

  return (
    <div className="event-data">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
      <h2>{currentEvent.title}</h2>
      <p><strong>Sport:</strong> {currentEvent.sport}</p>
      <p><strong>Location:</strong> {currentEvent.location}</p>
      <p><strong>Date:</strong> {currentEvent.date}</p>
      <p><strong>Time:</strong> {currentEvent.time}</p>
      <p>
        <strong>Slots Available:</strong>{" "}
        {remainingSlots > 0 ? remainingSlots : 0}
      </p>

      <button
        className="enroll-btn"
        onClick={handleEnroll}
        disabled={enrolling || isFull || alreadyEnrolled}
      >
        {alreadyEnrolled
          ? "Already Enrolled"
          : isFull
          ? "Slots Full"
          : "Enroll"}
      </button>
    </div>
  );
}