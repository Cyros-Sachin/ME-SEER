import { useState, useEffect } from "react";

const useUserId = () => {
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
    };

    // Listen for changes in localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return userId;
};

export default useUserId;
