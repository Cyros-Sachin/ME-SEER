import React from "react";

import componentController from "./component-controller";
import { useRecentBlog } from "../../contexts/RecentBlogsContext";

const Topics = () => {
  const { recentBlogs, setRecentBlogs } = useRecentBlog();

  return (
    <div className="w-2/3 flex flex-col ml-5">
      {recentBlogs && recentBlogs.length > 0
        ? recentBlogs.map((recntBlog) => {
            return (
              <componentController.TopicTabs
                key={recntBlog.blog_id}
                title={recntBlog.title}
              />
            );
          })
        : "No Blogs"}
    </div>
  );
};

export default Topics;
