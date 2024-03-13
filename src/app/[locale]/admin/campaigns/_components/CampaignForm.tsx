"use client";
import { addNewCampaign, editCampaign } from "@/actions/campaigns";
import { uploadImagesToFirebaseAndReturnUrls } from "@/helpers/uploads";
import {
  Button,
  Form,
  Input,
  Select,
  Switch,
  Upload,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const { TextArea } = Input;

const categories = [
  {
    value: "military_and_veterans_support",
    label: "Допомога військовим та ветеранам",
  },
  {
    value: "social_support_and_care",
    label: "Соціальна допомога та опіка",
  },
  {
    value: "medical_aid",
    label: "Медична допомога",
  },
  {
    value: "environmental_awareness_and_protection",
    label: "Екологічна свідомість та захист довкілля",
  },
  {
    value: "education_and_youth_support",
    label: "Освіта та підтримка молоді",
  },
  {
    value: "cultural_heritage_and_creativity",
    label: "Культурна спадщина та творчість",
  },
  {
    value: "support_for_vulnerable_groups",
    label: "Підтримка вразливих груп населення",
  },
  {
    value: "rural_development",
    label: "Розвиток сільських територій",
  },
  {
    value: "technological_support_and_digitalization",
    label: "Технологічна підтримка та діджиталізація",
  },
  {
    value: "fight_against_crime_and_corruption",
    label: "Боротьба зі злочинністю та корупцією",
  },
];

interface Props {
  initialData?: any;
  isEditForm?: boolean;
}

function CampaignForm({ initialData, isEditForm = false }: Props) {
  const [loading = false, setLoading] = React.useState<boolean>(false);
  const [isActive, setIsActive] = React.useState(initialData?.isActive || true);
  const [showDonarsInCampaign, setShowDonarsInCampaign] = React.useState(
    initialData?.showDonarsInCampaign || true
  );
  const [newlySelectedFiles = [], setNewlySelectedFiles] = React.useState<
    any[]
  >([]);
  const [existingImages, setExistingImages] = React.useState<any[]>(
    initialData?.images || []
  );

  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      values.isActive = isActive;
      values.showDonarsInCampaign = showDonarsInCampaign;

      const newlyUploadedImages = await uploadImagesToFirebaseAndReturnUrls(
        newlySelectedFiles
      );

      values.images = [...existingImages, ...newlyUploadedImages];

      // console.log(values);
      let response: any = null;
      if (isEditForm) {
        values._id = initialData._id;
        response = await editCampaign(values);
      } else {
        response = await addNewCampaign(values);
      }
      if (response.error) throw new Error(response.error);
      message.success(response.message);
      router.refresh();
      router.push("/admin/campaigns");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <Form
        layout="vertical"
        onFinish={(values) => {
          onFinish(values);
        }}
        initialValues={initialData}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-3">
            <Form.Item
              label="Назва"
              name="name"
              rules={[{ required: true, message: "Будь ласка, введіть назву" }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="lg:col-span-3">
            <Form.Item
              label="Опис"
              name="description"
              rules={[{ required: true, message: "Будь ласка, введіть опис" }]}
            >
              <TextArea />
            </Form.Item>
          </div>

          <Form.Item
            name="organizer"
            label="Організатор"
            rules={[
              { required: true, message: "Будь ласка, введіть органайзер" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="targetAmount"
            label="Цільова сума"
            rules={[
              { required: true, message: "Будь ласка, введіть цільову суму" },
            ]}
          >
            <Input min={100} />
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

          <Form.Item
            name="startDate"
            label="Дата початку"
            rules={[
              { required: true, message: "Будь ласка, введіть дату початку" },
            ]}
          >
            {/* <DatePicker /> */}
            <input type="date" />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="Дата закінчення"
            rules={[
              {
                required: true,
                message: "Будь ласка, введіть дату закінчення",
              },
            ]}
          >
            {/* <DatePicker /> */}
            <input type="date" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <div className="flex gap-5">
            <span>Активний?</span>
            <Switch
              checked={isActive}
              onChange={(checked) => setIsActive(checked)}
              className=""
            />
          </div>

          <div className="flex gap-5">
            <span>Показати донари в кампанії?</span>
            <Switch
              checked={showDonarsInCampaign}
              onChange={(checked) => setShowDonarsInCampaign(checked)}
            />
          </div>
        </div>
        <Upload
          className="mt-5"
          beforeUpload={(file) => {
            setNewlySelectedFiles((prev) => [...prev, file]);
            return false;
          }}
          listType="picture-card"
          multiple
        >
          Завантажити зображення
        </Upload>

        <div className="flex flex-wrap mt-5 gap-5">
          {existingImages.map((image, index) => (
            <div
              className="p-3 border rounded flex flex-col gap-2 border-dashed"
              key={index}
            >
              <img className="w-24 h-24 object-cover" src={image} alt="" />
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => {
                  setExistingImages((prev) =>
                    prev.filter((_, i) => i !== index)
                  );
                }}
              >
                Видалити
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-5 mt-5">
          <Button onClick={() => router.push("/admin/campaigns")}>
            Скасувати
          </Button>
          <Button htmlType="submit" loading={loading}>
            Надіслати
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CampaignForm;
