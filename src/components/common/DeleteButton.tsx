"use client";

import { deletePost } from "@/api/posts";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: string }) => {
  const router=useRouter()
  const onDelete = async (id: string) => {
    try {
      const result = await deletePost(id);
      if (result.error) throw new Error(result.error);
      message.success("Пост успішно видалено!");
      router.refresh();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <Button
      size="small"
      onClick={() => onDelete(id)}
      icon={<i className="ri-delete-bin-line"></i>}
    />
  );
};

export default DeleteButton;
