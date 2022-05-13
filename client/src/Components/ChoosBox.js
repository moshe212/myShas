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

  const handleChange = (
    changeValue,
    gemara,
    choseID,
    id,
    TractateCounter,
    TractateName
  ) => {
    console.log("newValue", changeValue, gemara, TractateName);
    setIsChoise(changeValue);
    setDetails({
      ...details,
      gemara: gemara,
      choseID: choseID,
      id: id,
      tractateCounter: TractateCounter,
      tractateName: TractateName,
    });
  };

  const handleClose = () => {
    setIsChoise(false);
    setisInChoise(false);
  };

  const handleSendDetails = (newValue, learnDetails) => {
    const detailsToSRV = { ...details, ...learnDetails };
    console.log("Send", newValue, detailsToSRV);

    if (learnDetails) {
      axios
        .post("/api/LearnRegistration", {
          detailsToSRV,
        })
        .then(function (response) {
          console.log("response", response);
          if (response.data === "OK") {
            setIsSendDetails(newValue);
            setIsChoise(false);
            setisInChoise(false);
          } else {
            setIsSendDetails("notSaveInDB");
            setIsChoise(false);
            setisInChoise(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  console.log(props);
  if (isSendDetails) {
    setTimeout(function () {
      setIsSendDetails(false);
    }, 3000);
    return (
      <div className="thank-you ChoosBox">
        <p>יישר כח</p>
        <p className="summary-thank-you">קיבלת על עצמך ללמוד</p>
        {details.tractateName ? (
          <p className="details-thank-you">
            פרק <span className="gemara">{details.gemara}</span> במסכת{" "}
            <span className="tractate-name">{details.tractateName}</span>
          </p>
        ) : (
          <p className="details-thank-you">
            מסכת <span className="gemara">{details.gemara}</span>
          </p>
        )}

        <p className="date-end-learn">עד כט טבת תשפ"ג</p>
      </div>
    );
  } else if (isSendDetails === "notSaveInDB") {
    setTimeout(function () {
      setIsSendDetails(false);
    }, 2000);
    return (
      <div className="err ChoosBox">
        לצערנו קרתה תקלה בשמירת הנתונים. נא בחר שוב.
      </div>
    );
  } else if (!isInChoise && !isChoise) {
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
