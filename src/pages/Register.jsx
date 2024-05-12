import React, { useState } from "react";
import ContentWrapper from "../components/Layout/ContentWrapper";
import { Button, Form, Input, message } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const screens = useBreakpoint();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const submitLogin = async () => {
    setLoad(true);
    try {
      const values = await form.validateFields();
      if (values) {
        messageApi.open({
          key,
          type: "loading",
          content: "Registering...",
        });
        // console.log(values);
        const response = await axios.post(
          "https://expenses-server-a6yx.onrender.com/api/v1/register",
          {
            name: values.name,
            email: values.email,
            password: values.password,
          }
        );
        if (response.status === 200) {
          // console.log(response.data);
          localStorage.setItem("user_id", response.data.user_id);

          setTimeout(() => {
            messageApi.open({
              type: "success",
              content: "Registered..🤩 Successfully",
              duration: 2,
            });
          }, 1000);
          setTimeout(() => {
            form.resetFields();
            navigate("/login");
            setLoad(false);
          }, 2000);
        }
      }
    } catch (error) {
      setLoad(false);
      console.log(error);
      messageApi.open({
        type: "error",
        content: `Registration Failed🥲🥲 ${error.response.data.message}`,
        duration: 3,
      });
      console.log(error);
    }
  };
  const validatePassword = (rule, value) => {
    if (!value) {
      return Promise.reject("Please input your password");
    }
    if (!/^(?=.*\d).{8}$/.test(value)) {
      return Promise.reject("Password must be 7 characters & 1 number");
    }
    return Promise.resolve();
  };

  return (
    <ContentWrapper bread={false}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: screens.xs === true ? "500px" : "650px",
        }}
      >
        {contextHolder}
        <div
          style={{
            border: "1px solid gray",
            width: "600px",
            padding: screens.xs === true ? "30px 20px" : "40px",
            borderRadius: 10,
            boxShadow: "0px 0px 10px 1px #4c4b4b",
          }}
        >
          <h1
            className="poppins-regular"
            style={{
              textAlign: "center",
            }}
          >
            Register
          </h1>
          <Form
            form={form}
            name="dynamic_rule"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "10px",
            }}
            layout="vertical"
          >
            <Form.Item
              name="name"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Name is required!",
                },
              ]}
              label="User name"
            >
              <Input
                placeholder="John"
                style={{
                  width: "300px",
                }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="email"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Email is required!",
                },
                {
                  type: "email",
                  message: "The input is not a valid email!",
                },
              ]}
              label="Email"
            >
              <Input
                placeholder="John@gmail.com"
                style={{
                  width: "300px",
                }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "",
                },
                // {
                //   validator: validatePassword,
                // },
              ]}
              label="Password"
            >
              <Input
                placeholder="John123"
                style={{
                  width: "300px",
                }}
                size="large"
                type="password"
              />
            </Form.Item>
            <Button
              onClick={submitLogin}
              type="primary"
              size="middle"
              htmlType="submit"
              loading={load}
            >
              Submit
            </Button>
          </Form>
          <h4
            className="poppins-regular"
            style={{
              textAlign: "center",
              paddingTop: "20px",
            }}
          >
            Already user?{" "}
            <Link
              to={"/login"}
              style={{
                textDecoration: "underline",
              }}
            >
              Login
            </Link>
          </h4>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Register;
