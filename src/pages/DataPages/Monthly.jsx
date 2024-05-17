import React, { useCallback, useEffect, useMemo, useState } from "react";
import ContentWrapper from "../../components/Layout/ContentWrapper";
import { useSelector } from "react-redux";
import {
  selectItemsLoading,
  selectUserItemsData,
} from "../../store/features/global/globalSlice";
import { PlusCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Collapse, Divider, Empty, Modal, Skeleton } from "antd";
import UpdateModal from "../../components/UpdateModal";

const { Panel } = Collapse;
const Monthly = () => {
  const getDate = () => {
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
    const date = new Date();
    return `${months[date.getMonth()]} - ${date.getFullYear()}`;
  };
  // update modal state
  // um ==> update modal
  const [um_open, setUM_open] = useState(false);
  const userData = useSelector(selectUserItemsData);
  const userDataLoading = useSelector(selectItemsLoading);
  const filteredMonthly = useMemo(() => {
    return userData?.filter(
      (item) => new Date(item.date).getMonth() === new Date().getMonth()
    );
  }, [userData]);

  //sorting by date
  const filteredMonthlySort = useMemo(() => {
    return filteredMonthly?.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // Compare the dates
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return 0;
    });
  }, [filteredMonthly]);

  const filterOutYear = filteredMonthlySort?.filter(
    (el) => el?.year === new Date().getFullYear()
  );

  //calculate total monthly spends
  const monthlyTotal = filterOutYear?.reduce(
    (acc, cur) => acc + cur?.amount,
    0
  );

  //get the uniques dates for displaying the dates
  const uniqueDates = new Set();
  const filteredUniqueDates = useMemo(() => {
    const filterOutYearToo = filteredMonthlySort?.filter(
      (el) => el?.year === new Date().getFullYear()
    );
    return filterOutYearToo?.filter((item) => {
      if (uniqueDates.has(item.date)) {
        return false;
      }
      uniqueDates.add(item.date);
      return true;
    });
  }, [filteredMonthlySort]);

  /**
   *
   * @param {date} date
   * @returns total
   * return total for the date
   */
  const getTotalForDate = (date) => {
    const filterDate = filteredMonthlySort?.filter((ele) => ele?.date === date);
    const total = filterDate?.reduce((acc, cur) => acc + cur?.amount, 0);
    return total;
  };

  const getFilteredDate = (date) => {
    return filteredMonthlySort?.filter((ele) => ele?.date === date);
  };

  const getCategoriesInDate = (item) => {
    const filtered = filteredMonthlySort?.filter((ele) => {
      return ele?.date === item?.date;
    });
    // console.log("filteredBydate", filtered);

    const uniqueCategories = new Set();
    const filterCategories = filtered?.filter((item) => {
      if (uniqueCategories.has(item.category)) {
        return false;
      }
      uniqueCategories.add(item.category);
      return true;
    });

    const getTotal = (date, category) => {
      // console.log("========", category);
      const filters = getFilteredDate(date);

      const filterOutCategory = filters?.filter(
        (el) => el?.category === category
      );
      // console.log("filterOutCategory", filterOutCategory);
      const categoryTotal = filterOutCategory?.reduce(
        (acc, cur) => acc + cur?.amount,
        0
      );

      return categoryTotal;
    };

    return filterCategories?.map((el) => {
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
              <h4 className="poppins-regular">{el?.category}</h4>
              <h4 className="poppins-regular">
                $&nbsp;{getTotal(el.date, el?.category)}
              </h4>
            </div>
          }
          key={el._id}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {displayItems(el?.category, el?.date)}
          </div>
        </Panel>
      );
    });
  };

  // display titles and amount under each category on dates
  const displayItems = (category, date) => {
    const filterOutDate = getFilteredDate(date);

    const filterOutCategory = filterOutDate?.filter(
      (el) => el?.category === category
    );
    return filterOutCategory?.map((el) => {
      return (
        <div
          key={el?._id}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: filterOutCategory?.length > 1 && "1px solid #424242",
            padding: "10px 20px",
            cursor: "pointer",
          }}
          onClick={() => updateItem(el)}
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
              $&nbsp;{el?.amount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </h4>
            <RightOutlined />
          </div>
        </div>
      );
    });
  };

  const updateItem = async (item) => {
    setUM_open(true);
    localStorage.setItem("update_item", JSON.stringify(item));
  };

  useEffect(() => {
    const getCategoriesData = localStorage.getItem("categoryTypes");
    const categoryTypes = JSON.parse(getCategoriesData)?.data;
    // console.log(categoryTypes);
    // console.log("sai");
  }, []);

  return (
    <ContentWrapper bread={false}>
      {userDataLoading ? (
         [1, 2, 3, 4, 5].map((el) => {
          return <Skeleton key={el} />;
        })
      ) : filteredMonthly?.length === 0 ? (
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
            {getDate()}
          </h2>
          <Collapse accordion>
            {filteredUniqueDates.map((item) => (
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
                      {new Date(item?.date).toDateString()}
                    </h3>
                    <h3 className="poppins-regular">
                      $&nbsp;{getTotalForDate(item?.date)}
                    </h3>
                  </div>
                }
                key={item._id}
              >
                <Collapse accordion>{getCategoriesInDate(item)}</Collapse>
                <div>{displayItems(item)}</div>
              </Panel>
            ))}
          </Collapse>
        </>
      )}

      {filteredMonthly?.length > 0 && (
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
            <h2 className="poppins-light">$&nbsp;{monthlyTotal}</h2>
          </div>
        </>
      )}

      {/* Modal for updating items */}
      <UpdateModal um_open={um_open} setUM_open={setUM_open} />
    </ContentWrapper>
  );
};

export default Monthly;
