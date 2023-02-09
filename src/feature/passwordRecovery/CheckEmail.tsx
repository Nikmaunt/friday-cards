import React from "react";
import "./checkEmail.css";
// import messageIcon from "../../img/MessageIcon.svg";

import messageIcon from "../../img/MessageIcon.svg";
import { SuperButton } from "../../common/superButton/superButton";
import { useNavigate } from "react-router-dom";

export const CheckEmail = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    return navigate("/friday-cards/login");
  };
  return (
    <div className={"checkEmail"}>
      <div className={"title"}>Check Email</div>
      <img src={messageIcon} alt="messageIcon not found" className={"messageIcon"} />
      <div className={"description"}>We’ve sent an Email with instructions to example@mail.com</div>
      <SuperButton name={"Back to login"} callback={onClickHandler} />
    </div>
  );
};
