import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Layout,
  Menu,
  Popover,
  Segmented,
} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { MenuUnfoldOutlined, RadiusSettingOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import {
  preFetchUserInfo,
  selectUser_ID,
  selectLoggedIn,
  clearAuth,
  selectName,
} from "../../../store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ResponsiveDrawer = () => {
  const [visible, setVisible] = useState(false);
  const screen = useBreakpoint();
  const navigate = useNavigate();
  const user_ID = useSelector(selectUser_ID);
  const loggedIn = useSelector(selectLoggedIn);
  const user_name = useSelector(selectName);
  const dispatch = useDispatch();
  const location = useLocation();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleMenuItemClick = () => {
    setVisible(false);
  };

  const loginFunc = async () => {
    setVisible(false);
    navigate("/login");
  };
  const registerFunc = async () => {
    setVisible(false);
    navigate("/register");
  };
  const logoutFunc = () => {
    dispatch(clearAuth());
    navigate("/");
  };
  useEffect(() => {
    const info = localStorage.getItem("user_log");
    const parsedInfo = JSON.parse(info);
    if (parsedInfo) {
      dispatch(preFetchUserInfo());
    }
  }, []);

  const items = [
    {
      label: "Profile",
      key: "profile",
    },
    {
      label: "Logout",
      key: "logout",
    },
  ];
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "logout") {
      dispatch(clearAuth());
      navigate("/");
    } else if (e.key === "profile") {
      navigate("/Home");
    }
  };
  const content = (
    <>
      <Divider orientation="center" plain>
        User Info
      </Divider>
      <h3
        className="poppins-light"
        style={{
          // textAlign: "center",
          paddingBottom: "10px",
          width: "190px",
        }}
      >
        Name: {String(user_name).toLocaleUpperCase()}
      </h3>
      <h3
        className="poppins-light "
        style={{
          // textAlign: "center",/
          paddingBottom: "10px",
          width: "190px",
        }}
      >
        UserID: {user_ID}
      </h3>
      <Divider orientation="center" plain>
        Menu
      </Divider>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </>
  );
  const [arrow, setArrow] = useState("Show");
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  return (
    <>
      <Layout.Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          role="button"
          tabIndex="0"
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <div
            className="poppins-medium"
            style={{
              color: "white",
              cursor: "pointer",
            }}
          >
            NSR_ET
          </div>
          <span
            style={{
              position: "absolute",
              top: "15px",
              left: "30px",
              fontSize: "12px",
            }}
            className="poppins-light"
          >
            Expenses Tracker
          </span>
        </div>

        {screen.lg === true || screen.xl === true || screen.md === true ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loggedIn ? (
              <>
                {location.pathname === "/" && (
                  <Button type="default" onClick={() => navigate("/Home")}>
                    Home
                  </Button>
                )}
                <Popover
                  placement="bottomRight"
                  // title={'Menu'}
                  content={content}
                  arrow={mergedArrow}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Avatar
                    style={{
                      cursor: "pointer",
                    }}
                    size="large"
                  >
                    {String(user_name[0]).toLocaleUpperCase()}
                  </Avatar>
                </Popover>
              </>
            ) : (
              <>
                <Button type="default" onClick={loginFunc}>
                  Login
                </Button>
                <Button type="primary" onClick={registerFunc}>
                  Register
                </Button>
              </>
            )}
          </div>
        ) : (
          <MenuUnfoldOutlined
            style={{
              color: "white",
              fontSize: "18px",
            }}
            onClick={showDrawer}
          />
        )}
      </Layout.Header>

      <Drawer
        title="Menu"
        placement="bottom"
        width="50%"
        onClose={onClose}
        open={visible}
        destroyOnClose={true}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {loggedIn ? (
            <>
              <Button type="default" onClick={() => navigate("/")}>
                Profile
              </Button>
              <Button
                type="default"
                onClick={() => {
                  navigate("/Home");
                  handleMenuItemClick();
                }}
              >
                Home
              </Button>
              <Button type="primary" onClick={logoutFunc}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button type="default" onClick={loginFunc}>
                Login
              </Button>
              <Button type="primary" onClick={registerFunc}>
                Register
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default ResponsiveDrawer;

// const App = () => {

//   return (
//     <Menu
//       onClick={onClick}
//       selectedKeys={[current]}
//       mode="horizontal"
//       items={items}
//     />
//   );
// };
