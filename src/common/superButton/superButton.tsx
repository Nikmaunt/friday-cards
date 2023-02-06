import Button from "@mui/material/Button";

import React from "react";

export const SuperButton: React.FC<SuperButtonPropsType> = ({ name, callback }) => {
  return (
    <Button
      onClick={callback}
      fullWidth
      type={"submit"}
      variant={"contained"}
      color={"primary"}
      sx={{ borderRadius: "30px", textTransform: "none" }}
    >
      {name}
    </Button>
  );
};

/////////////////// types //////////////////////

export type SuperButtonPropsType = {
  name: string;
  callback?: () => void;
};
