import React, { createContext, useState } from "react";
import { nanoid } from "nanoid";

// create a context
const FoodTableDataContext = createContext();

const FoodTableDataProvider = ({ children }) => {
  const data = [
    {
      id: nanoid(),
      mealName: "Breakfast Bulk",
      bulkFoodItems: [
        "Add Eggs and many other things.",
        "Add Eggs and many other things",
        "Add Eggs and many other things.",
        "Add Eggs and many other things",
        "Add Eggs and many other things",
      ],
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
    },
    {
      id: nanoid(),
      mealName: "Breakfast Bulk",
      bulkFoodItems:
        "Add Eggs and many other things. Add Eggs and many other things. Add Eggs and many other things.Add Eggs and many other things.",
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
    },
  ];

  const [foodTableData, setFoodTableData] = useState(data);
  const [mealResizeData, setMealResizeData] = useState([]);
  const [foodUnits,setFoodUnits] = useState([
    "kgs","gms","lbs","t"
  ])

  return (
    <FoodTableDataContext.Provider
      value={{
        foodTableData,
        setFoodTableData,
        mealResizeData,
        setMealResizeData,
        foodUnits,setFoodUnits,
      }}
    >
      {children}
    </FoodTableDataContext.Provider>
  );
};

export { FoodTableDataContext, FoodTableDataProvider };
