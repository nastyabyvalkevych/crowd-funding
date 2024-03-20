"use client";

import { useRouter } from "next/navigation";

import { addNewPost } from "@/api/posts";
import { useSession, useUser } from "@clerk/nextjs";
import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";

const { TextArea } = Input;
export const categories = [
  {
    value: "Висока",
    label: "Висока пріорітетність",
  },
  {
    value: "Середня",
    label: "Середня пріорітетність",
  },
  {
    value: "Низька",
    label: "Низька пріорітетність",
  },
  {
    value: "Новини",
    label: "Новини з життя",
  },
];

export default function PostModal() {
  const router = useRouter();

  const { isSignedIn } = useSession();
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await addNewPost(values);
      if (response.error) throw new Error(response.error);
      message.success(response.message);
      router.refresh();
    } finally {
      setLoading(false);
      setShowAddPostModal(false);
    }
  };

  return (
    <>
      {isSignedIn && (
        <>
          <Button onClick={() => setShowAddPostModal(true)}>+</Button>
          <Modal
            title="Добавить пост"
            visible={showAddPostModal}
            onCancel={() => setShowAddPostModal(false)}
            footer={null}
          >
            <Form
              onFinish={(values) => {
                onFinish(values);
              }}
            >
              <Form.Item
                label="Назва"
                name="title"
                rules={[
                  { required: true, message: "Будь ласка, введіть назву" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Опис"
                name="desc"
                rules={[
                  { required: true, message: "Будь ласка, введіть опис" },
                ]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item
                name="category"
                label="Категорія"
                rules={[
                  { required: true, message: "Будь ласка, введіть категорію" },
                ]}
              >
                <Select options={categories} />
              </Form.Item>

              <Button type="default" htmlType="submit" loading={loading}>
                Создать пост
              </Button>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
}
