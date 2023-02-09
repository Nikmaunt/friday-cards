import {Box , Paper, Stack} from "@mui/material";
import BadgeAvatars from "./StyledBadge";
import Button from "@mui/material/Button";
import arrowIcon from './img/logOutArrow.png';
import React, {ChangeEvent, useCallback, useState} from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditableSpan from "./EditableSpan";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {logoutUser} from "../../common/loginRegistration/authReducer";
import {Navigate} from "react-router-dom";
import {UserType} from "../../common/loginRegistration/authAPI";

export const Profile = () => {
    const dispatch = useAppDispatch()
    const isSignUp = useAppSelector<boolean>((state) => state.auth.isLogin)
    const logOutHandler = useCallback(() => {
        dispatch(logoutUser())
    }, [])
    const userData = useAppSelector<UserType>((state) => state.auth.user)
    console.log(typeof userData)
    const userName = useAppSelector<string>((state) => state.profile.name)
    let [name, setName] = useState<string>(userName);


    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
            setName(e.currentTarget.value)
    }

     const defaultText = userName ? userName : 'Enter your name'
     if(!isSignUp) {
      return <Navigate to={'/friday-cards/registration'}/>
    }

    return <div>
            <Stack ml={12} mt={2.5} direction="row" spacing={1}>
            <KeyboardBackspaceIcon fontSize={"small"}/>
            <span>
                <a href=""> Back to Packs List</a>
            </span>
        </Stack>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 6,
                    width: 413,
                    height: 408,
                },
            }}
        >
            <Paper>
                <Stack direction="column"
                       justifyContent="space-between"
                       alignItems="center"
                       marginTop={'27px'}
                       spacing={2}>
                    <h2>Personal information</h2>
                    <BadgeAvatars/>
                    <EditableSpan
                        value={name}
                        onChange={changeName}
                        spanProps={{
                            defaultText: defaultText,
                            onChange:changeName
                        }}
                    />
                    <span>{userData?.email}</span>
                    <Button
                        type={"submit"}
                        variant={"contained"}
                        onClick={logOutHandler}
                        sx={{
                            color: 'black',
                            backgroundColor: 'white',
                            borderRadius: "30px",
                            textTransform: "none",
                            width: 127,
                            height: 36,
                            "&:hover": {
                                backgroundColor: "transparent"
                            }
                        }}
                        startIcon={<img src={arrowIcon} style={{width: 30, height: 30}} alt=""/>}
                    >
                        Log out
                    </Button>
                </Stack>
            </Paper>
        </Box>
    </div> ;


};
