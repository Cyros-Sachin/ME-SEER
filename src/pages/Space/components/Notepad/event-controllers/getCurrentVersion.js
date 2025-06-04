export const getCurrentVersion = (refreshType) => {
  let smallerCaseRefreshType = refreshType.toLowerCase();
  let version;
  const now = new Date();
  if (smallerCaseRefreshType === "daily") {
    // Get the current day of the year (1 to 365/366)
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    version = Math.floor(diff / oneDay);
  }

  if (smallerCaseRefreshType === "weekly") {
    // Get the current week number (ISO week: Monday as the first day)
    const startOfISOYear = new Date(now.getFullYear(), 0, 4); // Jan 4 is always in week 1
    const diffInDays = Math.floor(
      (now - startOfISOYear) / (1000 * 60 * 60 * 24)
    );
    version = Math.ceil((diffInDays + startOfISOYear.getDay() + 1) / 7);
  }

  if (smallerCaseRefreshType === "monthly") {
    // Get the current month of the year (1 to 12)
    version = now.getMonth() + 1;
  }

  return version;
};
