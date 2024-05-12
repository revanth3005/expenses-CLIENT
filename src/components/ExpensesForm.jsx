import React, { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input } from "antd";
import { useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Select, Space } from "antd";
import dayjs from "dayjs";
let index = 0;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
};

const ExpensesForm = () => {
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      // console.log("Success:", values);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };
  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disabledDate = (current) => {
    return current.isBefore(dayjs().startOf("day"));
  };
  return (
    <Form
      form={form}
      name="dynamic_rule"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          }}
          size="large"
        />
      </Form.Item>
      <Form.Item name="Category" hasFeedback>
        <Select
          size="large"
          style={{
            width: "350px",
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
                  value={name}
                  onChange={onNameChange}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  Add item
                </Button>
              </Space>
            </>
          )}
          options={items.map((item) => ({
            label: item,
            value: item,
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
          defaultValue={dayjs()}
          disabledDate={disabledDate}
          picker="date"
          style={{
            width: "350px",
          }}
          size="large"
        />
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Button type="primary" onClick={onCheck}>
          Check
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ExpensesForm;
