import React, { useState } from "react";
import { Form, Input, Button, Radio } from "antd";
import "./DetailsForm.css";

const DetailsForm = (props) => {
  const [learnDetails, setLearnDetails] = useState({
    learnName: "",
    learnPhone: "",
  });

  const Send = (state) => {
    props.satusMainBtn(state);
  };

  const Close = () => {
    props.onClose("true");
    Send("true");
  };

  const getValueFromEvent = (e) => {
    console.log("e", e.target.value);
    let nam = e.target.name;
    let val = e.target.value;
    setLearnDetails({ ...learnDetails, [nam]: val });
  };
  const onFinish = (values) => {
    console.log("Success:", learnDetails);
    console.log("Details:", props.Details);
    props.onSend("true", learnDetails);
    Send("true");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="Form">
      <p className="Close" onClick={Close}>
        x
      </p>
      <Form
        initialValues={{
          layout: "horizontal",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="rootForm">
          <Form.Item>
            <Input
              name="learnName"
              onChange={getValueFromEvent}
              placeholder="שם מלא"
              // style={{ width: "auto" }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="learnPhone"
              onChange={getValueFromEvent}
              placeholder="טלפון נייד"
            />
          </Form.Item>
          <p className="waStar">*לצורך שליחת תזכורות בוואטסאפ</p>
          <Form.Item>
            <Button
              style={{
                background: "#780012",
                borderColor: "#f6f8f2",
                color: "#f6f8f2",
              }}
              type="primary"
              shape="round"
              htmlType="submit"
            >
              שלח
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default DetailsForm;
