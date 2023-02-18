import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import s from "../searchField/SearchField.module.css";
import { useState } from "react";

export const GroupButtons = () => {
  console.log("GroupButtons rerender");
  const [activeMy, setActiveMy] = useState<boolean>(false);
  const [activeAll, setActiveAll] = useState<boolean>(true);

  const colorActiveMyButton = activeMy ? "#FFFFFF" : "#000000";
  const colorActiveAllButton = activeAll ? "#FFFFFF" : "#000000";
  const bgColorMyButton = activeMy ? "#366EFF;" : "#FFFFFF";
  const bgColorAllButton = activeAll ? "#366EFF;" : "#FFFFFF";

  const myButtonHandler = () => {
    if (!activeMy) {
      setActiveMy(true);
      setActiveAll(false);
    }
  };

  const allButtonHandler = () => {
    if (!activeAll) {
      setActiveAll(true);
      setActiveMy(false);
    }
  };
  const buttons = [
    <Button
      onClick={myButtonHandler}
      sx={{
        border: "1px solid #D9D9D9",
        color: colorActiveMyButton,
        backgroundColor: bgColorMyButton,
        ":hover": {
          backgroundColor: bgColorMyButton,
        },
      }}
      key="my"
    >
      My
    </Button>,
    <Button
      onClick={allButtonHandler}
      sx={{
        border: "1px solid #D9D9D9",
        color: colorActiveAllButton,
        backgroundColor: bgColorAllButton,
        ":hover": {
          backgroundColor: bgColorAllButton,
        },
      }}
      key="all"
    >
      All
    </Button>,
  ];
  return (
    <div>
      <h2 className={s.title}>Show packs cards</h2>
      <Box
        sx={{
          display: "flex",
          color: "black",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ButtonGroup size="large" aria-label="large button group">
          {buttons}
        </ButtonGroup>
      </Box>
    </div>
  );
};
