import React, { useState } from "react";
import Navbar from "../../components/Login/navbar/navbar";
import Footer from "../../components/Login/footer/footer";

import assetController from "./asset-controller";
import componentController from "./component-controller";

const Pricing = () => {
  const [componentSelected, setComponentSelected] = useState("A");

  const handleComponentSelected = (para) => {
    setComponentSelected(para);
    console.log(componentSelected);
  };

  const ProductPricing = [
    {
      product: "Free",
      monthprice: "0$",
      yearprice: "0$",
      img: assetController.free,
      content: [
        "Collaborative workspace",
        "Integrate with Slack, GitHub & more",
        "Basic page analytics",
        "7 day page history",
        "Invite 10 guests",
      ],
    },
    {
      product: "Plus",
      monthprice: "12$ per seat/month",
      yearprice: "10$ per seat/month",
      img: assetController.plus,
      content: [
        "Collaborative workspace",
        "Integrate with Slack, GitHub & more",
        "Basic page analytics",
        "7 day page history",
        "Invite 10 guests",
      ],
    },
    {
      product: "Buisness",
      monthprice: "18$ per seat/month",
      yearprice: "15$ per seat/month",
      img: assetController.buisness,
      content: [
        "Collaborative workspace",
        "Integrate with Slack, GitHub & more",
        "Basic page analytics",
        "7 day page history",
        "Invite 10 guests",
      ],
    },
    {
      product: "Enterprise",
      monthprice: "Contact Sales",
      yearprice: "Contact Sales",
      img: assetController.enterprise,
      content: [
        "Collaborative workspace",
        "Integrate with Slack, GitHub & more",
        "Basic page analytics",
        "7 day page history",
        "Invite 10 guests",
      ],
    },
  ];

  return (
    <div>
      <componentController.Navbar />
      <div className="min-h-screen">
        <div className="mt-8 flex flex-col justify-center items-center text-black font-bold text-[48px] w-full">
          <div>One App to Track Everything in your life.</div>
          <div>Join MeSeer Now!</div>
        </div>

        <div className="w-full flex items-center justify-center mt-14 ">
          <img className="h-14" src={assetController.google} />
          <img className="h-14 ml-8" src={assetController.amazon} />
          <img className="h-14 ml-8" src={assetController.figma} />
          <img className="h-14 ml-8" src={assetController.Uber} />
        </div>

        <div className="w-full mt-14 flex items-center justify-center">
          <div className="bg-[#6a6a6a66] w-1/6 flex items-center justify-center p-1 rounded-[17px] font-semibold text-[14px]">
            <div
              onClick={() => handleComponentSelected("A")}
              className={`cursor-pointer ${
                componentSelected === "A" ? "bg-white" : ""
              } mr-3 w-2/3 justify-center items-center flex rounded-[14px] p-[2px]`}
            >
              Pay Monthly
            </div>
            <div
              onClick={() => handleComponentSelected("B")}
              className={`cursor-pointer ${
                componentSelected === "B" ? "bg-white" : ""
              } ml-3 w-2/3 justify-center items-center flex rounded-[14px] p-[2px]`}
            >
              Pay Yearly
            </div>
          </div>
        </div>

        <div className="w-full mt-14 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-4 w-full max-w-7xl">
            {ProductPricing.map((product) => {
              return (
                <div className="w-full h-[600px] bg-[#F6F5F4] p-10 rounded-sm">
                  <img src={product.img} />
                  <div className="mt-4 font-semibold text-[18px]">
                    {product.product}
                  </div>
                  <div className="mt-2 font-semibold text-[24px]">
                    {componentSelected === "A"
                      ? product.monthprice
                      : product.yearprice}
                  </div>
                  <div className="mt-4 flex justify-center items-center">
                    <div className="p-1 border w-full flex justify-center items-center text-white bg-black rounded-lg text-[18px]">
                      Get Started
                    </div>
                  </div>
                  <ul className="list-disc pl-5 mt-4">
                    {product.content.map((con) => {
                      return <li className="font-medium mt-2">{con}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full mt-20 flex">
          <div className="flex w-[40%] h-[550px] items-end justify-end">
            <img className="h-80 mr-10" src={assetController.doodle1} />
          </div>
          <div className="w-[20%] flex flex-col items-center">
            <img
              className="h-28"
              src={assetController.applogo}
              alt="app-logo"
            />
            <div className="text-[30px] font-semibold mt-4">
              Try MeSeer today
            </div>
            <div className="text-[18px] text-[#686666a2]">
              Get Started for Free
            </div>
            <div className="text-[18px] text-[#686666a2]">
              Monitor your day to day activities
            </div>
            <div className="mt-4 mb-8 bg-black p-2 w-2/3 flex justify-center items-center font-bold text-white rounded-lg">
              Try MeSeer Free
            </div>
            <div className="flex text-[18px] text-[#686666a2]">
              On a big Team?{" "}
              <div className="ml-2 underline">Request a Demo</div>
            </div>
          </div>
        </div>
      </div>
      <componentController.Footer />
    </div>
  );
};

export default Pricing;
