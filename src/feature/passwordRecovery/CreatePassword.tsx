import React from "react";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import "./createPassword.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const CreatePassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div className={"createPassword"}>
      <div className={"title"}>Create new password</div>
      {/*<TextField label="Password" variant="standard" className={"textField"} />*/}

      <div>
        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="standard"
          className={"textField"}
        >
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className={"description"}>
        Create new password and we will send you further instructions to email
      </div>
      <Button className={"button"} variant={"contained"}>
        Create new password
      </Button>
    </div>
  );
};
