import React from "react";

const SocialSSOIntegration = ({
  title = "User Authentication",
  header = "Everything you need.Secure by default.",
  subheader = "Simple and secure user authentication, complete with everything you need out of the box to provide a secure experience for your user",
}) => {
  return (
    <div
      style={{ fontFamily: "var(--primary-font-family)" }}
      className="flex w-[95%] p-20"
    >
      <div className="w-1/2">
        <div className="text-xs font-medium">{title}</div>
        <div className="text-2xl mt-2 font-semibold">
          <div>{header.split(".")[0]}</div>
          <div>{header.split(".")[1]}</div>
        </div>
        <div className="text-sm w-3/5 mt-2 font-medium">{subheader}</div>

        <button className="mt-10 border p-2 rounded-lg bg-black text-white font-semibold text-sm">
          Create an Account
        </button>
        <div className="flex flex-col mt-8">
          <div className="flex">
            <div className="">
              <div className="text-sm font-semibold">SOC Type 2</div>
              <div className="mt-2 text-xs w-2/3">
                Check and Follow the highest standards in security compliance to
                ensure your customer data stays safe
              </div>
            </div>

            <div className="">
              <div className="text-sm font-semibold">SOC Type 2</div>
              <div className="mt-2 text-xs w-2/3">
                Check and Follow the highest standards in security compliance to
                ensure your customer data stays safe
              </div>
            </div>
          </div>
          {/* Bottom */}
          <div className="flex mt-4">
            <div className="">
              <div className="text-sm font-semibold">SOC Type 2</div>
              <div className="mt-2 text-xs w-2/3">
                Check and Follow the highest standards in security compliance to
                ensure your customer data stays safe
              </div>
            </div>

            <div className="">
              <div className="text-sm font-semibold">SOC Type 2</div>
              <div className="mt-2 text-xs w-2/3">
                Check and Follow the highest standards in security compliance to
                ensure your customer data stays safe
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="w-1/2 p-4 flex justify-center items-center">
        <div className="rounded-lg w-[95%] h-full bg-[#dddddd41] flex justify-center items-center">
          Image
        </div>
      </div>
    </div>
  );
};

export default SocialSSOIntegration;
