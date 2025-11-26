import React from "react";

export default function Navbar({ setCurrentPage }) {
  return (
    <nav className="navbar">
      <h1 className="logo">Sports Buddy</h1>
      <div className="nav-links">
        <button onClick={() => setCurrentPage("home")}>Home</button>
        <button onClick={() => setCurrentPage("create")}>Create Event</button>
        <button onClick={() => setCurrentPage("events")}>All Events</button>
        <button onClick={() => setCurrentPage("matches")}>My Matches</button>
        <button onClick={() => setCurrentPage("profile")}>My Account</button>
      </div>
    </nav>
  );
}