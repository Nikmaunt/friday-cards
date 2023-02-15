import s from "./TitleWithButton.module.css";
import { SuperButton } from "../superButton/superButton";
import React from "react";

export const TitleWithButton = (props: TitleWithButtonPropsType) => {
  const { title, nameButton, callback } = props;
  return (
    <div className={s.titleButton}>
      <h2>{title}</h2>
      <div className={s.button}>
        <SuperButton name={nameButton} callback={callback} />
      </div>
    </div>
  );
};
export type TitleWithButtonPropsType = {
  title: string;
  nameButton: string;
  callback: () => void;
};
