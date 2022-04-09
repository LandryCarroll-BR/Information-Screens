import React, { useState, useEffect } from "react";
import "./Announcement.css";

import { useDispatch, useSelector } from "react-redux";
import {
  setActiveIndex,
  selectReset,
  setReset,
} from "../../features/announcementSlice";

function Announcement({ title, subTitle, index, que, bgImage, total, last }) {
  const dispatch = useDispatch();
  const reset = useSelector(selectReset);

  const [animationClass, setAnimationClass] = useState(" waiting");

  useEffect(() => {
    if (reset === true) {
      setAnimationClass(" waiting");
      dispatch(
        setReset({
          reset: false,
        })
      );
    }
  }, [dispatch, reset]);

  useEffect(() => {
    if (que === index && animationClass === " waiting") {
      setAnimationClass(" start");
    } else if (animationClass === " start") {
      setTimeout(() => {
        setAnimationClass(" fade");
      }, 10000);
    } else if (animationClass === " fade") {
      if (last === true) {
        dispatch(
          setActiveIndex({
            activeIndex: 0,
          })
        );
        dispatch(
          setReset({
            reset: true,
          })
        );
      } else {
        dispatch(
          setActiveIndex({
            activeIndex: index + 1,
          })
        );
      }
    }
  }, [animationClass, dispatch, index, last, que]);

  return (
    <div
      className={"announcement" + animationClass}
      style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={"announcement__content"}>
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
      </div>
    </div>
  );
}

export default Announcement;
