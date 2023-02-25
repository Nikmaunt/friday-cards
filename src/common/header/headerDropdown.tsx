import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import s from "./Header.module.css";
import Avatar from "@mui/material/Avatar";
import userPhoto from "../../feature/profile/img/userPhoto.png";
import { useSelector } from "react-redux";
import { selectUserName } from "../../feature/profile/selectors";
import { useCallback } from "react";
import { logoutUser } from "../../feature/loginRegistration/authReducer";
import { useAppDispatch } from "../../app/store";
import PATH from "../constans/path/path";
import { useNavigate } from "react-router-dom";
import profileUserLogo from "./img/profileUserLogo.png";
import arrowIcon from "../../feature/profile/img/logOutArrow.png";

export const HeaderDropdown = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userName = useSelector(selectUserName);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const logOutHandler = useCallback(() => {
    dispatch(logoutUser());
  }, []);

  const goToProfile = () => {
    setAnchorEl(null);
    navigate(PATH.PROFILE);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="false"
        aria-hidden="false"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableRipple
      >
        <Stack className={s.userProfile} direction="row" spacing={1}>
          <h4 style={{ color: "black" }}>{userName}</h4>
          <Avatar style={{ marginTop: "12px" }} alt="userName" src={userPhoto} sx={{ width: 36, height: 36 }} />
        </Stack>
      </Button>
      <Menu
        aria-hidden="false"
        sx={{ marginTop: -1 }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        transitionDuration={0}
        onClose={handleClose}
      >
        <MenuItem onClick={goToProfile}>
          {" "}
          <img src={profileUserLogo} style={{ width: 12, height: 12, marginRight: 3 }} alt="profileUserLogo" />
          Profile
        </MenuItem>
        <MenuItem onClick={logOutHandler}>
          {" "}
          <img src={arrowIcon} style={{ width: 20, height: 20, marginLeft: -6 }} alt="logoutIcon" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
