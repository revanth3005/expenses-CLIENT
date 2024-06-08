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
import {
  LeftCircleOutlined,
  PlusCircleOutlined,
  RightCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Empty, Collapse, Divider, Skeleton } from "antd";
import UpdateModal from "../../components/UpdateModal";

const Yearly = () => {
  //handling year start
  const [changeYear, setChangeYear] = useState(new Date().getFullYear());
  const incYearFunc = () => {
    setChangeYear((year) => year + 1);
  };
  const decYearFunc = () => {
    setChangeYear((year) => year - 1);
  };
  // const getYear = () => {
  //   const date = new Date();
  //   return `${date.getFullYear()}`;
  // };
  //handling year end
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
      (item) => new Date(item.date).getFullYear() === changeYear
    );
  }, [userData, changeYear]);

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
          onClick={() => updateItem(el)}
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
  // update data modal state
  const [itemData, setItemData] = useState({});
  const [um_open, setUM_open] = useState(false);
  const closeUpdateModal = (state) => {
    setUM_open(state);
  };
  const updateItem = async (item) => {
    setUM_open(true);
    setItemData(item);
  };
  return (
    <ContentWrapper bread={false}>
      <div
        style={{
          // border:'1px solid red',
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            // border: "1px solid white",
            width: "800px",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              padding: "10px",
            }}
          >
            <LeftCircleOutlined
              style={{
                fontSize: "20px",
                cursor: changeYear === 0 ? "auto" : "pointer",
                color: changeYear === 0 ? "grey" : "white",
              }}
              onClick={decYearFunc}
            />
            <h2 className="poppins-regular">{changeYear}</h2>
            <RightCircleOutlined
              style={{
                fontSize: "20px",
                cursor: changeYear === 11 ? "auto" : "pointer",
                color: changeYear === 11 ? "grey" : "white",
              }}
              onClick={incYearFunc}
            />
          </div>
          {userDataLoading ? (
            [1, 2, 3, 4, 5].map((el) => {
              return <Skeleton key={el} />;
            })
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
                          <h3 className="poppins-regular">
                            {months[item?.month]}
                          </h3>
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
          {filterYearWise?.length > 0 && (
            <>
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
            </>
          )}
          <UpdateModal
            itemData={itemData}
            um_open={um_open}
            closeUpdateModal={closeUpdateModal}
          />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Yearly;
