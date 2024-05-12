import { Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";

const UpdateModal = (props) => {
  const { setUM_open, um_open } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    const update_items = localStorage.getItem("update_item");
    const items = JSON.parse(update_items);
    form.setFieldsValue({
      title: items?.title,
      amount: items?.amount,
      category: items?.category,
    });
  }, [form]);
  const handleOnOk = async () => {
    try {
      const values = await form.validateFields();
      if (values) {
        console.log(values);
      }
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
      onCancel={() => setUM_open(false)}
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
            }}
            size="large"
          />
        </Form.Item>
        <Form.Item name="amount" hasFeedback>
          <Input
            placeholder="Amount"
            style={{
              width: "350px",
            }}
            size="large"
          />
        </Form.Item>

        <Form.Item name="category" hasFeedback>
          <Input
            placeholder="Category"
            style={{
              width: "350px",
            }}
            size="large"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
