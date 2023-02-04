import React from "react";
import { Button, Input, TextField } from "@mui/material";
import "./forgotPassword.css";

export const ForgotPassword = () => {
  return (
    <div className={"forgotPassword"}>
      <div className={"title"}>Forgot your password?</div>
      <TextField label="Email" variant="standard" className={"textField"} />
      <div className={"description"}>
        Enter your email address and we will send you further instructions
      </div>
      <Button className={"button"} variant={"contained"}>
        Send Instructions
      </Button>
      <div className={"rememberPassword"}>Did you remember your password?</div>
      <div className={"link"}>Try logging in</div>
    </div>
  );
};
