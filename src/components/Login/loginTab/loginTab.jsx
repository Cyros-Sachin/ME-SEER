import React from "react";

const LoginTab = ({ img, message, handler }) => {
  return (
    <div
      onClick={handler}
      className="cursor-pointer p-2 flex border border-zinc-200 w-full items-center rounded-[7px]"
    >
      <img className="h-4 ml-14" src={img} alt="sign" />
      <div className="items-center ml-4 text-[14px] font-medium">{message}</div>
    </div>
  );
};

export default LoginTab;
