import React, { useState } from "react";
import "./dashboard.css";

import componentController from "./component-controller";
import assetController from "./asset-controller";
import SidebarAdvanced from "../../common-components/SidebarAdvanced/SidebarAdvanced";

import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overall");
  const pathName = useLocation().pathname;

  const tabs = [
    {
      id: nanoid(),
      title: "OVERALL",
      route: "/dashboard/overall",
      name: "overall",
    },
    {
      id: nanoid(),
      title: "CURRENT",
      route: "/dashboard/current",
      name: "current",
    },
    {
      id: nanoid(),
      title: "BUDGET",
      route: "/dashboard/budget",
      name: "budget",
    },
    {
      id: nanoid(),
      title: "RECORDS",
      route: "/dashboard/records",
      name: "records",
    },
  ];

  const data = [
    {
      id: nanoid(),
      name: "Bills",
      percentages: 30.8,
      negative: 305.85,
      img: assetController.data1,
    },
    {
      id: nanoid(),
      name: "Insurance",
      percentages: 20.14,
      negative: 200.0,
      img: assetController.data1,
    },
    {
      id: nanoid(),
      name: "Shopping",
      percentages: 19.13,
      negative: 190.0,
      img: assetController.data1,
    },
    {
      id: nanoid(),
      name: "Food",
      percentages: 12.24,
      negative: 121.55,
      img: assetController.data1,
    },
    {
      id: nanoid(),
      name: "Utilities",
      percentages: 19.13,
      negative: 80.0,
      img: assetController.data1,
    },
  ];

  return (
    <>
      {/* <componentController.Sidebar /> */}
      <SidebarAdvanced />
      <div className="dashboard-container">
        {/* Top section */}
        <div className="p-5 w-full h-full">
          <div className="ml-10 flex text-xs font-semibold items-center">
            {tabs.map((tab) => {
              return (
                <componentController.SelectorTab
                  title={tab.title}
                  route={tab.route}
                  name={tab.name}
                  selectedTab={selectedTab}
                  setHandler={setSelectedTab}
                />
              );
            })}
          </div>
        </div>

        {/* Second Section */}
        <div className="p-5 w-2/3 h-full mt-4 flex">
          <div className="flex flex-col justify-between h-80">
            <componentController.InformationTab
              key={nanoid()}
              title="Total Expenses"
              data="$123,456"
              percentages="+1,29%"
              green
            />

            <componentController.InformationTab
              key={nanoid()}
              title="Total Expenses"
              data="$123,456"
              percentages="+1,29%"
            />

            <componentController.InformationTab
              key={nanoid()}
              title="Total Expenses"
              data="$123,456"
              percentages="+1,29%"
              green
            />
          </div>
          {/* Content Changes */}

          <div className="flex flex-col justify-between min-h-80 ml-2 w-full p-2">
            {pathName === "/dashboard/overall" ? (
              <div className="w-[98%]">
                <div className="h-80">
                  <componentController.LineGraph />
                </div>
                <div className="mt-2 h-80 justify-between min-h-80 ml-2 w-full p-2">
                  <componentController.BarGraph />
                </div>

                {/* Floating Tab */}

                <div className="p-2 fixed top-10 left-[75%] w-80">
                  <div className="text-[#4b4b4b9a] text-xl ml-2">
                    Recent Transaction
                  </div>
                  <div className="mt-4 w-full border border-[#7a7a7a77] shadow-lg rounded-lg">
                    <componentController.RecentTransaction />
                  </div>
                </div>
              </div>
            ) : pathName === "/dashboard/current" ? (
              <div className="w-[98%]">
                <div className="h-80">
                  <componentController.LineGraph />
                </div>
                <div className="mt-2 justify-between min-h-80 ml-2 w-full">
                  <div className="text-[#4b4b4b9a] text-xl ml-2 mt-4">
                    Recent Transaction
                  </div>
                  <div className="mt-4 w-full border border-[#7a7a7a77] shadow-lg rounded-lg">
                    <componentController.RecentTransaction />
                  </div>
                </div>

                {/* Floating Tab */}

                <div className="p-1 fixed top-10 left-[75%] w-80">
                  <componentController.PieChart />
                  <div>
                    {data && data.length > 0
                      ? data.map((dat) => {
                          return (
                            <componentController.DataVisualiser data={dat} />
                          );
                        })
                      : ""}
                  </div>
                </div>
              </div>
            ) : pathName === "/dashboard/budget" ? (
              <div className="w-full">
                <div className="h-80 w-full">
                  <componentController.BarChart />
                </div>
                <div className="mt-2 justify-between min-h-80 ml-2 w-full">
                  <div className="rounded-lg shadow-lg">
                    <div className="flex bg-[#e8e8e8] rounded-t">
                      <div className="w-[20%] flex items-center justify-center p-4">
                        <img />
                        <div>image</div>
                      </div>

                      <div className="w-1/2 ml-4">
                        <div className="text-[14px] font-semibold text-[#777777]">
                          Grocery
                        </div>
                        <div className="text-[16px] font-semibold">
                          $250.00 / $800 (33%)
                        </div>
                      </div>
                    </div>

                    <div className="border border-sky-900">
                      <div className="bg-black w-[30%] p-1"></div>
                    </div>

                    <div>
                      <div className="p-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptates ad libero esse soluta accusantium, quo, hic
                        porro sequi consectetur modi tempora ab nesciunt
                        expedita voluptas consequatur, error facilis aspernatur!
                        Ipsa? Amet, perferendis eveniet? Deleniti quibusdam
                        inventore quo doloremque nihil sit tempore officiis
                        totam maiores modi aliquam, repellendus amet sed quod
                        debitis ea enim at odio libero quidem fugiat reiciendis
                        culpa! Quod est exercitationem nisi quasi in autem
                        similique aliquam natus repellendus, deleniti,
                        laboriosam quibusdam! Numquam nam, consequuntur
                        doloribus harum accusantium officiis nostrum inventore
                        voluptatum incidunt praesentium deserunt. Ipsum, impedit
                        molestiae. Corrupti omnis quisquam minima, ad vero
                        officiis eius iure distinctio, maiores, assumenda
                        ducimus ipsam molestias est atque porro consequuntur
                        quas nulla velit accusantium a consectetur eligendi?
                        Minus vel soluta illum. Illo voluptatem officia beatae
                        nulla iste atque iusto nesciunt, dicta ipsam doloremque,
                        expedita mollitia ad sequi non vitae, sunt ex fugit!
                        Quis placeat officia praesentium laborum error tempore,
                        asperiores ex?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : pathName === "/dashboard/records" ? (
              <>Records</>
            ) : (
              ""
            )}
          </div>

          {/*  */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
