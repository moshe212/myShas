import React, { useEffect, useState } from "react";
import { Progress } from "antd";
import "./ProgressBar.css";

const ProgressBar = (props) => {
  const [perc, setPerc] = useState(0);
  const [leftPages, setleftPages] = useState(0);

  useEffect(() => {
    console.log(props.data);
    const totallPages = props.data.map((item) => item.ChapterNumberOfPages);
    console.log("totallPages", totallPages);
    const total = totallPages.reduce(
      (prev, curr) => parseFloat(prev) + parseFloat(curr),
      0
    );
    console.log("total", total);
    const percent = (((2711 - total) / 2711) * 100).toFixed(1);
    setPerc(percent);
    if (total > 0) {
      setleftPages(2711 - total);
    }
  }, [props.data]);

  return (
    <div className="progressbar">
      <Progress
        percent={perc}
        strokeColor="#780012"
        trailColor="#f6f8f2"
        // trailColor="bisque"
        strokeWidth="20px"
      />
      <div className="grid-container">
        <div className="counter grid-item">{leftPages}</div>
        <div className="counter_text grid-item" id="counter_text">
          <p className="taken">דפי גמרא כבר נלקחו</p>
          <p>מתוך 2711 דפים בש"ס</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
