import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Landing from "./components/Landing";
import CreateEvent from "./components/CreateEvent";
import EventList from "./components/EventList";
import MatchList from "./components/MatchList";
import Profile from "./components/Profile";

  function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />
      <div className="content">
        {currentPage === "home" && (
          <>
            <Landing />
            {user && <CreateEvent user={user} />}
            <EventList user={user} />
            {user && <MatchList />}
          </>
        )}

        {currentPage === "create" &&
          (user ? <CreateEvent user={user} /> : <Auth user={user} setUser={setUser} />)}

        {currentPage === "events" && <EventList user={user} />}

        {currentPage === "matches" &&
          (user ? <MatchList /> : <Auth user={user} setUser={setUser} />)}

        {currentPage === "profile" &&
          (user ? <Profile user={user} /> : <Auth user={user} setUser={setUser} />)}
      </div>
    </div>
  );
}

export default App;