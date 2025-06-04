import { nanoid } from "nanoid";

// Function to add a food item to a meal
const addFootItem = (foodTableData, setFoodTableData, mealResizeData) => {
  // find the id associated with the mealresize data in the foodTableData
  const index = foodTableData.findIndex(
    (footData) => footData.id === mealResizeData.id
  );

  const newFootTableData = [...foodTableData];
  let newFoodItem = {
    id: nanoid(),
    foodItem: "Dummy",
    quantity: 111,
    unit: "kgms",
  };
  newFootTableData[index].foodItems.push(newFoodItem);
  setFoodTableData(newFootTableData);
};

export default addFootItem;
