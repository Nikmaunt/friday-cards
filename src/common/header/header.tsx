import * as React from "react";
import s from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { SuperButton } from "../superButton/superButton";
import { useAppDispatch } from "../../app/store";
import { toggleIsSignUp } from "../../app/appReducer";
import { useSelector } from "react-redux";
import { selectUserName } from "../../feature/profile/selectors";
import { selectorLogin } from "../../feature/loginRegistration/selectors";
import PATH from "../constans/path/path";
import { selectorAuth } from "../../app/appSelectors";
import { HeaderDropdown } from "./headerSelect";

export const Header = () => {
  const userName = useSelector(selectUserName);
  const isLogin = useSelector(selectorLogin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectorAuth);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const goToSignIn = () => {
    dispatch(toggleIsSignUp(false));
    return navigate(PATH.LOGIN);
  };

  return (
    <div className={s.topNav}>
      <img
        className={s.mainLogo}
        src="https://static.tildacdn.com/tild3064-6361-4562-a539-303563643237/logo-big-blue.png"
        alt="header_logo"
      />
      <div>
        {isAuth ? (
          <HeaderDropdown />
        ) : (
          <div className={s.button}>
            <SuperButton name={"Sign in"} callback={goToSignIn} />
          </div>
        )}
      </div>
    </div>
  );
};

// <div className={s.topNav}>
//     <img
//         className={s.mainLogo}
//         src="https://static.tildacdn.com/tild3064-6361-4562-a539-303563643237/logo-big-blue.png"
//         alt="header_logo"
//     />
//     <div>
//         {isAuth ? (
//             <Stack onClick={() => navigate(PATH.PROFILE)} className={s.userProfile} direction="row" spacing={1}>
//                 <h4 style={{ color: "black" }}>{userName}</h4>
//                 <Avatar style={{ marginTop: "12px" }} alt="userName" src={userPhoto} sx={{ width: 36, height: 36 }} />
//             </Stack>
//
//         ) : (
//             <div className={s.button}>
//                 <SuperButton name={"Sign in"} callback={goToSignIn} />
//             </div>
//         )}
//     </div>
// </div>
