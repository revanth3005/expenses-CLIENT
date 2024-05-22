import { Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";

const UpdateModal = (props) => {
  const { closeUpdateModal, um_open, itemData } = props;
  console.log("itemData", itemData);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      title: itemData?.title,
      amount: itemData?.amount,
      category: itemData?.category,
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
          <Input
            placeholder="Category"
            style={{
              width: "350px",
              maxWidth: "300px",
            }}
            size="large"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
