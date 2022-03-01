import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import Axios from "axios";
import { Redirect } from "react-router";

import "./RegisterBizForm.css";

const success = () => {
  message.success({
    content: "הינך מועבר לדף הניהול",
    className: "custom-class",
    style: {
      marginTop: "10vh",
    },
  });
};

const Customeruccess = (existOrder) => {
  !existOrder
    ? message.success({
        content:
          "הנתונים נכונים, אנו אוספים את הנתונים שלך ומיד תועבר להמשך קניה.",
        className: "custom-class",
        style: {
          marginTop: "10vh",
          margin: "0px auto",
          width: "500px",
          height: "400px",
        },
      })
    : message.success({
        content:
          "נמצאה הזמנה בסטטוס טרם שולם בשרת, ההזמנה שהתחלתה עכשיו תבוטל ובמקומה תופיע ההזמנה שהתקבלה מהשרת.",
        className: "custom-class",
        style: {
          marginTop: "10vh",
          margin: "0px auto",
          width: "500px",
          height: "400px",
        },
      });
};

const error = () => {
  message.error({
    content: "שם המשתמש או הססמה אינם נכונים.",
    className: "custom-class",
    style: {
      marginTop: "10vh",
    },
  });
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const RegisterBizForm = () => {
  //   const [State, setState] = useState({
  //     Redirect_MangeProducts: false,
  //     Redirect_Home: false,
  //     UserId: "",
  //     Name: "",
  //     Order: "",
  //     District_IsNewOrder: "",
  //   });
  // console.log("reg");
  const [form] = Form.useForm();
  const { cellPhone } = useParams();
  console.log(cellPhone);

  let url = "";

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onFinish = async (values) => {
    // message.loading("..מבצע אימות נתונים מול השרת, מיד תועבר להמשך קניה", 0);
    // props.onSubmit();
    console.log("dragger", values);
    const files = [];
    files.push(
      values.service1_img[0].originFileObj,
      values.service2_img[0].originFileObj,
      values.service3_img[0].originFileObj,
      values.Background[0].originFileObj,
      values.Logo[0].originFileObj
    );

    console.log("files", files);
    const Links = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      let file = files[i];
      console.log("file", file);
      formData.append("file", file);
      formData.append("upload_preset", "lnhnqvd0");
      console.log("formData", formData);
      const options = {
        method: "POST",
        body: formData,
      };
      console.log("options", options);

      await Axios.post(
        "https://api.Cloudinary.com/v1_1/binyaminbiz/image/upload",
        formData
      )
        // .then((res) => JSON.parse(res))
        .then((res) => {
          Links.push(res.data.secure_url);
          console.log(Links);
        })
        .catch((err) => console.log(err));
    }
    await Axios.post("/api/biz_register", {
      formValues: values,
      bizCellPhone: cellPhone,
      file_links: {
        link1: Links[0],
        link2: Links[1],
        link3: Links[2],
        link4: Links[3],
        link5: Links[4],
      },
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="FormRoot" dir="rtl">
      <div className="Header"></div>
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="first_name"
          label="שם פרטי"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="שם משפחה"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="biz_name"
          label="שם עסק"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="cellPhon"
          label="נייד"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="ישוב"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="street"
          label="רחוב"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="home"
          label="בית"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="about"
          label="אודות"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="service1"
          label="שירות 1"
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="service1_img">
          <Form.Item
            name="service1_img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" customRequest={dummyRequest}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="service2"
          label="שירות 2"
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="service2_img">
          <Form.Item
            name="service2_img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" customRequest={dummyRequest}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="service3"
          label="שירות 3"
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="service3_img">
          <Form.Item
            name="service3_img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" customRequest={dummyRequest}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="E_Mail"
          label="אימייל"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["LogIn", "Password"]}
          label="ססמה"
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item> */}

        <Form.Item label="Background">
          <Form.Item
            name="Background"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" customRequest={dummyRequest}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item label="Logo">
          <Form.Item
            name="Logo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" customRequest={dummyRequest}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button className="RegBtn" type="primary" htmlType="submit">
            כניסה
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterBizForm;
