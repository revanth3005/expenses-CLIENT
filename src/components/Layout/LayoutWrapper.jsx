import { ConfigProvider, FloatButton, Layout } from "antd";
import React from "react";
import Navbar from "./Header/Navbar";
import AddItem from "../../pages/AddItem";
import { showModal } from "../../store/features/global/globalSlice";
import { CommentOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "antd";
import { selectLoggedIn } from "../../store/features/auth/authSlice";

const AppLayout = (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout>
        <Navbar />
        {props.children}
        {loggedIn && (
          <FloatButton
            trigger="click"
            tooltip="Add Spends"
            type="primary"
            style={{
              right: 24,
            }}
            icon={<PlusCircleOutlined />}
            onClick={() => {
              dispatch(showModal());
            }}
          >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
          </FloatButton>
        )}
        <AddItem />
      </Layout>
    </ConfigProvider>
  );
};
export default AppLayout;
