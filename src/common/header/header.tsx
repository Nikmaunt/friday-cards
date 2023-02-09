import * as React from "react";
import s from "./Header.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { SuperButton } from "../superButton/superButton";
import { useAppSelector } from "../../app/store";
import Avatar from "@mui/material/Avatar";
import { Stack, Tooltip } from "@mui/material";
import userPhoto from "../../feature/profile/img/userPhoto.png";

export const Header = () => {
  const userName = useAppSelector<string>((state) => state.auth.user.name);
  const isLogin = useAppSelector<boolean>((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const goToSignIn = () => {
    return navigate("/friday-cards/login");
  };

  return (
    <>
      <AppBar style={{ backgroundColor: "white", marginBottom: "60px" }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              className={s.main_logo}
              src="https://static.tildacdn.com/tild3064-6361-4562-a539-303563643237/logo-big-blue.png"
              alt="icon"
            />
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
              <Tooltip title="Open settings">
                <div>
                  {isLogin ? (
                    <Stack className={s.userProfile} direction="row" spacing={1}>
                      <h4 style={{ color: "black" }}>{userName}</h4>
                      <Avatar
                        style={{ marginTop: "12px" }}
                        alt="userName"
                        src={userPhoto}
                        sx={{ width: 36, height: 36 }}
                      />
                    </Stack>
                  ) : (
                    <div className={s.button}>
                      <SuperButton name={"Sign in"} callback={goToSignIn} />
                    </div>
                  )}
                </div>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
