import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import s from "../searchField/SearchField.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectorIdUser } from "../../loginRegistration/selectors";
import { useAppDispatch } from "../../../app/store";
import { fetchPacksTC, setIsActiveMyPacks, setPacksParams } from "../../packs/packsReducer";
import { selectorIsActiveMyPacks } from "../../packs/packsSelectors";

export const GroupButtons = () => {
  console.log("GroupButtons rerender");
  const idUser = useSelector(selectorIdUser);
  const isActiveMyPacks = useSelector(selectorIsActiveMyPacks);
  console.log("idUser", idUser);
  const dispatch = useAppDispatch();
  const [activeMy, setActiveMy] = useState<boolean>(isActiveMyPacks);
  const [activeAll, setActiveAll] = useState<boolean>(!activeMy);

  const colorActiveMyButton = activeMy ? "#FFFFFF" : "#000000";
  const colorActiveAllButton = activeAll ? "#FFFFFF" : "#000000";
  const bgColorMyButton = activeMy ? "#366EFF;" : "#FFFFFF";
  const bgColorAllButton = activeAll ? "#366EFF;" : "#FFFFFF";

  const myButtonHandler = () => {
    if (!activeMy) {
      setActiveMy(true);
      setActiveAll(false);
    }
    const params = { user_id: idUser };
    dispatch(setIsActiveMyPacks(true));
    dispatch(setPacksParams(params));
    //dispatch(fetchPacksTC());
  };

  const allButtonHandler = () => {
    if (!activeAll) {
      setActiveAll(true);
      setActiveMy(false);
    }
    const params = { user_id: "" };
    dispatch(setIsActiveMyPacks(false));

    dispatch(setPacksParams(params));
    //dispatch(fetchPacksTC());
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
