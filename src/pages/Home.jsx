import React, { useEffect } from "react";
import ContentWrapper from "../components/Layout/ContentWrapper";
import { Tabs } from "antd";
import DayWise from "./DataPages/DayWise";
import Monthly from "./DataPages/Monthly";
import Yearly from "./DataPages/Yearly";
import { preFetchUserInfo } from "../store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  selectRefetchItems,
} from "../store/features/global/globalSlice";

const Home = () => {
  const dispatch = useDispatch();
  const refetch = useSelector(selectRefetchItems);
  useEffect(() => {
    const info = localStorage.getItem("user_log");
    if (info !== null) {
      const parsedInfo = JSON.parse(info);
      dispatch(preFetchUserInfo());
      //fetching user data
      dispatch(fetchUserData(parsedInfo?.data.user_id));
    }
  }, [refetch]);
  const tabElements = [
    {
      label: "Daily",
      key: 1,
      children: <DayWise />,
    },
    {
      label: "Monthly",
      key: 2,
      children: <Monthly />,
    },
    {
      label: "Yearly",
      key: 3,
      children: <Yearly />,
    },
  ];
  return (
    <>
      <Tabs
        style={{
          paddingTop: "20px",
        }}
        type="card"
        defaultActiveKey="1"
        centered
        items={tabElements}
        size="large"
        tabBarGutter="10px"
      />
      <ContentWrapper bread={false}></ContentWrapper>
    </>
  );
};

export default Home;
