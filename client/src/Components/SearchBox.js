import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";
import { AutoComplete } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./SearchBox.css";

const { Option } = AutoComplete;

const SearchBox = (props) => {
  const [result, setResult] = useState([]);
  const [datatoChose, setDataToChose] = useState([]);
  const [loading, setLoading] = useState(true);

  const Close = () => {
    props.onClose("true");
    props.satusMainBtn("true");
  };

  const handleSearch = (value) => {
    const data = datatoChose;
    let res = [];
    if (value && props.choseID === "masechet") {
      for (let i = 0; i < data.length; i++) {
        if (data[i].TractateName.indexOf(value) >= 0) {
          res = data.filter((item) => item.TractateName.indexOf(value) >= 0);
        }
      }
    } else if (value && props.choseID === "chapter") {
      for (let i = 0; i < data.length; i++) {
        if (data[i].ChapterName.indexOf(value) >= 0) {
          res = data.filter((item) => item.ChapterName.indexOf(value) >= 0);
        }
      }
    } else {
      res = data;
    }

    setResult(res);
  };

  useEffect(() => {
    const data = props.data;
    if (props.choseID === "masechet") {
      console.log("data", data);
      let uniqueObjArray = [
        ...new Map(data.map((item) => [item["TractateName"], item])).values(),
      ];

      let uniqueObjArrayFiterd = uniqueObjArray.filter(
        (item) => item["isfullTractate"] === "TRUE"
      );

      console.log("uniqueObjArray", uniqueObjArray);
      console.log("uniqueObjArrayFiterd", uniqueObjArrayFiterd);

      setResult(uniqueObjArrayFiterd);
      setDataToChose(uniqueObjArrayFiterd);
      setLoading(false);
    } else {
      const list = [];
      for (let i = 0; i < data.length; i++) {
        const id = data[i].ChapterCounter;
        const chapterName = data[i].ChapterName;
        const tractateName = data[i].TractateName;
        const tractateCounter = data[i].TractateCounter;
        list.push({
          ID: id,
          ChapterName: chapterName,
          TractateName: tractateName,
          TractateCounter: tractateCounter,
        });
      }
      setResult(list);
      setDataToChose(list);
      setLoading(false);
    }
  }, []);

  const handleSelect = (value, option) => {
    console.log(value, option);
  };
  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: 40, color: "#780012", marginTop: "3rem" }}
      spin
    />
  );

  if (!loading) {
    return (
      <div className="Box">
        <p className="Close" onClick={Close}>
          x
        </p>

        {props.choseID !== "paper" ? (
          <AutoComplete
            style={{
              width: "65%",
            }}
            onSearch={handleSearch}
            onSelect={handleSelect}
            placeholder={props.choseID === "masechet" ? "חפש מסכת" : "חפש פרק"}
          ></AutoComplete>
        ) : (
          ""
        )}
        {props.choseID !== "paper" ? (
          <List
            items={result}
            onChange={props.onChange}
            choseID={props.choseID}
          />
        ) : (
          "בקרוב"
        )}
      </div>
    );
  } else {
    return (
      <Spin
        className="spin"
        indicator={antIcon}
        style={{ width: "30%", height: "250px" }}
      />
    );
  }
};

export default SearchBox;
