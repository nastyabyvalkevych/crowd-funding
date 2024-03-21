"use client";

import Block from "@/components/common/Block";
import Header from "@/components/common/Header";
import { formats } from "@/lib/formats";
import { message, Button, Input, Form } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import InputMask from "react-input-mask";

const { TextArea } = Input;

export default function Contact() {
  const [form] = Form.useForm();
  const [loading = false, setLoading] = React.useState<boolean>(false);
  const t = useTranslations("Contact");
  const onFinish = async (values: any) => {
    const { name, email, description, phone } = values;

    try {
      setLoading(true);
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          description,
          phone,
        }),
      });
      message.success("Лист успішно відправлено!");
    } catch (error) {
      message.error("Трапилась помилка...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Block>
        <Header title={t("title")} subtitle={t("miniTitle")} />
        <p className="text-center text-customGray my-8">
          {t.rich("description", formats)}
        </p>
        <main className="flex justify-center items-center px-4 mt-10">
          <Form
            form={form}
            onFinish={onFinish}
            className="w-full md:w-1/2"
            layout="vertical"
          >
            <Form.Item
              label={t("Form.name.label")}
              name="name"
              rules={[{ required: true, message: t("Form.name.rules") }]}
            >
              <Input placeholder={t("Form.name.placeholder")} />
            </Form.Item>
            <Form.Item
              label={t("Form.phone.label")}
              name="phone"
              rules={[
                {
                  required: true,
                  message: t("Form.phone.rules"),
                },
              ]}
            >
              <InputMask mask="+38(999)999-99-99" maskChar={null}>
                {(inputProps: any) => (
                  <Input
                    {...inputProps}
                    placeholder={t("Form.phone.placeholder")}
                  />
                )}
              </InputMask>
            </Form.Item>

            <Form.Item
              label={t("Form.email.label")}
              name="email"
              rules={[
                {
                  required: true,
                  message: t("Form.email.rules1"),
                },
                {
                  type: "email",
                  message: t("Form.email.rules2"),
                },
              ]}
            >
              <Input placeholder={t("Form.email.placeholder")} />
            </Form.Item>

            <Form.Item
              label={t("Form.description.label")}
              name="description"
              rules={[
                {
                  required: true,
                  message: t("Form.description.rules"),
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder={t("Form.description.placeholder")}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" loading={loading}>
                {t("Form.button")}
              </Button>
            </Form.Item>
          </Form>
        </main>
      </Block>

      <div className="absolute top-32  hidden md:block">
        <img src="/images/ellipse.png" alt="orange ellipse" />
      </div>
      <div className="absolute top-20 right-0">
        <img src="/images/formVector.svg" alt="blue gradient ball" />
      </div>
    </>
  );
}
