import React, { useRef, useEffect, useState } from "react";
import { Button } from "antd";

import "./List.css";

const List = (props) => {
  // const [isChoose, setIsChoose] = useState(false);
  const Choose = (state, details, choseID, id, TractateCounter) => {
    props.onChange(state, details, choseID, id, TractateCounter);
  };
  console.log("items", props.items);
  return (
    <div className="scroll">
      {props.items.map((item) => (
        <Button
          style={{ background: "#780012", borderColor: "#f6f8f2" }}
          type="primary"
          shape="round"
          onClick={(e) => {
            console.log("gemara", item);
            Choose(
              "true",
              props.choseID === "masechet"
                ? item.TractateName
                : item.ChapterName,
              props.choseID,
              props.choseID === "masechet"
                ? item.TractateCounter
                : props.choseID === "chapter"
                ? item.ID
                : "",
              item.TractateCounter
            );
          }}
          size="Large"
        >
          {props.choseID === "masechet" && (
            <div id={item.TractateCounter} className="buttonsList">
              <p>{item.TractateName}</p>
            </div>
          )}
          {props.choseID === "chapter" && (
            <div id={item.ID} className="buttonsList">
              <p className="chapteBtn">{item.ChapterName}</p>
              <p className="subchapteBtn">{item.TractateName}</p>
            </div>
          )}
        </Button>
      ))}
    </div>
  );
};

export default List;
