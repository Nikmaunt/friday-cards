import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import { fetchPacksTC } from "./packsReducer";
import s from "./Packs.module.css";
import { useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { selectorPacks } from "./packsSelectors";
import { ActionsIconPack } from "../../common/utils/actionsIconPack";
import { PacksTableHead } from "./packsTableHead";
import { PacksTableBody } from "./packsTableBody";
import { PacksTablePagination } from "./packsTablePagination";

export const PacksTable = () => {
  const dispatch = useAppDispatch();
  const packs = useSelector(selectorPacks);

  useEffect(() => {
    dispatch(fetchPacksTC({}));
  }, []);

  function createData(
    name: string,
    cards: number,
    createdBy: string,
    lastUpdated: string,
    id: string,
    actions: any
  ): DataRows {
    return { name, cards, lastUpdated, createdBy, id, actions };
  }

  const rows = packs.cardPacks.map((pack) => {
    return createData(
      pack.name,
      pack.cardsCount,
      pack.user_name,
      pack.updated,
      pack._id,
      <ActionsIconPack user_id={pack.user_id} pack_id={pack._id} />
    );
  });

  return (
    <div className={s.table}>
      <Table aria-labelledby="tableTitle" size={"medium"} sx={{ backgroundColor: "#FFFFFF" }}>
        <PacksTableHead />
        <PacksTableBody rows={rows} />
      </Table>
      <PacksTablePagination />
    </div>
  );
};

/////////// types //////////////
export type DataRows = {
  name: string;
  cards: number;
  createdBy: string;
  lastUpdated: string;
  id: string;
  actions: any;
};
