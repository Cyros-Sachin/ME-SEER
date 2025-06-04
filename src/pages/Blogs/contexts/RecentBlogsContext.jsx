//https://meseer.com/dog/get_recent_blog

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const RecentBlogsContext = createContext();

export const RecentBlogsProvider = ({ children }) => {
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    // make the api call to fetch the blogs
    const getRecentBlogs = async () => {
      try {
        const response = await axios.get(
          `https://meseer.com/dog/get_recent_blog`
        );
        if (response.data) {
          setRecentBlogs(response.data);
        }
      } catch (err) {
        console.error(`Something went wrong with fetching blogs`);
      }
    };
    getRecentBlogs();
  }, []);

  return (
    <RecentBlogsContext.Provider value={{ recentBlogs, setRecentBlogs }}>
      {children}
    </RecentBlogsContext.Provider>
  );
};

export const useRecentBlog = () => useContext(RecentBlogsContext);
