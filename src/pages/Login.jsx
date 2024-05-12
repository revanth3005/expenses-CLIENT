import React, { useEffect, useState } from "react";
import ContentWrapper from "../components/Layout/ContentWrapper";
import { Button, Form, Input, message } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from "../store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../store/features/global/globalSlice";

const Login = () => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const dispatch = useDispatch();

  const submitLogin = async () => {
    setLoad(true);
    try {
      const values = await form.validateFields();
      if (values) {
        messageApi.open({
          key,
          type: "loading",
          content: "Signing in...",
        });
        const response = await axios.post(
          "https://expenses-server-a6yx.onrender.com/api/v1/login",
          {
            email: values.email,
            password: values.password,
          }
        );
        if (response.status === 200) {
          // console.log(response?.data);
          localStorage.setItem("user_log", JSON.stringify(response?.data));

          setTimeout(() => {
            messageApi.open({
              type: "success",
              content: "Login..🤩 Successfully",
              duration: 2,
            });
          }, 1000);
          setTimeout(() => {
            form.resetFields();
            navigate("/Home");
            setLoad(false);
            dispatch(setLogin());
            dispatch(fetchUserData(response?.data?.data?.user_id));
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: `Login Failed ${error?.response?.data?.message}`,
        duration: 4,
      });
      setLoad(false);
    }
  };

  useEffect(() => {
    messageApi.open({
      type: "info",
      content: "Login to continue",
      duration: 2,
    });
  }, []);
  return (
    <ContentWrapper bread={false}>
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: screens.xs === true ? "500px" : "650px",
        }}
      >
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
            Login
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
                  message: "Password is required",
                },
              ]}
              label="Passoword"
            >
              <Input
                placeholder="Password1"
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
            New user?{" "}
            <Link
              to={"/register"}
              style={{
                textDecoration: "underline",
              }}
            >
              Register
            </Link>
          </h4>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Login;
