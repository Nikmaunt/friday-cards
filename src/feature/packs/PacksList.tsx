import React, { useEffect } from "react";
import EnhancedTable from "./EnhancedTable";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { fetchPacksTC, PackType } from "./packsReducer";
import { PackReturnType } from "./packsAPI";

type PacksListPropsType = {
  PageTitle: string;
};

export const PacksList = (props: PacksListPropsType) => {
  let dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPacksTC());
  }, []);

  interface Data {
    name: string;
    cards: number;
    lastUpdated: string;
    createdBy: string;
    actions: number;
  }

  let rows: any = [];

  function createData(name: string, cards: number, createdBy: string, lastUpdated: string, actions: number): Data {
    return {
      name,
      cards,
      lastUpdated,
      createdBy,
      actions,
    };
  }

  let packs = useAppSelector((state) => state.packs);
  // console.log(packs.cardPacks);

  // packs.map((pack: PackReturnType) => {
  // packs.map((pack: any) => {
  //   createData(pack.name, pack.cardsCount, pack.user_name, pack.updated, 1);
  //   rows = rows.push(createData(pack.name, pack.cardsCount, pack.user_name, pack.updated, 1));
  // });
  console.log(rows);
  return (
    <div>
      <div>{props.PageTitle}</div>
      {rows}
      {/*@ts-ignore*/}
      {/*{packs.map((pack: PackReturnType) => {*/}
      {/*  createData(pack.name, pack.cardsCount, pack.user_name, pack.updated, 1);*/}
      {/*  return*/}
      {/*})}*/}
      {/*@ts-ignore*/}
      <EnhancedTable cardPacks={packs.cardPacks} />
    </div>
  );
};
