import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";

import SearchBox from "./SearchBox";
import DetailsForm from "./DetailsForm";
import "./ChoosBox.css";

const ChoosBox = (props) => {
  const [isInChoise, setisInChoise] = useState(false);
  const [isChoise, setIsChoise] = useState(false);
  const [isSendDetails, setIsSendDetails] = useState(false);
  const [details, setDetails] = useState({});

  const handleChange = (changeValue, gemara, choseID, id, TractateCounter) => {
    console.log("newValue", changeValue, gemara);
    setIsChoise(changeValue);
    setDetails({
      ...details,
      gemara: gemara,
      choseID: choseID,
      id: id,
      tractateCounter: TractateCounter,
    });
  };

  const handleClose = () => {
    setIsChoise(false);
    setisInChoise(false);
  };

  const handleSendDetails = (newValue, learnDetails) => {
    const detailsToSRV = { ...details, ...learnDetails };
    console.log("Send", newValue, detailsToSRV);
    setIsSendDetails(newValue);
    setIsChoise(false);
    setisInChoise(false);
    if (learnDetails) {
      axios
        .post("/api/LearnRegistration", {
          detailsToSRV,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  console.log(props);
  if (!isInChoise && !isChoise) {
    return (
      <div className="ChoosBox">
        <p>
          {props.chosen === "masechet"
            ? "מסכת"
            : props.chosen === "chapter"
            ? "פרק"
            : props.chosen === "paper"
            ? "עמוד"
            : ""}{" "}
        </p>
        <p>גמרא</p>
        <div className="Button">
          <Button
            style={{ background: "#780012", borderColor: "#f6f8f2" }}
            type="primary"
            shape="round"
            onClick={() => {
              setisInChoise(true);
              props.stateBtn("false");
            }}
            size="Large"
            disabled={props.isAvailableBtn === "false" ? true : false}
          >
            בחר{" "}
            {props.chosen === "masechet"
              ? "מסכת"
              : props.chosen === "chapter"
              ? "פרק"
              : props.chosen === "paper"
              ? "עמוד"
              : ""}{" "}
          </Button>
        </div>
      </div>
    );
  } else if (isInChoise && !isChoise) {
    return (
      <SearchBox
        onChange={handleChange}
        onClose={handleClose}
        satusMainBtn={props.stateBtn}
        choseID={props.chosen}
        data={props.data}
      />
    );
  } else if (isChoise) {
    return (
      <DetailsForm
        onSend={handleSendDetails}
        onClose={handleClose}
        satusMainBtn={props.stateBtn}
        Details={details}
      />
    );
  }
};

export default ChoosBox;
