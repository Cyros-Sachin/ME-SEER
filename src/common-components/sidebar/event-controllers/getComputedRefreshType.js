const getComputedRefreshType = (refreshTypeSelected) => {
  let version = null;
  const now = new Date();

  if (refreshTypeSelected === "daily") {
    // Current day of the year
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    version = Math.floor(diff / oneDay);
  } else if (refreshTypeSelected === "weekly") {
    // Current week of the year
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    version = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  } else if (refreshTypeSelected === "monthly") {
    // Current month of the year (1-based)
    version = now.getMonth() + 1;
  } else {
    throw new Error("Invalid refresh type selected");
  }

  return version;
};

export default getComputedRefreshType;
