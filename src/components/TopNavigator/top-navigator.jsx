import React, { useState, useEffect } from "react";
import "./top-navigator.css";

//assets
import assetController from "./asset-controller";

const TopNavigatorComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [flashTop, setFlashTop] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + Math.ceil(window.scrollY) >=
        document.body.scrollHeight - 500
      ) {
        setFlashTop(true);
      } else {
        setFlashTop(false);
      }

      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (flashTop) {
      timer = setInterval(() => {
        setIsFlashing((prev) => !prev);
      }, 2000);
    }

    if (!flashTop) {
      setIsFlashing(false);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [flashTop]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <div
        onClick={scrollToTop}
        className={
          isFlashing
            ? `flash top-navigator-component-main orange`
            : `top-navigator-component-main`
        }
      >
        <img src={assetController.arrowUp} alt="top-navigator-component" />
      </div>
    )
  );
};

export default TopNavigatorComponent;
