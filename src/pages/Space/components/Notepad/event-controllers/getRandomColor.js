// getRandomColor.js

const getRandomColor = (highlightColors) => {
  const randomIndex = Math.floor(Math.random() * highlightColors.length);
  return highlightColors[randomIndex];
};

export default getRandomColor;
