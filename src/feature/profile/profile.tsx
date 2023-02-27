import { Box, Paper, Stack } from "@mui/material";
import BadgeAvatars from "./StyledBadge";
import Button from "@mui/material/Button";
import arrowIcon from "./img/logOutArrow.png";
import React, { useCallback } from "react";
import EditableSpan from "./EditableSpan";
import { useAppDispatch } from "../../app/store";
import { logoutUser } from "../loginRegistration/authReducer";
import { Navigate, useNavigate } from "react-router-dom";
import { ReturnBack } from "../../common/returnBack/returnBack";
import s from "./Profile.module.css";
import PATH from "../../common/constans/path/path";
import { useSelector } from "react-redux";
import { selectUserEmail, selectUserName } from "./selectors";
import { selectorLogin } from "../loginRegistration/selectors";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(selectorLogin);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  const logOutHandler = useCallback(() => {
    dispatch(logoutUser());
  }, []);

  // if (!isLogin) {
  //   return <Navigate to={PATH.LOGIN} />;
  // }

  const returnToPackHandler = () => {
    navigate(PATH.PACKS);
  };

  return (
    <div className={s.wrapper}>
      <ReturnBack callback={returnToPackHandler} />
      <Box className={s.content}>
        <Paper className={s.container} elevation={3}>
          <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2.4}>
            <h2>Personal information</h2>
            <BadgeAvatars />
            <EditableSpan value={userName} />
            <span>{userEmail}</span>
            <div className={s.wrapperLogOut}>
              <Button
                className={s.buttonLogOut}
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
                startIcon={<img src={arrowIcon} style={{ width: 30, height: 30 }} alt="icon" />}
              >
                Log out
              </Button>
            </div>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
};
