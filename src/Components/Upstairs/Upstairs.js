import React, {useState, useEffect} from 'react';
import Announcement from '../Announcement/Announcement';
import './Upstairs.css';

import { db } from '../../util/firebase';

import { useSelector } from 'react-redux';
import { selectActiveIndex } from '../../features/announcementSlice';

function Upstairs() {
  const activeIndex = useSelector(selectActiveIndex);
  const [time, setTime] = useState({
    time: new Date().toLocaleTimeString().split(" ").shift(),
    amPm: new Date().toLocaleTimeString().split(" ").pop()
  });
  const [date, setDate] = useState({
    day: new Date().getDay(),
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });
  const [que, setQue] = useState(activeIndex);
  const [total, setTotal] = useState(5);
  const [announcementList, setAnnouncementList] = useState([]);

  useEffect(()=> {
    setQue(activeIndex);
  },[activeIndex]);

  useEffect(()=> {
    setTimeout(() => {
      setTime({
        time: new Date().toLocaleTimeString().split(" ").shift(),
        amPm: new Date().toLocaleTimeString().split(" ").pop()
      });
    }, 1000);
  });

  useEffect(()=> {
    db.collection("announcements")
    .onSnapshot((snapshot) => setAnnouncementList(snapshot.docs.map((doc) => doc.data())));
  },[]);

  const getTheme = () => {
    let sum = `${time.time[0]}${time.time[1]}`;
    let num = Number(sum);

    if (time) {
      return {
        color: "var(--dark-mode-text)"
      }
    } else {
      return {
        color: "var(--light-mode-text)"
      }
    }
  }


  return (
    <main className="upstairs" style={getTheme()}>
      <aside className="upstairs__roomList">
        <div className="roomList__row">
          <h4 className="roomList__subTitle">Room</h4>
          <h4 className="roomList__subTitle">Activity</h4>
        </div>
        <div className="roomList__row">
          <h3 className="roomList__roomNumber">201</h3>
          <h3 className="roomList__activity">Open</h3>
        </div>
        <div className="roomList__row">
          <h3 className="roomList__roomNumber">202</h3>
          <h3 className="roomList__activity">JAM Kids</h3>
        </div>
        <div className="roomList__row">
          <h3 className="roomList__roomNumber">203</h3>
          <h3 className="roomList__activity">Prayer Room</h3>
        </div>
        <div className="roomList__row">
          <h3 className="roomList__roomNumber">204</h3>
          <h3 className="roomList__activity">Youth Bible Study</h3>
        </div>
        <div className="roomList__dateTime">
          <p className="roomList__time">{
          time.time.substring(0, time.time.length - 3) + " " + time.amPm
          }</p>
          <p className="roomList__date">
            {`${date.month}/${date.date}/${date.year}`}
          </p>
        </div>
      </aside>

      <section className="upstairs__announcements">
        {
          announcementList.map((item)=> {
            const index = announcementList.indexOf(item);
            const total = announcementList.length;
            return (
              <Announcement
                key={index}
                title={item.title}
                subTitle={item.subTitle}
                bgImage={item.bgImage}
                index={index}
                que={que}
                total={total}
                last={index === (total-1) ? true : false}/>
            )
          })
        }
      </section>

    </main>
  )
}

export default Upstairs
