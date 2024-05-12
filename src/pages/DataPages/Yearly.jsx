import React, { useEffect, useMemo, useState } from "react";
import ContentWrapper from "../../components/Layout/ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  selectItemsLoading,
  selectRefetchItems,
  selectUserItemsData,
  setRefetchStatus,
} from "../../store/features/global/globalSlice";
import { PlusCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Empty, Collapse, Divider } from "antd";

const Yearly = () => {
  const { Panel } = Collapse;
  const userData = useSelector(selectUserItemsData);
  const userDataLoading = useSelector(selectItemsLoading);
  const [date, setDate] = useState(new Date());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filterYearWise = useMemo(() => {
    return userData?.filter(
      (item) => new Date(item.date).getFullYear() === date.getFullYear()
    );
  }, [userData]);

  //sorting by month
  const filteredMonthlySort = useMemo(() => {
    return filterYearWise?.sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);

      // Compare the dates
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return 0;
    });
  }, [filterYearWise]);

  // filter unique months
  const uniqueMonths = new Set();
  const filteredUniqueMonths = useMemo(() => {
    return filteredMonthlySort?.filter((item) => {
      if (uniqueMonths.has(item.month)) {
        return false;
      }
      uniqueMonths.add(item.month);
      return true;
    });
  }, [filteredMonthlySort]);

  //display month categories
  const displayMonthCategories = (month) => {
    const filterOutMonth = filterYearWise.filter((item) => {
      return item.month === month;
    });

    //getting out unique categories
    const uniqueCategories = new Set();
    const filteredUniqueCategories = filterOutMonth?.filter((item) => {
      if (uniqueCategories.has(item.category)) {
        return false;
      }
      uniqueCategories.add(item.category);
      return true;
    });

    const getCategoryTotal = (category) => {
      const filterOutCategory = filterOutMonth?.filter(
        (el) => el.category === category
      );
      return filterOutCategory?.reduce((acc, cur) => acc + cur?.amount, 0);
    };

    return filteredUniqueCategories?.map((item) => {
      return (
        <Panel
          header={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h3 className="poppins-regular">{item?.category}</h3>
              <h3 className="poppins-regular">
                $&nbsp;{getCategoryTotal(item?.category)}
              </h3>
            </div>
          }
          key={item._id}
        >
          {displayCategoryItems(item?.category, item?.month)}
        </Panel>
      );
    });
  };
  const displayCategoryItems = (category, month) => {
    const filteredByMonth = filterYearWise?.filter(
      (item) => item?.month === month
    );
    // console.log("filteredByMonthCategory", filteredByMonth);

    const filterOutCategoryItems = filteredByMonth?.filter(
      (item) => item?.category === category
    );

    return filterOutCategoryItems.map((el) => {
      return (
        <div
          key={el?._id}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom:
              filterOutCategoryItems?.length > 1 && "1px solid #424242",
            padding: "10px 20px",
            cursor: "pointer",
          }}
          // onClick={() => updateItem(el)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4
              className="poppins-light"
              style={{
                color: "lightseagreen",
              }}
            >
              {el?.title}
            </h4>
            <div
              className="poppins-thin-light"
              style={{
                color: "lightslategray",
              }}
            >
              {new Date(el?.date).toDateString()}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h4
              className="poppins-light"
              style={{
                color: "#cb7b6d",
              }}
            >
              $&nbsp;{el?.amount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </h4>
            <RightOutlined />
          </div>
        </div>
      );
    });
  };
  const getMonthTotal = (month) => {
    const filteredMonth = filterYearWise?.filter((el) => el?.month === month);
    return filteredMonth?.reduce((acc, cur) => acc + cur?.amount, 0);
  };

  const yearlyTotal = filterYearWise?.reduce(
    (acc, cur) => acc + cur?.amount,
    0
  );
  return (
    <ContentWrapper bread={false}>
      {userDataLoading ? (
        "loading"
      ) : filterYearWise?.length === 0 ? (
        <Empty
          style={{
            paddingTop: "150px",
          }}
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={
            <h4 className={"poppins-medium"}>
              No data Click on{" "}
              <PlusCircleOutlined
                style={{
                  fontSize: "16px",
                  color: "skyblue",
                }}
              />{" "}
              to add Expenses
            </h4>
          }
        ></Empty>
      ) : (
        <>
          <h2
            className="poppins-regular"
            style={{
              textAlign: "center",
              paddingBottom: "20px",
            }}
          >
            {date.getFullYear()}
          </h2>
          <Collapse accordion>
            {filteredUniqueMonths?.map((item) => {
              return (
                <Panel
                  header={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3 className="poppins-regular">{months[item?.month]}</h3>
                      <h3 className="poppins-regular">
                        $&nbsp;{getMonthTotal(item?.month)}
                      </h3>
                    </div>
                  }
                  key={item._id}
                >
                  <Collapse accordion>
                    {displayMonthCategories(item?.month)}
                  </Collapse>
                </Panel>
              );
            })}
          </Collapse>
        </>
      )}
      <Divider type="horizontal" orientation="center" plain />
      <div
        style={{
          border: "1px solid #424242",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          color: "#cb7b6d",
        }}
      >
        <h2
          className="poppins-light"
          style={{
            color: "lightseagreen",
          }}
        >
          Total Expenses
        </h2>
        <h2 className="poppins-light">$&nbsp;{yearlyTotal}</h2>
      </div>
    </ContentWrapper>
  );
};

export default Yearly;
