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
      <Button onClick={handleClick}>
        <Stack className={s.userProfile} direction="row" spacing={1}>
          <h4 className={s.titleName}>{userName}</h4>
          <Avatar className={s.avatar} alt="userName" src={userPhoto} />
        </Stack>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem className={s.menuItem} onClick={goToProfile}>
          <img className={s.profileUserLogo} src={profileUserLogo} alt="profileUserLogo" />
          Profile
        </MenuItem>
        <MenuItem className={s.menuItem} onClick={logOutHandler}>
          <img className={s.logoutIcon} src={arrowIcon} alt="logoutIcon" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
