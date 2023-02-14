import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { addPackTC, fetchPacksTC } from "./packsReducer";
import { PacksTable } from "./PacksTable";
import { SuperButton } from "../../common/superButton/superButton";
import s from "./Packs.module.css";

type PacksListPropsType = {
  PageTitle: string;
};

export const PacksList = (props: PacksListPropsType) => {
  let packs = useAppSelector((state) => state.packs);

  let dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPacksTC(10));
  }, []);

  return (
    <div>
      <div className={s.wrapper}>
        <div className={s.title}>{props.PageTitle}</div>
        <div className={s.button}>
          <SuperButton
            name={"Add new pack"}
            callback={() => {
              dispatch(addPackTC());
              alert("Add new pack");
            }}
          />
        </div>
      </div>
      <div className={s.table}>
        <PacksTable packs={packs} />
      </div>
    </div>
  );
};
