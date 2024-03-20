import UserModel from "@/models/user";
import React from "react";

export default async function Post({ post }: { post: IPost }) {
  const user = await UserModel.findById(post.authorId);
  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  const getColorClass = (category: string) => {
    switch (category) {
      case "Висока":
        return "bg-red-200 text-red-600";
      case "Середня":
        return "bg-yellow-200 text-yellow-600";
      case "Низька":
        return "bg-green-200 text-green-600";
      case "Новини":
        return "bg-blue-200 text-blue-600";
      default:
        return "bg-indigo-200 text-indigo-600";
    }
  };
  return (
    <div className=" mx-auto border px-4 py-2 rounded-lg mb-4">
      <div className="flex items-center mb-4">
        <img
          src={user?.profilePic}
          alt="Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>
          <div className="text-sm font-medium text-gray-700">
            {user?.userName}{" "}
            <span
              className={`inline-block py-1 px-2 rounded ${getColorClass(
                post.category,
              )} text-xs font-medium tracking-widest`}
            >
              {post.category}
            </span>
          </div>
          <div className="text-xs text-gray-500">{formattedDate}</div>
        </div>
      </div>

      <h1 className="text-sm leading-tight font-bold mb-1">{post.title}</h1>

      <p className="text-sm leading-tight mb-4">{post.desc}</p>
      <div className="flex justify-between items-center">
        <div>
          <a href="#" className="text-gray-500 hover:text-gray-700 mr-2">
            <i className="far fa-thumbs-up"></i> Like
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="far fa-comment-alt"></i> Reply
          </a>
        </div>
        <div className="flex items-center">
          <a href="#" className="text-gray-500 hover:text-gray-700 mr-2">
            <i className="far fa-flag"></i> Report
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="far fa-share-square"></i> Share
          </a>
        </div>
      </div>
    </div>
  );
}
