import React from "react";

import assetController from "./asset-controller";

const SocialFeature = () => {
  return (
    <div
      style={{ fontFamily: "var(--primary-font-family)" }}
      className="flex flex-col w-[95%] p-10 rounded-lg mt-4 bg-[#c4c4c44e]"
    >
      <div className="sso-header mb-8">
        <div className="text-sm font-semibold text-black w-full flex justify-center items-center">
          Social SSO
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold mt-4 text-black w-2/3 flex justify-center items-center">
            Add high-conversion Social SSO
          </h1>
          <h1 className="text-2xl font-semibold text-black w-1/3 flex justify-center items-center">
            to your application in seconds
          </h1>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="text-xs font-semibold mt-4 text-black w-1/3 flex flex-col justify-center items-center">
            <div>
              When available, 53% of users choose to sign in with SSO instead of
            </div>
            <div>
              the alternatives. With Social SSO, Clerk makes it extremely simple
            </div>
            <div>to offer authentication the way your users want.</div>
          </div>
        </div>
      </div>

      <div className="sso-icons mt-4 border flex justify-center items-center">
        <div className="flex relative h-40 w-1/3 justify-around mr-4">
          <img
            className="h-10 w-10 mr-4 relative"
            src={assetController.apple}
          />
          <img
            className="h-10 w-10 mr-4 relative top-5"
            src={assetController.discord}
          />
          <img
            className="h-10 w-10 mr-4 relative top-10"
            src={assetController.dropbox}
          />
          <img
            className="h-10 w-10 mr-4 relative top-14"
            src={assetController.figma}
          />
          <img
            className="h-10 w-10 mr-4 relative top-20"
            src={assetController.github}
          />
        </div>

        <button className="w-1/4 bg-black text-sm hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg relative top-8">
          Sign in with Google
        </button>
        <div className="flex relative h-40 w-1/3 justify-around">
          <img
            className="h-10 w-10 mr-4 relative top-20 ml-4"
            src={assetController.google}
          />
          <img
            className="h-10 w-10 mr-4 relative top-14"
            src={assetController.linkedIn}
          />
          <img
            className="h-10 w-10 mr-4 relative top-10"
            src={assetController.meta}
          />
          <img
            className="h-10 w-10 mr-4 relative top-5"
            src={assetController.microsoft}
          />
          <img className="h-10 w-10 mr-4 relative" src={assetController.uber} />
        </div>
      </div>

      <div className="sso-features grid grid-cols-4 gap-8 mt-20">
        <div className="feature text-left">
          <h4 className="text-lg font-semibold mb-2">
            Convert faster with SSO
          </h4>
          <p className="text-gray-400">
            SSO averages 1.3 times faster than passwords, and 5.2 times faster
            than other passwordless authentication solutions like magic links.
          </p>
        </div>
        <div className="feature text-left">
          <h4 className="text-lg font-semibold mb-2">One-click integration</h4>
          <p className="text-gray-400">
            Don’t spoil SSO’s impressive performance with common mistakes. Clerk
            handles edge cases gracefully, so you don’t have to.
          </p>
        </div>
        <div className="feature text-left">
          <h4 className="text-lg font-semibold mb-2">Pick your providers</h4>
          <p className="text-gray-400">
            Clerk supports a wide range of SSO providers and is always adding
            more. If you need a provider that isn’t listed, please submit a
            request here.
          </p>
        </div>
        <div className="feature text-left">
          <h4 className="text-lg font-semibold mb-2">
            Automatic Account Linking
          </h4>
          <p className="text-gray-400">
            If a user signs in with SSO after creating their account a different
            way, they are automatically linked to the original.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialFeature;
