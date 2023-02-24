import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import s from "../searchField/SearchField.module.css";
import { useSelector } from "react-redux";
import { selectorIdUser } from "../../loginRegistration/selectors";
import { useAppDispatch } from "../../../app/store";
import { setIsActiveMyPacks, setPacksParams } from "../../packs/packsReducer";
import { selectorIsActiveMyPacks } from "../../packs/packsSelectors";

export const GroupButtons = () => {
  const idUser = useSelector(selectorIdUser);
  const isActiveMyPacks = useSelector(selectorIsActiveMyPacks);
  const dispatch = useAppDispatch();

  const colorActiveMyButton = isActiveMyPacks ? "#FFFFFF" : "#000000";
  const colorActiveAllButton = !isActiveMyPacks ? "#FFFFFF" : "#000000";
  const bgColorMyButton = isActiveMyPacks ? "#366EFF;" : "#FFFFFF";
  const bgColorAllButton = !isActiveMyPacks ? "#366EFF;" : "#FFFFFF";

  const myButtonHandler = () => {
    const params = { user_id: idUser };
    dispatch(setIsActiveMyPacks(true));
    dispatch(setPacksParams(params));
  };

  const allButtonHandler = () => {
    const params = { user_id: "" };
    dispatch(setIsActiveMyPacks(false));
    dispatch(setPacksParams(params));
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
