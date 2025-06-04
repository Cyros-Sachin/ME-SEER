import { nanoid } from "nanoid";

// Function to create a meal
const createMeal = (foodTableData, setFoodTableData) => {
  let obj = {
    id: nanoid(),
    mealName: "Dummy Bulk",
    bulkFoodItems: ["Dummy"],
    foodItems: [
      {
        id: nanoid(),
        foodItem: "Eggs",
        quantity: 100,
        unit: "gms",
      },
      {
        id: nanoid(),
        foodItem: "Oats",
        quantity: 150,
        unit: "kgs",
      },
    ],

    assignMeal: {
      selectDay: "Week days",
      mealType: "Breakfast",
      mealDuration: "100",
      timeUnity: "mins",
      with: "Alone",
      activity: "None",
    },
  };

  let newFoodData = [...foodTableData, obj];
  setFoodTableData(newFoodData);
};

export default createMeal;
