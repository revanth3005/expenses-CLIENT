import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
} from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { fetchUserData } from "../store/features/global/globalSlice";
import { selectUser_ID } from "../store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const UpdateModal = (props) => {
  const user_ID = useSelector(selectUser_ID);
  const dispatch = useDispatch();
  const { closeUpdateModal, um_open, itemData } = props;
  console.log("itemData", itemData);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const [newCategory, setNewCategory] = useState("");
  const newCategoryChange = (event) => {
    // console.log(event.target.value);
    setNewCategory(event.target.value);
  };
  useEffect(() => {
    form.setFieldsValue({
      title: itemData?.title,
      amount: itemData?.amount,
      category: itemData?.category,
      // dateData: itemData?.date,/
    });
  }, [form, itemData]);
  const handleOnOk = async () => {
    try {
      const values = await form.validateFields();
      if (values) {
        console.log(values);
        try {
          const response = await axios.post(
            // "http://localhost:5000/api/v1/update_category",
            "https://expenses-server-a6yx.onrender.com/api/v1/update_category",
            {
              id: itemData?._id,
              itemBody: {
                title: values.title,
                category: values.category,
                amount: values.amount,
              },
            }
          );
          closeUpdateModal(false);
          console.log("response", response);
          //data-prefetch
          dispatch(fetchUserData(user_ID));
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://expenses-server-a6yx.onrender.com/api/v1/get_categories"
        );
        console.log(response.data.data);
        setCategories(response.data.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  const addItem = async (e) => {
    try {
      const response = await axios.post(
        "https://expenses-server-a6yx.onrender.com/api/v1/new_category",
        {
          category: newCategory,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Update Items"
      open={um_open}
      onOk={handleOnOk}
      // confirmLoading={true}
      onCancel={() => closeUpdateModal(false)}
      closable={true}
      maskClosable={false}
    >
      <Form
        form={form}
        name="dynamic_rule"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Form.Item name="title" hasFeedback>
          <Input
            placeholder="Title"
            style={{
              width: "350px",
              maxWidth: "300px",
            }}
            size="large"
          />
        </Form.Item>
        <Form.Item name="amount" hasFeedback>
          <Input
            placeholder="Amount"
            style={{
              width: "350px",
              maxWidth: "300px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item name="category" hasFeedback>
          <Select
            size="large"
            style={{
              width: "350px",
              maxWidth: "300px",
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
                    add
                    {/* {addItemBt ? "Adding..." : "Add item"} */}
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
      </Form>
    </Modal>
  );
};

export default UpdateModal;
