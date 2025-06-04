import React, { useContext } from "react";
import "./buttons.css";

// asset controller
import assetController from "./asset-controller/index";
import contextController from "./context-controller";

const Button = ({
  img,
  title,
  clickHandler,
  background = false,
  textCenter = false,
  hover = false,
}) => {
  return (
    <div
      className={`${hover ? `button-hover` : ``} w-full h-full flex ${
        textCenter ? `justify-center` : ``
      } items-center ${background ? `bg-buttonbg` : ``} rounded p-1`}
      onClick={clickHandler}
    >
      {img && <img className="" src={img} alt="button-img" />}
      <div className="font-medium text-[12px] ml-2">{title}</div>
    </div>
  );
};

export default Button;
