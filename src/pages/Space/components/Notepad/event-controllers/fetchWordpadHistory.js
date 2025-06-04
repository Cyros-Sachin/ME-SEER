const fetchWordpadHistory = (data, todayversion) => {
  const data2 = data.reduce((accumulator, currentValue) => {
    const { created_date, version } = currentValue;

    // Skip entries where version equals todayversion
    if (version === todayversion) {
      return accumulator;
    }

    // Check if created_date exists in accumulator
    const exist = accumulator.find(
      (value) => value.created_date === created_date
    );

    if (exist) {
      exist.content.push(currentValue);
    } else {
      accumulator.push({ created_date, content: [currentValue] });
    }

    return accumulator;
  }, []);

  return data2;
};

export default fetchWordpadHistory;
