import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { SuperButton } from "../superButton/superButton";

export const Header = () => {
  let activeStyle = {
    color: "#0059b2",
  };

  // не понятно как типизировать, оставим так, потом все равно этот header убирать
  // @ts-ignore
  const style = ({ isActive }) => (isActive ? activeStyle : undefined);

  return (
    <div className={s.wrapper}>
      <div className={s.list}>
        <NavLink style={style} to="/friday-cards/login">
          Login
        </NavLink>
        <NavLink style={style} to="/friday-cards/registration">
          Registration
        </NavLink>
        <NavLink style={style} to="/friday-cards/profile">
          Profile
        </NavLink>
        <NavLink style={style} to="/friday-cards/404">
          Page Not Found
        </NavLink>
        <NavLink style={style} to="/friday-cards/password-recovery">
          Password Recovery
        </NavLink>
        <NavLink style={style} to="/friday-cards/new-password">
          New Password
        </NavLink>
        <NavLink style={style} to="/friday-cards/test-components">
          Test Components
        </NavLink>
        <div className={s.button}>
          <SuperButton name={"Sign in"} />
        </div>
      </div>
    </div>
  );
};
