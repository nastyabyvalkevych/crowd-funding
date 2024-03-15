'use client'

import Block from "@/components/common/Block";
import Header from "@/components/common/Header";
import { message, Button, Input, Form, Upload } from "antd";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Dragger } = Upload;

export default function Contact() {
  const [form] = Form.useForm();

  const onFinish = async (values:any) => {
    const { name, email, description, attachments } = values;
    
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          description,
          attachments,
        }),
      });
      // Here goes your logic to send the email with attachments
      console.log("Received values:", values);
      message.success("Лист успішно відправлено!");
    } catch (error) {
      console.error("Failed to send email:", error);
      message.error("Трапилась помилка...");
    }
  };

  return (
    <Block>
      <Header
        title="Заповни форму і ми зв'яжемось з тобою"
        subtitle="Треба допомога?"
      />
      <main className="flex flex-col items-center justify-center mt-20">
        <Form
          form={form}
          onFinish={onFinish}
          className="w-1/2"
          layout="vertical"
        >
          <Form.Item
            label="Ім'я"
            name="name"
            rules={[
              { required: true, message: "Будь ласка, введіть ваше ім'я!" },
            ]}
          >
            <Input placeholder="Ваше ім'я" />
          </Form.Item>

          <Form.Item
            label="Електронна пошта"
            name="email"
            rules={[
              {
                required: true,
                message: "Будь ласка, введіть вашу електронну пошту!",
              },
              {
                type: "email",
                message: "Будь ласка, введіть коректну електронну пошту!",
              },
            ]}
          >
            <Input placeholder="Ваша електронна пошта" />
          </Form.Item>

          <Form.Item
            label="Опис потреби у допомозі"
            name="description"
            rules={[
              {
                required: true,
                message: "Будь ласка, опишіть вашу потребу у допомозі!",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Опишіть вашу потребу у допомозі" />
          </Form.Item>

          <Form.Item label="Додати файли" name="attachments">
            <Dragger>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Клацніть або перетягніть файли сюди для завантаження
              </p>
              <p className="ant-upload-hint">
                Підтримувані формати: .pdf, .doc, .docx
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Button  htmlType="submit">
              Відправити
            </Button>
          </Form.Item>
        </Form>
      </main>
    </Block>
  );
}
