import React from "react";
import ContentWrapper from "../components/Layout/ContentWrapper";
import { Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { clearAuth, selectLoggedIn } from "../store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Landing = () => {
  const navigate = useNavigate();
  const loggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(clearAuth());
  };
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

        {loggedIn ? (
          <div>
            <h2
              className="poppins-thin"
              style={{
                padding: "10px",
              }}
            >
              Explore the app
            </h2>
            <Button
              type="primary"
              onClick={logout}
              style={{
                width: "200px",
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <h2 className="poppins-thin">
              Please login/ Register to explore the app
            </h2>
            <Button type="default" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button type="primary" onClick={() => navigate("/register")}>
              Register
            </Button>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
};

export default Landing;
