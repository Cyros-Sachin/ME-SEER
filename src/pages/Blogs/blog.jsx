import React from "react";
import componentController from "./component-controller";
import assetController from "./asset-controller";
import { useBlog } from "./contexts/BlogContext";
import SidebarAdvanced from "../../common-components/SidebarAdvanced/SidebarAdvanced";

const Blog = () => {
  const blogs = useBlog();

  return (
    <>
      <SidebarAdvanced />
      <div className="dashboard-container ml-0 md:ml-[220px] p-8 sm:p-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#4b4b4b]">Blogs</h1>
          <p className="text-sm text-[#7a7a7a]">Explore latest articles and posts</p>
        </div>

        <div className="flex flex-col xl:flex-row">
          {/* Main blog grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 xl:gap-8">
            {blogs?.blogs?.length > 0 ? (
              blogs.blogs.map((blog, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
                >
                  <componentController.BlogsPost blog={blog} />
                </div>
              ))
            ) : (
              <div className="text-gray-500 col-span-2">No blogs found.</div>
            )}
          </div>

          {/* Sidebar floating panel */}
          <div className="w-full xl:w-[300px] xl:ml-8 mt-8 xl:mt-0">
            <div className="xl:sticky xl:top-20">
              <h2 className="text-[#4b4b4b9a] text-lg mb-4">Featured Topics</h2>
              <div className="rounded-lg border border-[#7a7a7a77] shadow p-4">
                <img
                  src={assetController.sidebar}
                  className="w-full h-32 object-contain mb-4"
                  alt="Sidebar Graphic"
                />
                <componentController.Topics />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
