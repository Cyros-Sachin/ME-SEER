import React from "react";
import { useNavigate } from "react-router-dom";

const BlogsPost = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blogs/${blog.blog_id}`)}
      className="flex flex-col"
    >
      <div className="h-72">
        <img src={blog.image} className="h-full w-full cursor-pointer" />
      </div>
      <div className="text-[14px] ml-2 mt-2 text-[#3131316a] font-medium cursor-pointer">
        {blog.initialTitle}
      </div>
      <div className="w-full ml-2 mt-2 text-[24px] font-semibold cursor-pointer">
        {blog.title}
      </div>

      <div className="text-[#494949bf] w-full ml-2 mt-2 cursor-pointer">
        {blog.description}
      </div>
      <div className="flex">
        <img src={blog.authorImg} className="mt-4" />
        <div className="flex flex-col mt-4 ml-4">
          <div className="text-black]">{blog.author}</div>
          <div className="text-[#444444a2] text-[12px] font-semibold">
            {blog.authorDestination}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPost;
