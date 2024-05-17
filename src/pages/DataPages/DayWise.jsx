import React, { useEffect, useMemo } from "react";
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
import { Divider, Empty, Skeleton } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const DayWise = () => {
  const screens = useBreakpoint();
  const date = new Date();
  const userData = useSelector(selectUserItemsData);
  const userDataLoading = useSelector(selectItemsLoading);
  const filterDayWise = userData?.filter(
    (item) =>
      new Date(item.date).toLocaleDateString() === date.toLocaleDateString()
  );
  console.log(filterDayWise);
  const totalAmount = filterDayWise?.reduce((acc, cur) => acc + cur?.amount, 0);
  return (
    <ContentWrapper bread={false}>
      {userDataLoading ? (
        [1, 2, 3, 4, 5].map((el) => {
          return <Skeleton key={el} />;
        })
      ) : filterDayWise?.length === 0 ? (
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
        >
          {/* <Button type="primary">Create Now</Button> */}
        </Empty>
      ) : (
        <>
          <h2
            className="poppins-regular"
            style={{
              textAlign: "center",
              paddingBottom: "20px",
            }}
          >
            {date.toDateString()}
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {filterDayWise?.map((item) => {
              return (
                <div
                  key={item?._id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #424242",
                    padding: "6px 20px",
                    cursor: "pointer",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    borderRadius: "8px",
                    alignItems: "center",
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
                      {item?.title}
                    </h4>
                    <div
                      className="poppins-thin-light"
                      style={{
                        color: "lightslategray",
                      }}
                    >
                      #{item?.category}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <h4
                      className="poppins-light"
                      style={{
                        color: "#cb7b6d",
                      }}
                    >
                      $&nbsp;{item?.amount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </h4>
                    <RightOutlined />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {filterDayWise?.length > 0 && (
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
            <h2 className="poppins-light">$&nbsp;{totalAmount}</h2>
          </div>
        </>
      )}
    </ContentWrapper>
  );
};

export default DayWise;
