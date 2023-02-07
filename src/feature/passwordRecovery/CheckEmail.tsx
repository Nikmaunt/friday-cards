import React from "react";
import "./checkEmail.css";
import { Button, TextField } from "@mui/material";
import messageIcon from "../../img/MessageIcon.svg";

export const CheckEmail = () => {
  return (
    <div className={"checkEmail"}>
      <div className={"title"}>Check Email</div>
      <img
        src={messageIcon}
        alt="messageIcon not found"
        className={"messageIcon"}
      />
      <div className={"description"}>
        We’ve sent an Email with instructions to example@mail.com
      </div>
      <Button className={"button"} variant={"contained"}>
        Back to login
      </Button>
    </div>
  );
};
