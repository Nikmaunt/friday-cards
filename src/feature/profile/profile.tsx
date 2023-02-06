import { useAppSelector } from "../../app/store";
import { Navigate } from "react-router-dom";
import React from "react";

export const Profile = () => {
  const isLogin = useAppSelector<boolean>((state) => state.auth.isLogin);
  if (!isLogin) {
    return <Navigate to={"/friday-cards/login"} />;
  }
  return <div>Profile</div>;
};
