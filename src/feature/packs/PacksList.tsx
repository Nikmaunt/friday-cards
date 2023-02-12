import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { fetchPacksTC } from "./packsReducer";
import { PacksTable } from "./PacksTable";

type PacksListPropsType = {
  PageTitle: string;
};

export const PacksList = (props: PacksListPropsType) => {
  let dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPacksTC());
  }, []);

  let packs = useAppSelector((state) => state.packs);
  console.log("PacksList, packs:", packs);
  return (
    <div>
      <div>{props.PageTitle}</div>
      <PacksTable packs={packs} />
    </div>
  );
};
