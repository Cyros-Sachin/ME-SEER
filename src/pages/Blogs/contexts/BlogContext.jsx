import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "First Blog",
      content: `<H>what are goals <n> <p>Goals are specific, well-defined targets that 
        individuals or organizations strive to achieve within a set timeframe. 
        They serve as milestones that guide and measure progress in various aspects 
        of life or business. The concept of a goal has evolved from its original 
        meaning of the end point of a race to encompass any desired outcome or achievement. 
        <n> <H> why do we need them <n> <bul> Direction and Focus: goals serve as a compass 
        for clear direction <n> <bul> Measurement of Progress: goals are way measure progress 
        towards your purpose or bigger goals. Measuring your progress makes you responsible and more 
        accountable to your objectives <n> <bul> Growth: By staying on track to achieving our goals we
         grow personally, professionally, physically… . Basically  you will grow in which ever direction
          your goals take you. <n> <bul> Indirect benefits: In addition to growing and achieving your goals
           you also become better at time management, task resource allocation, higher motivation, 
           life satisfaction, confident, stronger will power, gives clarity on your purpose <n>
            <B> how do they work <n> <bul> Drivers for setting goals:  There are numerous motivations
             for setting goals, including career ambitions, financial stability/independence, health improvement, 
             self-improvement, recognition, social impact, following someone’s advice, or adhering to mainstream trends.
              <n> <bul> Achievability and Timeline: Goals usually consist of an achievable state and a date by
               which they should be achieved. <n> <bul> The more details you add regarding the goals the better it is.
                <n> <bul> <bul> Write in detail, what is it you are trying to achieve? <n> <bul> 
                <bul> Why are you doing it? (your why could be one of the driver/motivations mentioned above)
                 <n> <bul> <bul> How will you achieve it? <n> <bul> <bul> By when will you achieve it? 
                 How much time is needed?`,
    },
    { id: 2, title: "Second Blog", content: "This is the second blog post." },
  ]);

  useEffect(() => {
    // make the api call to fetch the blogs
    const getBlogs = async () => {
      try {
        const response = await axios.get(`https://meseer.com/dog/get_all_blog`);

        let tokenToMatch = /<header[^>]*>[\s\S]*?<\/header>/;
        let imageToken = /<img[^>]+>/;
        let tokenSrc = /"[\s\S]+.jpg/;

        let BlogsWithImages = response.data.map((data) => {
          let content = data.content.match(imageToken)[0];
          let updatesSource = content.slice(0);
          let regex = /src[^>]+g"/;
          let src = updatesSource
            .match(regex)[0]
            .split("=")[1]
            .match(/"(.*?)"/)[1];

          return {
            ...data,
            image: src,
          };
        });

        if (BlogsWithImages.length > 0) {
          setBlogs(BlogsWithImages);
        }
      } catch (err) {
        console.error(`Something went wrong with fetching blogs`);
      }
    };
    getBlogs();
  }, []);

  const addBlog = (title, content) => {
    const newBlog = { id: Date.now(), title, content };
    setBlogs([...blogs, newBlog]);
  };

  const updateBlog = (id, updatedTitle, updatedContent) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id
          ? { ...blog, title: updatedTitle, content: updatedContent }
          : blog
      )
    );
  };

  const removeBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog, removeBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
