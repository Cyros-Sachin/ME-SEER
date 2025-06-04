import { nanoid } from "nanoid";
import React, { useState } from "react";
import RecentTransactionTabs from "../recent-transaction-tabs/recent-transaction-tabs";
import Transaction from "../transaction/transaction";

import assetController from "./asset-controller";
import componentController from "./component-controller";

const RecentTransaction = () => {
  const recentTransactionData = {
    all: [
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "GTR5",
        amount: "160",
        transactionType: "Gadgets & Gear",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Polo Shirt",
        amount: "20",
        transactionType: "Fashion",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Biryani",
        amount: "10",
        transactionType: "Hajir Biryani",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Taxi Fare",
        amount: "12",
        transactionType: "Uber",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Keyboard",
        amount: "22",
        transactionType: "Gadgets & Gear",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Computer",
        amount: "1200",
        transactionType: "Apple",
        transactionDate: "19 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Mouse",
        amount: "2200",
        transactionType: "Apple",
        transactionDate: "23 May 2023",
      },
    ],

    revenue: [
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "GTR5",
        amount: "180",
        transactionType: "Gadgets & Gear",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Polo Shirt",
        amount: "200",
        transactionType: "Fashion",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Biryani",
        amount: "100",
        transactionType: "Hajir Biryani",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Taxi Fare",
        amount: "120",
        transactionType: "Uber",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Keyboard",
        amount: "220",
        transactionType: "Gadgets & Gear",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Computer",
        amount: "12",
        transactionType: "Apple",
        transactionDate: "19 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Mouse",
        amount: "21",
        transactionType: "Apple",
        transactionDate: "23 May 2023",
      },
    ],

    expenses: [
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "GTR5",
        amount: "160",
        transactionType: "Gadgets & Gear",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Polo Shirt",
        amount: "20",
        transactionType: "Fashion",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Biryani",
        amount: "10",
        transactionType: "Hajir Biryani",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Taxi Fare",
        amount: "12",
        transactionType: "Uber",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Keyboard",
        amount: "22",
        transactionType: "Gadgets & Gear",
        transactionDate: "17 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Computer",
        amount: "1200",
        transactionType: "Apple",
        transactionDate: "19 May 2023",
      },
      {
        id: nanoid(),
        img: assetController.transactionIcon,
        transactionName: "Mouse",
        amount: "2200",
        transactionType: "Apple",
        transactionDate: "23 May 2023",
      },
    ],
  };

  const [displayData, setDisplayData] = useState(recentTransactionData.all);
  const [selectedTab, setSelectedTab] = useState("all");
  const [expandData, setExpandData] = useState(false);

  const handleData = (tab) => {
    setDisplayData(recentTransactionData[tab]);
    setSelectedTab(tab);
    setExpandData(true);
  };

  return (
    <div>
      <div className="flex p-3">
        <RecentTransactionTabs
          title="All"
          data={recentTransactionData.all}
          setHandlers={{ setDisplayData, setSelectedTab }}
          name="all"
          selectedTab={selectedTab}
        />
        <RecentTransactionTabs
          title="Revenue"
          data={recentTransactionData.revenue}
          setHandlers={{ setDisplayData, setSelectedTab }}
          name="revenue"
          selectedTab={selectedTab}
        />
        <RecentTransactionTabs
          title="Expenses"
          data={recentTransactionData.expenses}
          setHandlers={{ setDisplayData, setSelectedTab }}
          name="expenses"
          selectedTab={selectedTab}
        />
      </div>
      <div className="flex flex-col items-center">
        {displayData &&
          displayData.map((data, index) => {
            if (index < 5 && !expandData) {
              return <Transaction key={data.id} data={data} />;
            }
          })}

        {displayData.length > 5 && !expandData ? (
          <div
            onClick={() => handleData(selectedTab)}
            className="text-sm mt-6 mb-4 font-semibold cursor-pointer w-full flex justify-end pr-8"
          >
            More
          </div>
        ) : (
          <>
            {displayData.map((data) => (
              <Transaction key={data.id} data={data} />
            ))}
            <div
              onClick={() => setExpandData(false)}
              className="text-sm mt-6 mb-4 font-semibold cursor-pointer w-full flex justify-end pr-8"
            >
              Less
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecentTransaction;
