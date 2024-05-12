import { Breadcrumb, Layout } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React from "react";

const ContentWrapper = (props) => {
  const screens = useBreakpoint();

  return (
    <Layout.Content
      style={{
        padding: "0 40px",
      }}
    >
      {props.bread === true && (
        <Breadcrumb
          style={{
            margin: "16px 0",
            //   padding: "0 48px",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
      )}
      {/* <div
        style={{
          // background: "#E2725B",
          minHeight: 280,
          padding: 24,
          borderRadius: props.bread === true &&"20px",
          // marginTop:props.bread === false && "30px",
        }}
      >
    </div> */}
      {props.children}
    </Layout.Content>
  );
};

export default ContentWrapper;
