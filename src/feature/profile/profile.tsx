import { Box, Paper, Stack } from "@mui/material";
import BadgeAvatars from "./StyledBadge";
import Button from "@mui/material/Button";
import arrowIcon from "./img/logOutArrow.png";
import React, {useCallback, useEffect} from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EditableSpan from "./EditableSpan";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { logoutUser } from "../loginRegistration/authReducer";
import { Navigate } from "react-router-dom";
import Cards from "../cards/cards";
import {getUserCards} from "../cards/cardsReducer";
import {PacksList} from "../packs/PacksList";

export const Profile = () => {
    const dispatch = useAppDispatch();
    const isSignUp = useAppSelector<boolean>((state) => state.auth.isLogin);
    const userName = useAppSelector<string>((state) => state.auth.user.name);
    const userEmail = useAppSelector<string>((state) => state.auth.user.email);
    const logOutHandler = useCallback(() => {
        dispatch(logoutUser());
    }, []);

    if (!isSignUp) {
        return <Navigate to={"/friday-cards/login"} />;
    }

    return (
        <div >
                <Stack marginTop={-5}  ml={16} direction="row" spacing={1} >
                    <KeyboardBackspaceIcon fontSize={"small"} />
                    <span>
          <a href=""> Back to Packs List</a>
        </span>
                </Stack>
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
                        <Button style={{marginTop:36}}
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
            <Cards/>
            <PacksList PageTitle={'123'}/>
        </div>
    );
};