import { Button, DatePicker, Form, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Select, Space } from "antd";
import dayjs from "dayjs";
import {
  fetchUserData,
  handleModalCancel,
  handleModalOk,
  modalAsync,
  selectExpensesSaved,
  selectModalConfirmLoading,
  selectModalOpen,
  // selectSavingStatus,
} from "../store/features/global/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectUser_ID } from "../store/features/auth/authSlice";
let index = 0;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};

const AddItem = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector(selectModalOpen);
  const savingStatus = useSelector(selectExpensesSaved);
  const modalConfirmLoading = useSelector(selectModalConfirmLoading);
  const [form] = Form.useForm();
  const [preFetch, setPreFetch] = useState(false);
  const [addItemBt, setAddItemBt] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const inputRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const newCategoryChange = (event) => {
    // console.log(event.target.value);
    setNewCategory(event.target.value);
  };
  const user_ID = useSelector(selectUser_ID);

  const addItem = async (e) => {
    setAddItemBt(true);
    try {
      const response = await axios.post(
        "https://expenses-server-a6yx.onrender.com/api/v1/new_category",
        {
          category: newCategory,
        }
      );

      // console.log(response.data);
      setPreFetch(true);
      setAddItemBt(false);
      setNewCategory("");
    } catch (error) {
      setAddItemBt(false);
      console.log(error);
    }
  };

  const disabledDate = (current) => {
    return current.isBefore(dayjs().startOf("day"));
  };
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // console.log("form values---", values);
      if (values.category !== undefined && values) {
        dispatch(handleModalOk());
        dispatch(
          modalAsync({
            title: values?.Title,
            amount: values?.Amount,
            date: values.date,
            category: values.category,
            year: values?.date?.$y,
            month: values?.date?.$M,
            user_id: user_ID,
          })
        );
        form.resetFields();
        //sending notification
        messageApi.open({
          type: "success",
          content: "Expenses added!",
          duration: 2,
        });

        // dispatch(fetchUserData(user_ID));
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Failed try after sometime",
        duration: 2,
      });
    }
  };

  /**
   * fetching categories
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getCachedTypes = localStorage.getItem("categoryTypes");

        if (!getCachedTypes || preFetch) {
          const response = await axios.get(
            "https://expenses-server-a6yx.onrender.com/api/v1/get_categories"
          );
          if (response.status === 200) {
            localStorage.setItem(
              "categoryTypes",
              JSON.stringify(response.data)
            );
            // console.log(response.data);
            setCategories(response.data.data);
            setPreFetch(false);
          }
        } else {
          const data = JSON.parse(getCachedTypes);
          setCategories(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [preFetch]);

  return (
    <Modal
      maskClosable={false}
      centered
      title="New Expenses"
      open={modalOpen}
      onOk={handleSubmit}
      confirmLoading={modalConfirmLoading}
      onCancel={() => {
        dispatch(handleModalCancel());
      }}
      closable={true}
    >
      {/* notification displayer var */}
      {contextHolder}
      {/* <ExpensesForm /> */}
      <Form
        form={form}
        name="dynamic_rule"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
        <Form.Item
          {...formItemLayout}
          name="Title"
          hasFeedback
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <Input
            placeholder="Title"
            style={{
              width: "350px",
              maxWidth:'300px'
            }}
            size="large"
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="Amount"
          hasFeedback
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <Input
            placeholder="Amount"
            style={{
              width: "350px",
              maxWidth:'300px'
            }}
            size="large"
          />
        </Form.Item>
        <Form.Item name="category" hasFeedback>
          <Select
            size="large"
            style={{
              width: "350px",
              maxWidth:'300px'
            }}
            placeholder="Select Category"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Space
                  style={{
                    padding: "0 8px 4px",
                  }}
                >
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={newCategory}
                    onChange={newCategoryChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button
                    disabled={!newCategory}
                    type="default"
                    icon={<PlusOutlined />}
                    onClick={addItem}
                  >
                    {addItemBt ? "Adding..." : "Add item"}
                  </Button>
                </Space>
              </>
            )}
            options={categories?.map((item) => ({
              label: item.category,
              value: item.category,
            }))}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="date"
          hasFeedback
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <DatePicker
            // disabledDate={disabledDate}
            picker="date"
            style={{
              width: "350px",
              maxWidth:'300px'
            }}
            size="large"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddItem;
