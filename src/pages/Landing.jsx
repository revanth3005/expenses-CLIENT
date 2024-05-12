import React from "react";
import ContentWrapper from "../components/Layout/ContentWrapper";
import { Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <ContentWrapper bread={false}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <h1 className="poppins-regular">
          Hello welcome to NSR Expenses Tracker
        </h1>
        <h2>😎</h2>
        <Divider />
        <h2 className="poppins-thin">
          Please login/ Register to explore the app
        </h2>
       
        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Button type="default" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button type="primary" onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Landing;
