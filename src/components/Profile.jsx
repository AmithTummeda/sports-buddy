import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Profile = ({ user }) => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="profile-container">
      <h2>My Account</h2>
      <div className="profile-card">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>UID:</strong> {user.uid}</p>
      </div>
      <button onClick={handleLogout} className="btn logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Profile;