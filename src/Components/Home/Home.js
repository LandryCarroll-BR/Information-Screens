import React from "react";
import AnnouncementEditor from "../AnnouncementEditor/AnnouncementEditor";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Information Screens</h1>
      <AnnouncementEditor />
    </div>
  );
}

export default Home;
