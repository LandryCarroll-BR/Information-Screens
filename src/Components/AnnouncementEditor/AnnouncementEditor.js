import React, { useEffect, useState } from "react";
import { db } from "../../util/firebase";
import "./AnnouncementEditor.css";

function AnnouncementEditor() {
  const [announcementList, setAnnouncementList] = useState([]);
  const [active, setActive] = useState({
    active: false,
  });
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    db.collection("announcements").onSnapshot((snapshot) =>
      setAnnouncementList(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  const addData = () => {
    db.collection("announcements")
      .doc(title)
      .set({
        title: title,
        subTitle: subTitle,
        bgImage: bgImage,
      })
      .then(() => {
        console.log("Document successfully written!");
        setActive({ active: false });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <div className="announcementEditor">
      <div
        className="announcementEditor__cardcontainer"
        style={{ display: active.active ? "none" : "grid" }}>
        {announcementList.map((item) => {
          return (
            <div
              className="announcementEditor__card"
              id={announcementList.indexOf(item) + 1}>
              <div
                className="announcementEditor__image"
                style={{ backgroundImage: `url(${item.bgImage})` }}
                onClick={() => {
                  setActive({ active: announcementList.indexOf(item) + 1 });
                }}></div>
              <h2>{item.title}</h2>
              <p>{item.subTitle}</p>
              <button
                onClick={() => {
                  db.collection("announcements")
                    .doc(item.title)
                    .delete()
                    .then(() => {
                      console.log("Document successfully deleted!");
                    })
                    .catch((error) => {
                      console.error("Error removing document: ", error);
                    });
                }}>
                Delete -
              </button>
            </div>
          );
        })}
        <div
          className="addAnnouncement"
          onClick={(e) => {
            setActive({ active: true });
          }}>
          <h3>Add Announcement +</h3>
        </div>
      </div>
      <div
        className="announcementEditor__editorcontainer"
        style={{ display: active.active ? "flex" : "none" }}>
        <form action="">
          <label htmlFor="title">
            Title
            <input
              id="title"
              type="text"
              autocomplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="subTitle">
            Subtitle
            <input
              id="subTitle"
              type="text"
              autocomplete="off"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </label>
          <label htmlFor="image">
            Image URL (find at{" "}
            <a
              target="_blank"
              and
              rel="noopener noreferrer"
              href="https://www.pexels.com"
              style={{ color: "white" }}>
              www.pexels.com
            </a>
            )
            <input
              id="image"
              type="url"
              autocomplete="off"
              value={bgImage}
              onChange={(e) => setBgImage(e.target.value)}
            />
          </label>
        </form>
        <button onClick={addData}>Save</button>
      </div>
    </div>
  );
}

export default AnnouncementEditor;
