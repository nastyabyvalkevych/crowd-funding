import React from "react";
import PostModel from "@/models/post";
import TopDonators from "../common/TopDonators";
import PostModal from "../common/PostModal";
import Post from "../common/Post";

async function BlogSection() {
  const posts: PostType[] = (await PostModel.find().sort({
    createdAt: -1,
  })) as any;
  return (
    <div className="flex gap-10">
      <div className="flex-4  ">
        <div className="sticky top-5">
          <h1 className="text-5xl text-blue-500 mb-10">Донать та доєднуйся</h1>
          <TopDonators />
        </div>
      </div>
      <div className="flex-1 ">
        {/* <h1 className="text-5xl text-blue-500 mb-10">Донать та доєднуйся</h1> */}
        {/* <h1 className="text-5xl text-blue-500 mb-4">Пости про допомогу</h1> */}
        <PostModal />
        <div className="mt-4">
          {posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default BlogSection;
