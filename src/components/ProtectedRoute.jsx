import { message } from "antd";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user_info = localStorage.getItem("user_log");
  // const [messageApi, contextHolder] = message.useMessage();
  // if (user_info === null) {
  //
  // alert('log')
  // }
  return user_info ? (
    <Outlet />
  ) : (
    <>
      {/* {contextHolder} */}
      <Navigate to={"/login"} />
    </>
  );
};

export default ProtectedRoute;
