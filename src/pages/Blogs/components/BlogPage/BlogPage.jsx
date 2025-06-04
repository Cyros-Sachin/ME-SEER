import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../../components/Login/navbar/navbar";
import Topics from "../topics/topics";
import assetController from "../../asset-controller/index";

const BlogPage = () => {
  const { blogid } = useParams();
  const [blog, setBlog] = useState([]);

  const createArrayFromContent = (content) => {
    if (!content) return [];

    let delimiters = content.match(/<h[1-6]>|<img |<par>|<bul>/g) || [];
    let myNewContent = [];
    let currentIndex = 0;

    delimiters.forEach((delim) => {
      let delimiterIndex = content.indexOf(delim, currentIndex);
      let extractedContent = content
        .substring(delimiterIndex + delim.length)
        .split("<")[0]
        .trim();

      myNewContent.push({ delim, content: extractedContent });
      currentIndex = delimiterIndex + delim.length + extractedContent.length;
    });

    return myNewContent;
  };

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await axios.get(
          `https://meseer.com/dog/get_blog/${blogid}`
        );
        setBlog(createArrayFromContent(response.data.content));
      } catch (err) {
        console.error(`Error fetching blog ID ${blogid}:`, err);
      }
    }
    if (blogid) fetchBlog();
  }, [blogid]);

  return (
    <div className="min-h-screen text-gray-900">
      <Navbar />
      <div className="flex w-full">
        <aside className="hidden md:flex md:w-1/4 lg:w-1/3 bg-white h-screen sticky top-10">
          <div className="h-[500px] sticky top-16 left-0 flex flex-col items-center mt-20 mb-20 border-r-2 border-[#5555552f]">
            <img
              className="h-50 w-48 mt-10"
              src={assetController.sidebar}
              alt="Sidebar"
            />
            <div className="border border-[#46464639] mt-5 mr-2 mb-2 w-60"></div>
            <Topics />
          </div>
        </aside>

        <main className="w-full p-16">
          {blog.map((item, index) => (
            <div key={index} className="mb-4">
              {item.delim === "<h1>" ? (
                <h1 className="text-6xl font-semibold">{item.content}</h1>
              ) : item.delim === "<h2>" ? (
                <h2 className="text-3xl font-bold">{item.content}</h2>
              ) : item.delim === "<h3>" ? (
                <h3 className="text-xl font-semibold">{item.content}</h3>
              ) : item.delim === "<h4>" ? (
                <h4 className="text-md font-medium">{item.content}</h4>
              ) : item.delim === "<h5>" ? (
                <h5 className="text-sm font-medium">{item.content}</h5>
              ) : item.delim === "<h6>" ? (
                <h6 className="text-xs font-medium">{item.content}</h6>
              ) : item.delim === "<par>" ? (
                <p className="text-gray-700 text-sm">{item.content}</p>
              ) : item.delim === "<bul>" ? (
                <li className="list-disc ml-5">{item.content}</li>
              ) : item.delim.startsWith("<img") ? (
                <div className="">
                  <img
                    src={item.content.match(/src="(.*?)"/)?.[1]}
                    alt={item.content.match(/alt="(.*?)"/)?.[1] || "Image"}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default BlogPage;
