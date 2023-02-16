import { Box, Paper, Stack } from "@mui/material";
import BadgeAvatars from "./StyledBadge";
import Button from "@mui/material/Button";
import arrowIcon from "./img/logOutArrow.png";
import React, { useCallback } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EditableSpan from "./EditableSpan";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { logoutUser } from "../loginRegistration/authReducer";
import { Navigate, useNavigate } from "react-router-dom";
import { ReturnBack } from "../../common/returnBack/returnBack";
import s from "./Profile.module.css";
import PATH from "../../common/constans/path/path";
import { fetchPacksTC } from "../packs/packsReducer";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSignUp = useAppSelector<boolean>((state) => state.auth.isLogin);
  const userName = useAppSelector<string>((state) => state.auth.user.name);
  const userEmail = useAppSelector<string>((state) => state.auth.user.email);
  const logOutHandler = useCallback(() => {
    dispatch(logoutUser());
  }, []);

  if (!isSignUp) {
    return <Navigate to={"/login"} />;
  }

  const returnToPackHandler = async () => {
    console.log("work");
    await dispatch(fetchPacksTC({})); // надо уточнить обязательно так делать или можно возвращаться к пред списку колод
    // navigate("/packs");
    navigate(PATH.PACKS);
  };

  return (
    <div className={s.wrapper}>
      <ReturnBack callback={returnToPackHandler} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1.8,
            width: 413,
            height: 408,
          },
        }}
      >
        <Paper elevation={3}>
          <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2.4}>
            <h2>Personal information</h2>
            <BadgeAvatars />
            <EditableSpan value={userName} />
            <span>{userEmail}</span>
            <Button
              style={{ marginTop: 36 }}
              type={"submit"}
              variant={"contained"}
              onClick={logOutHandler}
              sx={{
                color: "black",
                backgroundColor: "white",
                borderRadius: "30px",
                textTransform: "none",
                width: 127,
                height: 36,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              startIcon={<img src={arrowIcon} style={{ width: 30, height: 30 }} alt="" />}
            >
              Log out
            </Button>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
};
